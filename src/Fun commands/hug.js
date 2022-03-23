const { MessageEmbed } = require("discord.js");
const { get } = require("ram-api.js");
const { client } = require("tmi.js");
const { ramapiv } = require("../../config");
const { ramapitoken } = require("../../secure/token");

class hug {
    constructor(member, client, int) {
        this.member = member;
        this.client = client,
        this.int = int;

        
    }
    async checkforwerrors() {
       
        if(!this.member) {
            this.int.editReply({content: 'Error: member not found', ephemeral: true});
            return false;
        }
        await get.version_check(ramapiv).catch(err => {
            this.client.log.error(err)
            return false;
        })

        return true;
    }
    async run() {

        try {
        get.hug(ramapiv, ramapitoken).then(data => {
           
            let embed = new MessageEmbed()
            .setDescription(`${this.int.member} hugged ${this.member}`)
            .setColor('BLURPLE')
            .setImage(data.url);

            this.int.followUp({embeds: [embed]})
        })
     } catch (error) {
            this.log.error(error)
        }

        
    } 
    
}

exports.hug = hug