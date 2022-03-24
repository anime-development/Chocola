const { Interaction, Client } = require("discord.js");
const { get } = require("ram-api.js");
const { ramapiv } = require("../../../config");
const { ramapitoken } = require("../../../secure/token");
const { _8ball } = require("../../Fun commands/8ball");
const { Hello } = require("../../Fun commands/hello");
const { hug } = require("../../Fun commands/hug");

module.exports = {
    name: 'fun',
    description: 'fun commands',
    subcommands: ['hello', '8ball', 'hug'],
    category: 'fun',
    usage: ['/fun hello', '/fun 8ball [question]', '/fun hug [member]'],
    subdescription: ['sends a hello', 'ask the bot a question', 'hug someone'],
    /**
     * 
     * @param {Interaction} int 
     * @param {Client} client 
     */
    async command(int, client) {
        const { options } = int;
        let user = options.getMember('user')

        try {
            switch (options.getSubcommand()) {
                case "hello":
                    new Hello(int, client)
                    break;
                case "8ball":
                    new _8ball(int, client)
                    break;
                case 'hug':
                    let hugcmd = new hug(user, client, int);

                    await int.reply({ content: 'Starting command one moment', ephemeral: true });

                    let ifs = await hugcmd.checkforwerrors();

                    if (!ifs) return int.followUp({ content: 'error has happened', ephemeral: true });

                    if (ifs) setTimeout(async () => await hugcmd.run(), 3000)
            }
        } catch (err) {
            client.log.error(err)
        }
    }
}