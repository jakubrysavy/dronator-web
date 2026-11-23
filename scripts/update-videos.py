import gzip
import json
import subprocess
import sys
import time
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlencode


CHANNEL_ID = "UC_YdeYtoEHdiNy2lpI6jJqw"
FEED_URL = f"https://www.youtube.com/feeds/videos.xml?channel_id={CHANNEL_ID}"
OUTPUT_PATH = Path(__file__).resolve().parents[1] / "videos.js"
CHANNEL_HANDLE = "Dronatorcz"
VIDEO_LIMIT = 15
SHORT_LIMIT = 9
LANGUAGES = ("en", "cs", "pl", "de", "es", "ru")
LANGUAGE_REGIONS = {"en": "US", "cs": "CZ", "pl": "PL", "de": "DE", "es": "ES", "ru": "RU"}
METADATA_RETRIES = 3
METADATA_RETRY_DELAY = 1
VIDEO_METADATA_CACHE = {}


class ScriptParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.scripts = []
        self.current_script = None

    def handle_starttag(self, tag, attrs):
        if tag.lower() == "script":
            self.current_script = []

    def handle_endtag(self, tag):
        if tag.lower() == "script" and self.current_script is not None:
            self.scripts.append("".join(self.current_script))
            self.current_script = None

    def handle_data(self, data):
        if self.current_script is not None:
            self.current_script.append(data)


def local_name(tag):
    return tag.rsplit("}", 1)[-1]


def child_text(element, name):
    for child in element.iter():
        if local_name(child.tag) == name and child.text:
            return child.text.strip()
    return ""


def get_initial_data(html):
    parser = ScriptParser()
    parser.feed(html)
    marker = "ytInitialData ="
    decoder = json.JSONDecoder()

    for script in parser.scripts:
        marker_index = script.find(marker)
        if marker_index < 0:
            continue
        json_start = marker_index + len(marker)
        initial_data, _ = decoder.raw_decode(script[json_start:].lstrip())
        return initial_data

    raise ValueError("YouTube page did not contain ytInitialData")


def find_renderer(data, renderer_name):
    pending = [data]
    while pending:
        current = pending.pop()
        if isinstance(current, dict):
            renderer = current.get(renderer_name)
            if isinstance(renderer, dict):
                return renderer
            pending.extend(current.values())
        elif isinstance(current, list):
            pending.extend(current)
    return {}


def get_localized_video_metadata(video_id, language):
    cache_key = (video_id, language)
    if cache_key in VIDEO_METADATA_CACHE:
        return VIDEO_METADATA_CACHE[cache_key]

    query = urlencode({
        "v": video_id,
        "hl": language,
        "gl": LANGUAGE_REGIONS[language],
        "persist_hl": "1",
    })
    request = urllib.request.Request(
        f"https://www.youtube.com/watch?{query}",
        headers={
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            "Accept-Language": f"{language},{language};q=0.9,en;q=0.8",
            "Accept-Encoding": "gzip",
        },
    )

    metadata = {}
    for attempt in range(METADATA_RETRIES + 1):
        try:
            time.sleep(0.25)
            with urllib.request.urlopen(request, timeout=30) as response:
                payload = response.read()
                if response.headers.get("Content-Encoding") == "gzip":
                    payload = gzip.decompress(payload)
            initial_data = get_initial_data(payload.decode("utf-8", errors="replace"))

            primary_info = find_renderer(initial_data, "videoPrimaryInfoRenderer")
            secondary_info = find_renderer(initial_data, "videoSecondaryInfoRenderer")
            title_data = primary_info.get("title", {})
            title = title_data.get("simpleText") or "".join(
                run.get("text", "") for run in title_data.get("runs", [])
            )
            description = secondary_info.get("attributedDescription", {}).get("content", "")
        except (OSError, ValueError, json.JSONDecodeError) as error:
            print(f"Warning: YouTube {language} metadata unavailable for {video_id}: {error}", file=sys.stderr)
            break

        if title and title.strip():
            metadata["title"] = title
        if description and description.strip():
            metadata["description"] = description

        missing = [field for field in ("title", "description") if not metadata.get(field)]
        if not missing:
            break
        if attempt == METADATA_RETRIES:
            print(
                f"Warning: YouTube {language} metadata missing for {video_id} after "
                f"{attempt + 1} attempts: {', '.join(missing)}",
                file=sys.stderr,
            )
            break
        print(
            f"Warning: YouTube {language} metadata missing for {video_id}: "
            f"{', '.join(missing)}; retry {attempt + 1}/{METADATA_RETRIES}",
            file=sys.stderr,
        )
        time.sleep(METADATA_RETRY_DELAY * (attempt + 1))

    VIDEO_METADATA_CACHE[cache_key] = metadata
    return metadata


with urllib.request.urlopen(FEED_URL, timeout=30) as response:
    feed = ET.fromstring(response.read())

