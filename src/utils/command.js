const { Client } = require('discord.js');
const fs = require('fs')

/**
 * 
 * @param {Client} client 
 */
module.exports = (client) =>  {
   fs.readdirSync(`./src/commands`).forEach(dir => {
       let commands = fs.readdirSync(`./src/commands/${dir}`).filter(c => c.endsWith('.js'));

       for (let file of commands) {
           let pull = require(`../commands/${dir}/${file}`);

           client.commands.set(pull.name, pull);

           client.log.info(`Loaded Command: ${file}`)
       }
   })
}