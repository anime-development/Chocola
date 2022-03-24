const { Interaction, Client } = require("discord.js");
const { Ban } = require("../../Mod Commands/ban");
const { Kick } = require("../../Mod Commands/kick");
const { Warn } = require("../../Mod Commands/warn");

module.exports = {
    name: 'mod',
    description: 'moderation commands',
    subcommands: ['kick', 'ban', 'warn', 'unwarn'],
    usage: ['/mod kick [user] [reason]', '/mod ban [user] [reason]', '/mod warn [user] [reason]', '/mod unwarn [user] [reason]'],
    category: 'mod',
    subdescription: ['Kicks a member', 'Bans a member from the server', 'warn a user', 'un warn a member'],
    /**
     * 
     * @param {Interaction} int 
     * @param {Client} client 
     */
    async command(int, client) {
        const { options } = int;

        switch (options.getSubcommand()) {
            case "kick":
                new Kick(client).run(int);
                break;
            case "ban":
                new Ban(client).run(int);
            break;
            case "warn":
                new Warn(client).warn(int);
            break;
            case "unwarn":
                new Warn(client).unwarn(int);
            break;
        }
    }
}