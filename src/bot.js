const {Client, Intents } = require('discord.js');
const {} = require('../config');
const { token } = require('../secure/token');
const {} = require('ram-api.js');
const { consoleinfo } = require('discord-helper.js');


const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    consoleinfo('Bot Online')
})

client.login(token);