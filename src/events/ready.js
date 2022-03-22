const { ramapiv } = require("../../config");

module.exports = {
    name: 'ready',
    async run(client) {
        client.log.info(`Logged in as ${client.user.tag}.`);

    client.log.info(`Bot is Ready!`);

    client.ram_api_get.version_check(ramapiv)

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