const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const bot = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	],
});

bot.on('ready', function() {
	console.log(`[LOG] Logged in as ${bot.user.tag}!`);
});

bot.on('messageCreate', async function(message) {
	// This clown prevents this event from looping infinitely.
	// as the bot's own messages/replies will also trigger this event.
	// Do not remove...
	if (message.author.bot) return;

	var endpoint = process.env.API_URL + '/submit-entry';

	var settings = {
		auth: {
			username: process.env.API_USER,
			password: process.env.API_PASS
		},
		responseType: 'json'
	};

	var submittedBy = message.member.displayName ? message.member.displayName : message.author.username;
	var urls = message.content.match(/(https?:\/\/[^\s]+)/g);

	if(urls == null) return;

	// Realistically one would only ever submit one url per message.
	// But this helps preventing annyoing things from being ever an issue.
	for(url of urls) {
		// Ignore urls that doesn't not seem to be
		// a youtube url, (including short urls)
		if(url.includes("yout") !== true) return;

		let payload = {
			url: url,
			submitted_by: submittedBy
		};

		try {
			console.log("[LOG] Transmitting payload");
			console.log("[LOG] " + JSON.stringify(payload));

			let response = await axios.post(endpoint, payload, settings);
			let data = response.data;

			if(Array.isArray(data.message)) {
				for (let row of data.message) {
					if(typeof row == "object" && "callback" in row) {
						message[row.callback](...row.params);
					} else {
						message.channel.send(row);	
					}
				}
			} else {
				message.channel.send(data.message);
			}

			console.log("[LOG] Recieved response");
			console.log("[LOG] " + JSON.stringify(data));
		} catch(e) {
			console.log("[ERR] Exception Caught: ", e);
			console.log("[ERR] " + e.message);
			message.channel.send("An error has occurred, please notify the administrator.");
		}
	}
});

bot.login(process.env.BOT_TOKEN);