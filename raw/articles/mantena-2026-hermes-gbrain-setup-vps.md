---
title: "Hermes + GBrain: A Complete Setup Guide"
type: article
year: 2026
category: applications
raw_path: /Users/kmyu/Desktop/project/ai-wiki/raw/articles/mantena-2026-hermes-gbrain-setup-vps.md
raw_filename: "mantena-2026-hermes-gbrain-setup-vps.md"
source_collection: external
author: "Sudhir Mantena"
url: "https://escvelocity.com/hermes-gbrain-setup-vps/"
publisher: "escvelocity.com"
publication_date: "2026-05-06"
updated: "2026-05-15"
tags: [gbrain, hermes, vps, aws, ec2, x-twitter, oauth, tutorial, bun, pglite, cron]
---

> 본 raw 파일은 WebFetch로 추출한 본문 디지스트다. 원본 URL은 frontmatter `url` 참조. 일부 문장은 모델이 발췌·재구성했을 수 있다.

# Hermes + GBrain: A Complete Setup Guide

**Author:** Sudhir Mantena
**Publication Date:** May 6, 2026 (Updated May 15, 2026)
**Category:** Artificial Intelligence

---

## Article Text

### Introduction

The author describes setting up "a self-improving, always-on personal knowledge base that ingests my blog articles, X activity (posts, articles, likes), news articles from the web, research reports and documents; all without paying $200/mo for X API or $8/mo for ngrok."

---

## What Is GBrain?

GBrain is an open-source personal knowledge system created by Garry Tan (Y Combinator President & CEO). It functions as a persistent memory layer for AI agents rather than stateless chatbots. The concept aligns with Andrej Karpathy's LLM Wiki pattern, which maintains structured markdown pages that compound with new sources.

**Core capabilities include:**

- Ingesting articles, PDFs, tweets, emails, and transcripts
- Building knowledge graphs with typed entity relationships
- Running hybrid search (vector, keyword, and graph traversal)
- Maintaining itself through automated maintenance cycles
- Improving continuously with new information

---

## Prerequisites

- Hermes installed on AWS EC2 VPS (t3.medium instance recommended)
- Ubuntu 24 server with Hermes Agent running
- Terminal familiarity
- X (Twitter) developer account (free tier acceptable for personal use)

---

## Part 1: Installing GBrain

### Step 1: Install Bun

```bash
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
which bun  # should return /home/ubuntu/.bun/bin/bun
```

### Step 2: Clone and Install GBrain

```bash
git clone https://github.com/garrytan/gbrain ~/gbrain
cd ~/gbrain
bun install
bun link
```

**Verify:**
```bash
gbrain --version
# gbrain 0.22.x
```

### Step 3: Fix the PATH Problem (Critical)

The guide identifies a common issue: "Hermes spawns commands in a non-interactive shell that doesn't inherit your PATH." Solution involves adding Bun to `~/.profile`:

```bash
echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.profile
source ~/.profile
```

Verify Hermes can locate it:
```bash
bash -c 'which gbrain'
# should return /home/ubuntu/.bun/bin/gbrain
```

### Step 4: Create a Dedicated Brain Repo

The guide emphasizes: "Do not use the `~/gbrain` directory as your brain repo — that's the GBrain code itself."

```bash
mkdir ~/brain
cd ~/brain
git init
git commit --allow-empty -m "init brain repo"
```

### Step 5: Initialize GBrain

```bash
gbrain init
# Uses PGLite by default — no server required, zero config
```

### Step 6: Set Up Auto-Sync Cron

```bash
crontab -e
```

Add:
```bash
*/5 * * * * /home/ubuntu/.bun/bin/gbrain sync --repo /home/ubuntu/brain >> /home/ubuntu/brain/sync.log 2>&1
```

### Step 7: Verify Health

```bash
gbrain doctor
```

---

## Part 2: Content Ingestion

### How Ingestion Works

The author reflects on the learning process: "I read the README.md and thought GBrain expected us to convert our documents into markdown files and manually ingest them. It didn't feel right, but I ended up wasting some time on this. Then I figured, it might be better to ask Hermes to ingest files and create markdown files automatically."

The ingestion flow operates as follows:

1. User tells Hermes to ingest content
2. Hermes reads the ingest skill
3. Hermes fetches and processes the content
4. Hermes writes markdown to ~/brain/
5. Cron syncs every 5 minutes
6. GBrain indexes the material

### Ingesting PDFs and Articles

Users instruct Hermes: "Ingest this PDF: [URL or file path]. Write the brain page to ~/brain/"

Hermes processes content and writes structured markdown automatically.

### Important: Slug Convention

If Hermes writes files to subdirectories (e.g., `~/brain/notes/article.md`), the frontmatter slug field must match the path. Either:

1. Remove the `slug:` line entirely (GBrain derives it from path)
2. Set `slug: notes/article` to match the subdirectory

The guide warns: "Mismatched slugs cause sync failures." Clear failures with:

```bash
> ~/.gbrain/sync-failures.jsonl
gbrain sync --repo ~/brain --skip-failed
```

---

## Part 3: Connecting X to Fetch Posts and Reposts

### What You Actually Need

- X Developer account (free tier works for personal posts)
- Bearer Token from https://developer.x.com
- Credits on your X developer account ($0.001 per resource)

The guide notes: "X's Basic tier ($200/mo) is not available outside US. Use the pay-per-use credits model instead — add $25 to start, set auto-recharge."

### Step 1: Store Bearer Token in GBrain

