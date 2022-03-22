const { Client } = require('discord.js');
const fs = require('fs')

/**
 * 
 * @param {Client} client 
 */
module.exports = (client) =>  {
    let event = fs.readdirSync("./src/Mod Commands").filter(e => e.endsWith('.js'));

    for (let file of event) {
        let pull = require(`../Mod Commands/${file}`);

        client.mod.set(pull.name, pull);

        client.log.info(`Loaded mod ${file}`)
    }
}