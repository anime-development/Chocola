const { Interaction, Client } = require("discord.js");
const { Kick } = require("../../Mod Commands/kick");

module.exports = {
    name: 'mod',
    description: 'moderation commands',
    subcommands: ['kick'],
    usage: ['[user]'],
    category: 'mod',
    subdescription: ['Kicks a member'],
    /**
     * 
     * @param {Interaction} int 
     * @param {Client} client 
     */
    async command(int, client) {
        const {options} = int;

        switch (options.getSubcommand()) {
            case "kick": 
                new Kick(int, client)
            break;
        }
    }
}