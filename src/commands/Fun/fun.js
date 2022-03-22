const { Interaction, Client } = require("discord.js");
const { get } = require("ram-api.js");
const { ramapiv } = require("../../../config");
const { ramapitoken } = require("../../../secure/token");
const { _8ball } = require("../../Fun commands/8ball");
const { Hello } = require("../../Fun commands/hello");

module.exports = {
    name: 'fun',
    description: 'fun commands',
    subcommands: ['hello', '8ball'],
    category: 'fun',
    usage: ['', '[question]'],
    subdescription: ['sends a hello', 'ask the bot a question'],
    /**
     * 
     * @param {Interaction} int 
     * @param {Client} client 
     */
    async command(int, client) {
        const {options} = int;
        try {
        switch (options.getSubcommand()) {
            case "hello": 
                new Hello(int, client)
            break;
            case "8ball":
                new _8ball(int, client)
            break;
        }
    } catch (err) {
        client.log.error(err)
    }
    }
}