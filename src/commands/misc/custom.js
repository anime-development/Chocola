const { Custom } = require('../../Fun commands/custom')

module.exports = {
    name: 'custom',
    description: 'makes a custom command',
    subcommands: ['custom'],
    category: "misc",
    usage: ['[cmd] [response] [roleperm] [ping]'],
    subdescription: ['makes a command to slash for the guild note low limit as 100 slash limit exsists'],
    async command(int, client) {
        await new Custom().create(int, client)
    }
}