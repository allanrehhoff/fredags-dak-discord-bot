# Fredags Dak Discord Bot
Personal project - A Discord bot that listens for youtube links in a given channel and saves them... Somewhere, and tells you if the link has previously been posted.

# Installation instructions
1. Rename .env-sample to .env
2. Set the config values accordingly.
2.1 `BOT_TOKEN` The token from your discord developer portal.
2.2 `API_URL` Url of the API
2.3 `API_USER` Provided api username
2.4 `API_PASS` Provided api password
3. `npm install` To install packages required by the bot
4. `npm run start` to start the bot.

# Prerequisites
- git - Obviously, to clone this repository
- node.js v16 or later
- npm - Node Package Manager (Sometimes bundled with node depending on installation method)

# Configuration notice
If the bot for whatever reason doesn't run, after setting up the .env file.  
You may need to set up these configurations as environment variables within the OS.

> **Note** `npm run watch` must only be executed in local development environments.
> Do not use in production!