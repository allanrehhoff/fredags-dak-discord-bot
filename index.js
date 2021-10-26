const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv').config();
const getUrls = require('get-urls');
const axios = require('axios');

if (dotenv.error) throw dotenv.error; // Lol, someone made an error or has a missing config file, better tell them.

const bot = new Client( {
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});


bot.on('ready', function() {
	console.log(`[LOG] Logged in as ${bot.user.tag}!`);
});

bot.on('messageCreate', async function(message) {
	// This clown prevents this event from looping infinitely.
	// as the bot's own messages/replies will also trigger this event.
	// Do not remove...
	if (message.author.bot) return;

	for(url of getUrls(message.content)) {
		var endpoint = process.env.API_URL + '/submit-entry';

		var payload = {
			url: url
		};

		var settings = {
			auth: {
				username: process.env.API_USER,
				password: process.env.API_PASS
			},
			responseType: 'json'
		};

		try {
			let response = await axios.post(endpoint, payload, settings);
			let data = response.data;

			message.channel.send(data.message);
		} catch(e) {
			console.log("[ERR]" + e.message);
			message.channel.send("An error has occurred.");
		}

	}
});

bot.login(process.env.BOT_TOKEN);