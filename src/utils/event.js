const { Client } = require('discord.js');
const fs = require('fs')

/**
 * 
 * @param {Client} client 
 */
module.exports = (client) =>  {
    let event = fs.readdirSync("./src/events").filter(e => e.endsWith('.js'));

    for (let file of event) {
        let pull = require(`../../src/events/${file}`);

        client.events.set(pull.name, pull);

        client.log.info(`Loaded Event ${file}`)
    }
}