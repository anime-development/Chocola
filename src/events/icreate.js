const customdb = require('../../modles/custom')
const { Custom } = require('../Fun commands/custom')

module.exports = {
    name: 'int',
    async run(int, client) {
        if (!int.isCommand()) {
            return;
        }

        const data = await customdb.findOne({ _id: int.commandId })

        if (!data) {
            const { commandName, options } = int;

            let cmd = client.commands.get(commandName);



            if (!cmd) return new Custom().run(int, client, data);

            cmd.command(int, client)
        } else {


            try {

                new Custom().run(int, client, data)

            } catch (error) {
                client.log.error(error)
            }



        }




    }
}