feed_videos = {}
for entry in feed.iter():
    if local_name(entry.tag) != "entry":
        continue

    video = {
        "id": child_text(entry, "videoId"),
        "title": child_text(entry, "title"),
        "description": child_text(entry, "description"),
        "published": child_text(entry, "published"),
    }
    if video["id"] and video["published"]:
        feed_videos[video["id"]] = video


def get_channel_tab(tab, language):
    limit = VIDEO_LIMIT if tab == "videos" else SHORT_LIMIT
    url = f"https://www.youtube.com/@{CHANNEL_HANDLE}/{tab}"
    command = [
        sys.executable,
        "-m",
        "yt_dlp",
        "--flat-playlist",
        "--dump-single-json",
        "--skip-download",
        "--playlist-end",
        str(limit),
        "--no-warnings",
        "--extractor-args",
        f"youtube:lang={language}",
        "--js-runtimes",
        "node",
        url,
    ]
    try:
        result = subprocess.run(
            command,
            check=True,
            capture_output=True,
            text=True,
            encoding="utf-8",
        )
    except subprocess.CalledProcessError as error:
        details = (error.stderr or error.stdout or "No yt-dlp output").strip()
        raise RuntimeError(
            f"yt-dlp failed for {tab}/{language} with exit code {error.returncode}:\n{details[-4000:]}"
        ) from error

    data = json.loads(result.stdout)
    subscriber_count = data.get("channel_follower_count")
    entries = []
    for item in data.get("entries") or []:
        if subscriber_count is None:
            subscriber_count = item.get("channel_follower_count")
        video_id = item.get("id")
        if not video_id:
            continue

        video = feed_videos.get(video_id, {})
        upload_date = item.get("upload_date")
        published = video.get("published") or (f"{upload_date[:4]}-{upload_date[4:6]}-{upload_date[6:8]}" if upload_date else "")
        entries.append({
            "id": video_id,
            "title": item.get("title") or video.get("title") or "",
            "description": item.get("description") or video.get("description") or "",
            "published": published,
        })
        if len(entries) == limit:
            break

    if not entries:
        raise RuntimeError(f"No entries returned for channel tab: {tab}")
    return entries, subscriber_count


def merge_translations(localized_entries):
    entries_by_language = {
        language: {video["id"]: video for video in entries}
        for language, entries in localized_entries.items()
    }
    translated_entries = []

    for english_video in localized_entries["en"]:
        video_id = english_video["id"]
        source_video = feed_videos.get(video_id, {})
        localized_metadata = {
            language: get_localized_video_metadata(video_id, language)
            for language in LANGUAGES
        }
        english_entry = entries_by_language["en"].get(video_id, {})
        english_page_metadata = localized_metadata["en"]
        english_title = (
            english_page_metadata.get("title")
            or english_entry.get("title")
            or source_video.get("title")
            or ""
        )
        english_description = (
            english_page_metadata.get("description")
            or english_entry.get("description")
            or source_video.get("description")
            or ""
        )
        titles = {}
        descriptions = {}
        for language in LANGUAGES:
            entry = entries_by_language[language].get(video_id, {})
            page_metadata = localized_metadata[language]
            localized_title = page_metadata.get("title") or entry.get("title") or ""
            localized_description = page_metadata.get("description") or entry.get("description") or ""

            if language not in ("en", "cs") and localized_title == source_video.get("title"):
                localized_title = ""
            if language not in ("en", "cs") and localized_description == source_video.get("description"):
                localized_description = ""

            titles[language] = localized_title or english_title
            descriptions[language] = localized_description or english_description

        published = source_video.get("published") or english_video.get("published") or ""

        translated_entries.append({
            "id": video_id,
            "title": english_title,
            "titles": titles,
            "descriptions": descriptions,
            "published": published,
        })

    return translated_entries


channel_tabs = {"videos": {}, "shorts": {}}
subscriber_count = None
shorts_subscriber_count = None

for tab in channel_tabs:
    for language in LANGUAGES:
        entries, tab_subscriber_count = get_channel_tab(tab, language)
        channel_tabs[tab][language] = entries
        if language == "en":
            if tab == "videos":
                subscriber_count = tab_subscriber_count
            else:
                shorts_subscriber_count = tab_subscriber_count

videos = merge_translations(channel_tabs["videos"])
shorts = merge_translations(channel_tabs["shorts"])
subscriber_count = subscriber_count or shorts_subscriber_count or 1180

output = (
    f"window.DRONATOR_SUBSCRIBERS = {subscriber_count};\n"
    "window.DRONATOR_VIDEOS = " + json.dumps(videos, ensure_ascii=False, indent=2) + ";\n"
    "window.DRONATOR_SHORTS = " + json.dumps(shorts, ensure_ascii=False, indent=2) + ";\n"
)
OUTPUT_PATH.write_text(output, encoding="utf-8")
