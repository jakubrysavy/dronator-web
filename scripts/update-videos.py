import json
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path


CHANNEL_ID = "UC_YdeYtoEHdiNy2lpI6jJqw"
FEED_URL = f"https://www.youtube.com/feeds/videos.xml?channel_id={CHANNEL_ID}"
OUTPUT_PATH = Path(__file__).resolve().parents[1] / "videos.js"


def local_name(tag):
    return tag.rsplit("}", 1)[-1]


def child_text(element, name):
    for child in element.iter():
        if local_name(child.tag) == name and child.text:
            return child.text.strip()
    return ""


with urllib.request.urlopen(FEED_URL, timeout=30) as response:
    feed = ET.fromstring(response.read())

videos = []
for entry in feed.iter():
    if local_name(entry.tag) != "entry":
        continue

    video = {
        "id": child_text(entry, "videoId"),
        "title": child_text(entry, "title"),
        "published": child_text(entry, "published"),
    }
    if all(video.values()):
        videos.append(video)
    if len(videos) == 9:
        break

if len(videos) != 9:
    raise RuntimeError(f"Expected 9 videos from YouTube RSS, received {len(videos)}")

output = "window.DRONATOR_VIDEOS = " + json.dumps(videos, ensure_ascii=False, indent=2) + ";\n"
OUTPUT_PATH.write_text(output, encoding="utf-8")