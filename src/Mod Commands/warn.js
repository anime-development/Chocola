const { pages } = require("discord-helper.js");
const { Permissions } = require("discord.js");
const warnmodel = require('./../../modles/warn');

class Warn {
    constructor(client) {
        this.client = client;

        client.log.info(`Warn commands used`)
    }
    async warn(int) {
        let {options, member, guild, channel} = int;

        if(!member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return int.reply({content: 'You are missing permission MANAGE_MESSAGES', ephemeral: true});

        var user = options.getMember('member');
        var reason = options.getString('reason') || 'No Reason Provided';

        let data = await warnmodel.findOne({
            guildID: guild.id,
            memberID: user.id
        });

        let staff = member.id;

        if(!data) {
            await warnmodel.create({
                guildID: guild.id,
                memberID: user.id,
                warnnings: [reason],
                staff: [staff],
                date: [this.client.date],
            })

            int.reply({content: `Warnned ${user} for ${reason}`});
        } else {
            let warnnumber = data.warnnings.length + 1;

            data.warnnings.push(reason);
            data.staff.push(staff);
            data.date.push(this.client.date);
            data.save();

            int.reply({content: `Warned ${user} for ${reason}`})
        }
    }
    async unwarn(int) {
        let {options, member, guild, channel} = int;

        if(!member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return int.reply({content: 'You are missing permission MANAGE_MESSAGES', ephemeral: true});

        var user = options.getMember('member');
        var warnid = options.getString('warnid') - 1;


        let data = await warnmodel.findOne({
            guildID: guild.id,
            memberID: user.id
        });

        if(!data || !data.warnnings.length) return int.reply({
            content: 'This user doesn\'t have any warnnings',
            ephemeral: true
        })

        let warnnumber = data.warnnings.length - 1;
        
        data.warnnings.splice(warnid);
        data.staff.splice(warnid);
        data.date.splice(warnid);

        data.save();

        int.reply({content: `Removed warning from ${user}`})


    }
    async warnnings(int) {
        let {options, member2, guild, channel, targetId} = int;

        const member = guild.members.cache.get(targetId);
        let data = await warnmodel.findOne({
            guildID: guild.id,
            memberID: member.id
        });

        if(!data || !data.warnnings.length) return int.reply({
            content: 'This user doesn\'t have any warnnings',
            ephemeral: true
        })

        const data2 = [];
      

        for(let i = 0; data.warnnings.length > i; i++) {
            
            let staffmember = await guild.members.cache.get(data.staff[i]);
            if(!staffmember) staffmember = `Staff left (${data.staff[i]})`;

            data2.push(`**ID:** ${i + 1}`);
            data2.push(`**Warnning:** ${data.warnnings[i]}`);
            data2.push(`**Staff:** ${staffmember}`);
            data2.push(`**Time:** ${data.date[i]}\n`)
        }

        

        let pagen = 1;

        const page = await pages(data2, 20, pagen).then(data => {return data}).catch(err => this.client.log.error(err));
        console.log(page)
        const embed = {
            color: 'RANDOM',
            title: `${member.user.tag} Warnnings`,
            thumbnail: {
                url: member.user.avatarURL({dynamic: true, format: 'png'}),
            },
            description: `${page.array.join("\n")}`,
        }

        int.reply({
            embeds: [embed]
        })
    }
}

exports.Warn = Warn