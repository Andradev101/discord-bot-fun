console.log("alive");

const express = require("express");
const app = express();
const port = 3000;
const fs = require('node:fs');
const path = require('node:path');

// Require the necessary discord.js classes
const { Client, Events, Collection, GatewayIntentBits, REST, Routes, Message } = require('discord.js');
const { token, clientId, guildId } = require('./config.json');
const rest = new REST({ version: '10' }).setToken(token);

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessages] });
client.commands = new Collection();
// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});
// Log in to Discord with your client's token
client.login(token);

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on("messageCreate", async (message) => {
	console.log(`a message was created`);
	console.log({message});
	if(message.author.id != clientId) {
		await message.reply('yo');
	}
});

client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isChatInputCommand()) return;
	//console.log(interaction);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});



app.get('/', (req, res) => {
	res.send("hello!");
})

app.listen(port, () => {
	console.log("listening to: " + port);
})