const {Client, Intents, Collection, MessageEmbed } = require('discord.js');
const { ramapiv } = require('../config');
const { token, ramapitoken } = require('../secure/token');
const { get: ram_api_get } = require('ram-api.js');
const discord = require('discord-helper.js');
const { Logger } = require('simply-logger');
const { date} = require('better-date.js');
const { default: DisTube } = require('distube');
const { default: SpotifyPlugin } = require('@distube/spotify');

const botdate = new date("America/New_York", 12).date



const logger = new Logger("Chocola", "America/New_York", 12);


const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_WEBHOOKS,
        
    ]
})

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    plugins: [new SpotifyPlugin()],
});

module.exports = client;

client.on('ready', () => {
    client.log = logger;
    client.date = botdate;
    client.ram_api_get = ram_api_get;

    client.events = new Collection();
    client.commands = new Collection();
    client.mod = new Collection();

    ['event', 'command'].forEach(hand => {
        require(`./utils/${hand}`)(client)
    })

    client.events.get('ready').run(client)
    
})

client.on('interactionCreate', (int) => {
    client.events.get('int').run(int, client)
})

client.on('guildCreate', async (guild) => {
    require('../command')(client, guild)
    let embed = new MessageEmbed().setTitle(client.user.tag).setDescription(`${guild.name}, Added me set up commands!`)
    discord.discordsendwebhook('https://discord.com/api/webhooks/882314806227513395/qd-LpPFf113Bt1kQ9IDK2Z5sPbRw0UVNkNvHheGFpd85mMtAiYVEFJPW9CyKhseR7zyJ', embed);

    
})

client.login(token);