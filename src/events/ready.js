const { ramapiv } = require("../../config");
const { Logger } = require("../utils/customlogger");

module.exports = {
    name: 'ready',
    async run(client) {
       new Logger("Chocola", "America/New_York", 12).info(`Logged in as ${client.user.tag}.`);

    client.log.info(`Bot is Ready!`);

    client.ram_api_get.version_check(ramapiv)


    setInterval(() => {
        client.ram_api_get.version_check(ramapiv)
    },140000)

    client.user.setPresence({
        activities: [
            {
                name: "/help",
                type: "PLAYING",
            },
        ],
        status: "dnd",
    });

    client.guilds.cache.forEach(guild => {
        require('../../command')(client, guild)
    })


    }
}