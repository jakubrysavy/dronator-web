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
        "published": child_text(entry, "published"),
    }
    if all(video.values()):
        feed_videos[video["id"]] = video


def get_channel_tab(tab):
    url = f"https://www.youtube.com/@{CHANNEL_HANDLE}/{tab}"
    result = subprocess.run(
        [
            sys.executable,
            "-m",
            "yt_dlp",
            "--flat-playlist",
            "--dump-single-json",
            "--playlist-end",
            str(VIDEO_LIMIT),
            "--no-warnings",
            url,
        ],
        check=True,
        capture_output=True,
        text=True,
        encoding="utf-8",
    )
    data = json.loads(result.stdout)
    entries = []
    for item in data.get("entries") or []:
        video_id = item.get("id")
        if not video_id:
            continue

        video = feed_videos.get(video_id, {})
        upload_date = item.get("upload_date")
        published = video.get("published") or (f"{upload_date[:4]}-{upload_date[4:6]}-{upload_date[6:8]}" if upload_date else "")
        entries.append({
            "id": video_id,
            "title": video.get("title") or item.get("title") or "",
            "published": published,
        })
        if len(entries) == VIDEO_LIMIT:
            break

    if not entries:
        raise RuntimeError(f"No entries returned for channel tab: {tab}")
    return entries


videos = get_channel_tab("videos")
shorts = get_channel_tab("shorts")

output = (
    "window.DRONATOR_VIDEOS = " + json.dumps(videos, ensure_ascii=False, indent=2) + ";\n"
    "window.DRONATOR_SHORTS = " + json.dumps(shorts, ensure_ascii=False, indent=2) + ";\n"
)
OUTPUT_PATH.write_text(output, encoding="utf-8")