```bash
gbrain config set secrets.X_BEARER_TOKEN "your_token_here"
```

### Step 2: Get Your Numeric User ID

```bash
export X_BEARER_TOKEN=$(gbrain config get secrets.X_BEARER_TOKEN | tr -d '[:space:]')
curl -sf -H "Authorization: Bearer $X_BEARER_TOKEN" \
  "https://api.x.com/2/users/by/username/YOUR_HANDLE" | python3 -m json.tool
# Note your numeric "id" — e.g. "15688105"
```

### Step 3: Ask Hermes to Build the Collector

Send to your Hermes CLI:

"Set up the x-to-brain gbrain integration. My details: X handle: @yourhandle
X user ID: YOUR_NUMERIC_ID
X_BEARER_TOKEN is already stored in gbrain config
Brain repo is at ~/brain
Collect: own posts, likes, reposts only
Do NOT configure any keyword searches
No bookmarks for now
Stagger the cron schedule with my existing crons
After first collection, ingest the tweets into gbrain as brain pages"

### Step 4: Fix the Cron

```bash
crontab -e
```

Add:
```bash
13,43 * * * * X_BEARER_TOKEN=$(/home/ubuntu/.bun/bin/gbrain config get secrets.X_BEARER_TOKEN) /usr/bin/python3 /home/ubuntu/.gbrain/integrations/x-to-brain/x_to_brain.py >> /home/ubuntu/.gbrain/integrations/x-to-brain/collector.log 2>&1
```

### Step 5: Tune the Schedule

The guide notes: "Every 30 minutes is overkill for personal use and burns unnecessary API credits." Adjust to twice daily:

```bash
0 8,20 * * * X_BEARER_TOKEN=...
```

### Test It

```bash
export X_BEARER_TOKEN=$(gbrain config get secrets.X_BEARER_TOKEN | tr -d '[:space:]')
python3 /home/ubuntu/.gbrain/integrations/x-to-brain/x_to_brain.py
```

**Expected output:**
```json
{
  "own_total": 399,
  "likes_total": 0,
  "own_new": 7
}
```

---

## Part 4: OAuth 2.0 for Likes, without paying for ngrok

The X developer API's liked_tweets endpoint requires OAuth 2.0 user context. The guide notes a cost-saving approach: "Your AWS VPS already has a public IP. Use it directly."

### Step 1: Enable OAuth 2.0 in X Developer Portal

Navigate to https://developer.x.com → your app → "User authentication settings":

- Enable OAuth 2.0
- Set callback URL to: `http://YOUR_VPS_IP:8000/callback`
- Note Client ID and Client Secret

### Step 2: Open Port 8000 on AWS

AWS Console → EC2 → Security Groups → Edit inbound rules:

- Type: Custom TCP
- Port: 8000
- Source: 0.0.0.0/0

**Important:** "Close this port after completing the OAuth flow. It's only needed once."

### Step 3: Run the OAuth Flow

Ask Hermes to create a Python PKCE script at `~/x-oauth.py` (Client ID, Client Secret, Callback URL: http://YOUR_VPS_IP:8000/callback, Scopes: tweet.read users.read like.read offline.access). The script listens on port 8000 for the callback, then stores `secrets.X_USER_ACCESS_TOKEN` and `secrets.X_USER_REFRESH_TOKEN` via `gbrain config`.

Run on VPS:

```bash
python3 ~/x-oauth.py
```

Open the printed URL in a laptop browser (not VPS). Authorize the app. X redirects to your VPS IP; the script captures and stores the token in GBrain config.

The author notes: "The `offline.access` scope gives you a refresh token — it won't expire."

### Step 4: Update the Collector for Likes

Ask Hermes to update the x-to-brain collector to use the OAuth 2.0 user access token for likes (load from gbrain config; on 401 refresh via `X_USER_REFRESH_TOKEN` and write updated tokens back).

### Step 5: Close Port 8000

"OAuth is done. Close the port" via AWS Console → EC2 → Security Groups → delete the port 8000 inbound rule.

---

## Final Architecture

```
Your X Activity
  ↓ (8 AM and 8 PM daily)
x_to_brain.py collector
  ├── Bearer token → own posts + reposts
  └── OAuth 2.0 token → likes (auto-refreshes)
  ↓
~/brain/ markdown files
  ↓ (every 5 minutes)
gbrain sync cron
  ↓
GBrain database (PGLite)
  ↓
Hermes agent queries brain
  → Full context on every response
```

---

## Crontab Summary

```bash
# GBrain sync — every 5 minutes
*/5 * * * * /home/ubuntu/.bun/bin/gbrain sync --repo /home/ubuntu/brain >> /home/ubuntu/brain/sync.log 2>&1

# X collector — 8 AM and 8 PM daily
0 8,20 * * * X_BEARER_TOKEN=$(/home/ubuntu/.bun/bin/gbrain config get secrets.X_BEARER_TOKEN) /usr/bin/python3 /home/ubuntu/.gbrain/integrations/x-to-brain/x_to_brain.py >> /home/ubuntu/.gbrain/integrations/x-to-brain/collector.log 2>&1
```

---

**Related Articles Listed:**
- Hermes Use-case: Browse, find prospects, save to Google sheets
- WordPress contact-form using Google Sheets (FREE)
- Save Slack and Whatsapp Conversations into Hermes + Gbrain Longterm Memory
- Hermes + Notion + GBrain: A Complete Setup Guide
- Hermes AI Agent on AWS EC2
- Hermes AI Agent Setup on AWS VPS
- Size Is Not a Moat
