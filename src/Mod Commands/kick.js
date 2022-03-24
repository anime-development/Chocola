const {Interaction, Permissions} = require('discord.js')
class Kick {
    constructor(client) {
       
        this.client = client;

        client.log.info(`Kick was used!`)

    }
    /**
     * 
     * @param {Interaction, *} int 
     */
    async run(int) {
        let {options, member, guild, channel} = int;

        if(!member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return int.reply({content: "You are missing the KICK_MEMBERS permission", ephemeral: true});

        await int.reply({content: 'Running kick one moment please!', ephemeral: true});

        var user = options.getMember('member');
        var reason = options.getString('reason') || "No reason Provided!"

        if(!user) {
            int.followUp({content: 'Error running kick the user provided was not found', ephemeral: true});
            
        }

        await user.send({content: `You were kicked in ${guild.name} for ${reason}`}).catch(err => {

        })

        user.kick({reason});

        int.followUp({content: 'kick completed', ephemeral: true})

    }
    
}

exports.Kick = Kick