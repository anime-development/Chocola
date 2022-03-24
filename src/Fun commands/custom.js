const { Logger } = require('simply-logger')
const { MessageEmbed, CLient, Member, Interaction, Permissions } = require('discord.js')
const customdb = require('../../modles/custom')

class Custom {
    constructor() {
        let logger = new Logger("Chocola", "America/New_York", 12);

        logger.info(`Custom command system loaded/used`)
    }
    /**
     * 
     * @param {Interaction, Member} int 
     * @param {Client} client 
     */
    create(int, client) {



        const { options, guild, member } = int;

        if (!member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return int.reply({ content: 'permission error missing admin', ephemeral: true });

        var name = options.getString('command');
        var response = options.getString('response');
        var ping = options.getRole('ping') || "false";
        var perm = options.getRole('permission') || "false";
        var title = options.getString('title') || 'Custom Command';


        let f = false;


        if (perm !== 'false') f = true;

        var newData = new customdb({
            response,
            command: name,
            ping,
            perm,
            guildid: int.guild.id,
            title,
            _id: ''
        });



        guild.commands
            ?.create({
                name,
                description: "Custom Command",
                defaultPermission: false,
            })
            .then((data) => {
                newData._id = data.id;
                newData.save()

                var permmisions = [];

                permmisions.push({
                    id: perm.id,
                    type: "ROLE",
                    permission: true,

                })

                data.permissions.set({ permissions: permmisions });

                int.reply({ content: `${name} was made and locked to ${perm} for who can run it.`, ephemeral: true })
            });



    }
    list(int, client, data) {
        if (!data) return int.reply('No Commands found');


        let embed = new MessageEmbed()
            .setTitle('Custom Commands List')
            .setDescription(data.map(c => `Command: ${c.command}`).join("\n"))

        int.reply({ embeds: [embed] })
    }
    remove(int, client, data) {
        const { options, guild, member } = int;

        if (!member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return int.reply({ content: 'permission error missing admin', ephemeral: true });
        if (data) data.delete();

        int.reply('Command removed run it to fully remove it')
    }
    run(int, client, data) {
        if (!data) return int.guild.commands.delete(int.commandId).then(cmd => {

            int.reply('Command not found in db removed from slash')
        });

        let res = data.response;
        console.log(res)

        res = res.replaceAll(String("\\n"), " \n")

        res = res.replaceAll("\*", '*');
        res = res.replaceAll("\`", '`')

        console.log(res)

        let embed = new MessageEmbed()
            .setTitle(data.title)
            .setDescription(res)
            .setThumbnail(int.guild.iconURL());

        let ping = '';

        if (data.ping !== "false") ping = data.ping;

        if (data.ping === "false") int.reply({ embeds: [embed] })
        else int.reply({ content: data.ping, embeds: [embed] })
    }


}

exports.Custom = Custom;