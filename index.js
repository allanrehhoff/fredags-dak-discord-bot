const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv').config();
const getUrls = require('get-urls');
const axios = require('axios');

//if (dotenv.error) throw dotenv.error; // Lol, someone made an error or has a missing config file, better tell them.

//const bot = new Client( {
//	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
//    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
//});

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

	var payload = {};

	let submittedBy = message.member.displayName ? message.member.displayName : message.author.username;

	payload.submitted_by = submittedBy;

	// Realistically one would only ever submit one url per message.
	// But this helps preventing annyoing things from being ever an issue.
	for(embed of message.embeds) {
		payload.url = embed.url;

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
			console.log("[ERR] " + e.message);
			console.log("[ERR] Exception Caught: ", e);
			message.channel.send("An error has occurred, please notify the administrator.");
		}

	}
});

bot.login(process.env.BOT_TOKEN);