<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Prajval Arora — portfolio

New home at `/`. Previous versions live under **Version history**:

- `/v1` circuit atlas
- `/v1/journey` driving journey
- `/v1/garage` internet garage

## Run locally

**Prerequisites:** Node.js

1. `npm install`
2. Optional: set `GEMINI_API_KEY` in `.env.local` (used by the archived radio/journey)
3. `npm run dev`

## Add the blimp video

The AMASS spread plays `public/portraits/blimp.mp4`. The WhatsApp clip is not in git until you put it there.

From your machine (in this repo):

```bash
cp "/Users/dr.arora/Downloads/WhatsApp Video 2026-09-20 at 23.04.29.mp4" public/portraits/blimp.mp4
```

Or in Cursor: drag that file onto the `public/portraits` folder and rename it to **`blimp.mp4`** (exact name). Then commit.

If it is still a `.mov`, convert first:

```bash
ffmpeg -i "/Users/dr.arora/Downloads/WhatsApp Video 2026-09-20 at 23.04.29.mp4" -c:v libx264 -pix_fmt yuv420p -movflags +faststart public/portraits/blimp.mp4
```


This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1ERghn41AbXiYvVi1erOkya8XZ7gEdnmN

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
