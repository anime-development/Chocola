const { info } = require("ram-api.js");
const { ramapiv, version } = require("../../config");
const { Logger } = require("../utils/customlogger");

module.exports = {
    name: 'ready',
    async run(client) {
        client.log.info(`Logged in as ${client.user.tag}.`);

    client.log.info(`Bot is Ready!`);

    info.version_check(ramapiv)


    setInterval(() => {
        info.version_check(ramapiv)
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

    

    

    setInterval(() => {
        let activities = [
            '/help',
            '/help',
            version,
            `/help | ${version}`,
            `Helping ${client.guilds.cache.size} Guilds`,
            version
        ]
        const index = Math.floor(Math.random() * (activities.length - 1) + 1);
        client.log.info(activities[index])
        client.user.setPresence({
            activities: [
                {
                    name: activities[index],
                    type: "PLAYING",
                },
            ],
            status: "dnd",
        });
    },79000)

    client.guilds.cache.forEach(guild => {
        require('../../command')(client, guild)
    })


    }
}