# Discord Quest Auto-Completion Bot

A selfbot that automatically completes **Discord Quests** with a Discord bot interface for easy control.

> [!CAUTION]
> As of April 7th 2026, Discord has expressed their intent to crack down on automating quest completion.
> 
> Use the script at your own risk.

> [!WARNING]
> **I take no responsibility for accounts that get blocked for using this repo.**

> [!CAUTION]
> **Using this on a user account is prohibited by the [Discord TOS](https://discord.com/terms) and can lead to account suspension.**

## ✨ Features

- Automatically **enrolls** and **completes** currently active quests
- Supported task types:
  - `WATCH_VIDEO`
  - `PLAY_ON_DESKTOP`
  - `PLAY_ON_XBOX` (untested)
  - `PLAY_ON_PLAYSTATION` (untested)
  - `PLAY_ACTIVITY` (untested)
  - `WATCH_VIDEO_ON_MOBILE`
  - `ACHIEVEMENT_IN_ACTIVITY`
- **Discord Slash Commands** for easy control
- **Deploy on Render** (free 24/7 with cron job)
- **Persistent token storage** per user
- **Child process isolation** - bot won't crash after quest

## 📋 Slash Commands

| Command | Description |
|---------|-------------|
| `/token <token>` | Save your Discord token |
| `/complete` | Start auto-complete quest |
| `/mytoken` | View your saved token (partially hidden) |
| `/deltoken` | Delete your saved token |
| `/help` | Show help menu |

## 🚀 Deploy on Render

### Prerequisites

1. **Discord Bot Token** - Create at [Discord Developer Portal](https://discord.com/developers/applications)
2. **GitHub Account** - For repository hosting
3. **Render Account** - For free hosting

### Step 1: Create Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **"New Application"** → Give it a name
3. Go to **Bot** tab → Click **"Reset Token"** → Copy the token
4. Enable these Intents:
   - ✅ `MESSAGE CONTENT INTENT`
   - ✅ `SERVER MEMBERS INTENT`
   - ✅ `PRESENCE INTENT`
5. Invite bot to your server:
   - Go to **OAuth2** → **URL Generator**
   - Select `bot` and `applications.commands`
   - Select permissions: `Send Messages`, `Read Message History`
   - Copy URL → Open in browser → Select your server

### Step 2: Deploy on Render

1. **Push code to GitHub** (private repository recommended)
2. Go to [Render.com](https://render.com) and sign in
3. Click **"New +"** → Select **"Web Service"**
4. Connect your GitHub repository
5. Fill in the configuration:

| Field | Value |
|-------|-------|
| **Name** | `discord-quest-bot` (or your choice) |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm run start:bot` |

6. Add Environment Variables:

| Key | Value |
|-----|-------|
| `BOT_TOKEN` | Your Discord bot token |
| `NODE_VERSION` | `24.0.0` |

7. Click **"Create Web Service"**

### Step 3: Keep Bot Alive (Cron Job)

> [!IMPORTANT]
> Render free services sleep after 15 minutes of inactivity.
> You need a cron job to keep it alive!

**Option 1: UptimeRobot (Recommended)**
1. Go to [UptimeRobot](https://uptimerobot.com/)
2. Sign up for free
3. Add a new monitor:
   - **Type:** HTTP(s)
   - **Friendly Name:** Discord Quest Bot
   - **URL:** `https://your-bot-name.onrender.com`
   - **Interval:** 10 minutes
4. Save

**Option 2: cron-job.org**
1. Go to [cron-job.org](https://cron-job.org/)
2. Sign up for free
3. Create a cron job:
   - **Title:** Discord Quest Bot
   - **URL:** `https://your-bot-name.onrender.com`
   - **Schedule:** Every 10 minutes
4. Save

**Option 3: Self-hosted (crontab)**
```bash
*/10 * * * * curl -s https://your-bot-name.onrender.com > /dev/null
```

Step 4: Use the Bot

1. Go to your Discord server
2. Type /help to see all available commands
3. Save your user token: /token <your_discord_token>
4. Start quest: /complete

[!IMPORTANT]
The token you save with /token is your Discord user token, not the bot token!
Get it from: Discord Desktop App → Ctrl+Shift+I → Network → Look for Authorization header.

📦 Local Development

[!NOTE]
Node.js 24.0.0 or newer is required

```bash
# Install dependencies
npm install

# Create config file
echo '{"botToken": "YOUR_BOT_TOKEN", "allowedUsers": []}' > config.json

# Start the bot
npm run start:bot
```

📁 Project Structure

```
Discord-Quest-Auto-Completion-Selfbot/
├── src/                    # Original quest code
├── bot.ts                  # Original quest logic
├── index.ts                # Bot entry point (Slash Commands)
├── package.json            # Dependencies & scripts
├── user-tokens.json        # Saved user tokens (auto-generated)
└── README.md               # This file
```

🛠️ Troubleshooting

Bot is online but not responding

· Make sure MESSAGE CONTENT INTENT is enabled in Discord Developer Portal
· Re-invite the bot to your server
· Check Render logs for errors

Quest not completing

· Check if there are active quests available
· Wait 15-20 minutes for quest completion
· Check token is correct (user token, not bot token)

Bot crashes after quest

· This is now fixed! Quest runs in isolated child process
· Main bot stays alive

⚠️ Important Notes

1. This is a selfbot - using user tokens violates Discord ToS
2. Use at your own risk - accounts may be suspended
3. Use a secondary account for testing
4. Tokens are stored locally in user-tokens.json
5. Bot tokens are safe in Render environment variables

🙏 Credits

· Complete Recent Discord Quest
· Equicord's Questify plugin
· discord.js
· zaminhh - Bot integration & Render deployment
· neko chan ai - Idea contribution

📄 License

GPL-3.0-only

---
