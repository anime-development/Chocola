const { Permissions } = require("discord.js");

class Ban {
    constructor(client) {
        this.client = client;

        client.log.info('Ban command ran')
    }
    async run(int) {
        let {options, member, guild, channel} = int;

        if(!member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return int.reply({content: "You are missing the BAN_MEMBERS permission", ephemeral: true});

        await int.reply({content: 'Running ban one moment please!', ephemeral: true});

        var user = options.getMember('member');
        var reason = options.getString('reason') || "No reason Provided!"

        if(!user) {
            int.followUp({content: 'Error running ban the user provided was not found', ephemeral: true});
            
        }

        await user.send({content: `You were banned in ${guild.name} for ${reason}`}).catch(err => {

        })

        user.ban({reason});

        int.followUp({content: 'ban completed', ephemeral: true})
    }
}

exports.Ban = Ban