const { Interaction, Client } = require("discord.js");
const { Ping } = require("../../Info commands/ping");
const { Kick } = require("../../Mod Commands/kick");

module.exports = {
    name: 'info',
    description: 'info commands',
    subcommands: ['ping'],
    usage: ['/ping'],
    category: 'info',
    subdescription: ['Ping Command'],
    /**
     * 
     * @param {Interaction} int 
     * @param {Client} client 
     */
    async command(int, client) {
        const { options } = int;

        switch (options.getSubcommand()) {
            case "ping":
                new Ping().run(int, client)
                break;
        }
    }
}