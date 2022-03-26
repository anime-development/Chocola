const { Custom } = require('../../Fun commands/custom')
const customdb = require('./../../../modles/custom')
module.exports = {
    name: 'custom',
    description: 'makes a custom command',
    subcommands: ['create', 'remove'],
    category: "custom",
    usage: ['/custom create [cmd] [response] [roleperm] [ping]', "/custom remove [name]"],
    subdescription: ['makes a command to slash', 'Remove a command'],
    async command(int, client) {
        switch (int.options.getSubcommand()) {
            case 'create':
                await new Custom().create(int, client)

                break;

            case 'remove':

                let data = await customdb.findOne({ command: int.options.getString('name') })
                if (!data) return int.reply('Not a valid command')
                await new Custom().remove(int, client, data)

                break;

            case "list":
                let data2 = await customdb.find({ guildid: int.guild.id })

                await new Custom().list(int, client, data2)

        }
    }
}