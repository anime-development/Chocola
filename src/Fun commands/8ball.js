const { Interaction, Client, MessageEmbed } = require("discord.js");
const { get } = require("ram-api.js");
const { ramapiv } = require("../../config");
const { ramapitoken } = require("../../secure/token");

class _8ball {
    /**
     * 
     * @param {Interaction} int 
     * @param {Client} client 
     */
    constructor (int, client) {
        const {options} = int;

        const q = options.getString('question');

        get._8ball(ramapiv, ramapitoken).then(data => {
            let embed = new MessageEmbed().setColor('BLURPLE').setDescription(`Question: ${q}\n \nAnswer: ${data.text}`)

            int.reply({embeds: [embed]})
        }).catch(error => client.log.error(error))
    }
}

exports._8ball = _8ball