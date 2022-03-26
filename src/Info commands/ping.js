const { MessageEmbed } = require("discord.js");
const { Logger } = require("simply-logger");
const {ping: ram_api_ping} = require('ram-api.js')


class Ping {
    constructor() {
        let logger = new Logger("Chocola", "America/New_York", 12);
        logger.info(`Ping Ran`)
    }
    async run(int, client) {
        let {options, member, guild, channel} = int;

     var ping;

    await  ram_api_ping().then(data => {
         ping = data.ping
        
     }).catch(err => client.log.error(err))



        let b;
        if (Math.round(client.ws.ping) >= 300) b = "true";
        if (Math.round(client.ws.ping) < 300) b = "false";

        let d;

        if (Math.round(Date.now() - client.dateping) >= 500) d = "true";
        if (Math.round(Date.now() - client.dateping) < 500) d = "false";

        let c;

        if (ping.replace('ms', "") >= 500) c = "true";
        if (ping.replace('ms', "") < 500) c = "false";

        let embedinfo = {
            author: {
                name: client.user.tag,
                icon_url: client.user.avatarURL(),
            },
            footer: {
                text: `Requested By: ${member.user.tag}`,
                icon_url: member.user.avatarURL({dynamic: true})
            },
            timestamp: new Date()
        }

        const embed = new MessageEmbed(embedinfo)
           
            .setThumbnail(client.user.avatarURL())
            .setTitle("Pong 🏓")
            .setColor("RANDOM")
           
            .setDescription(
                `Latency is: ${Math.round(
                    Date.now() - client.dateping
                )}ms! \n API Latency is: ${Math.round(
                    client.ws.ping
                )}ms! \n Ram api Latency: ${ping}! \n Bot Lag: ${d} \n Api lag: ${b} \n Ram api lag: ${c} \n\n Ran at: ${client.date}`
            );

        int.reply({ content: " ", embeds: [embed] });

    }
}

exports.Ping = Ping