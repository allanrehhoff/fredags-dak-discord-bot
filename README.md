# Fredags Dak Discord Bot
Personal project - A Discord bot that listens for youtube links in a given channel and saves them... Somewhere, and tells you if the link has previously been posted.

# Before you start
To prevent `npm` from installing/bloating your system with development-only dependencies, make sure that node.js is set up in `production` mode

In short, set a environment variable `NODE_ENV=production`

[Read the documentation](https://nodejs.dev/learn/nodejs-the-difference-between-development-and-production)

Alternatively, you may force a production only install with `npm run install --production` instead of `npm install` listed under installation instructions.  
But doing so is generally discouraged, as it will prevent the codebase from changing behaviour properly (depending on environment) during runtime.  

# Installation instructions
1. Rename .env-sample to .env
2. Set the config values accordingly.
	1. `BOT_TOKEN` The token from your discord developer portal.
	2. `API_URL` Url of the API
	3. `API_USER` Provided api username
	4. `API_PASS` Provided api password
3. `npm install` To install packages required by the bot
4. `npm run start` to start the bot.

If the bot for whatever reason doesn't run properly, after setting up the .env file.  
You may need to set up these configurations as environment variables within the OS (or container).

Runtime errors, and informational messages will be logged to the console.

> **Note** `npm run watch` must only be executed in local development environments.
> Do not use in production!

# Prerequisites
- git - For this repository
- node.js version 16 or later
- npm - Node Package Manager (Sometimes bundled with node depending on installation method)