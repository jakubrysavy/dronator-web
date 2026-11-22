import json
import subprocess
import sys
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path


CHANNEL_ID = "UC_YdeYtoEHdiNy2lpI6jJqw"
FEED_URL = f"https://www.youtube.com/feeds/videos.xml?channel_id={CHANNEL_ID}"
OUTPUT_PATH = Path(__file__).resolve().parents[1] / "videos.js"
CHANNEL_HANDLE = "Dronatorcz"
VIDEO_LIMIT = 9
LANGUAGES = ("en", "cs", "pl", "de", "es", "ru")


def local_name(tag):
    return tag.rsplit("}", 1)[-1]


def child_text(element, name):
    for child in element.iter():
        if local_name(child.tag) == name and child.text:
            return child.text.strip()
    return ""


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
    url = f"https://www.youtube.com/@{CHANNEL_HANDLE}/{tab}"
    command = [
        sys.executable,
        "-m",
        "yt_dlp",
        "--dump-single-json",
        "--skip-download",
        "--playlist-end",
        str(VIDEO_LIMIT),
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
        if len(entries) == VIDEO_LIMIT:
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
        english_title = english_video.get("title") or source_video.get("title") or ""
        english_description = english_video.get("description") or source_video.get("description") or ""
        titles = {
            language: entries_by_language[language].get(video_id, {}).get("title") or english_title
            for language in LANGUAGES
        }
        descriptions = {
            language: entries_by_language[language].get(video_id, {}).get("description") or english_description
            for language in LANGUAGES
        }
        for language in LANGUAGES:
            localized_title = titles[language]
            source_title = source_video.get("title")
            if language not in ("en", "cs") and source_title and localized_title == source_title:
                titles[language] = english_title
            localized_description = descriptions[language]
            source_description = source_video.get("description")
            if language not in ("en", "cs") and source_description and localized_description == source_description:
                descriptions[language] = english_description
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