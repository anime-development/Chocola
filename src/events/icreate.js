const customdb = require('../../modles/custom')
const { Custom } = require('../Fun commands/custom');
const { Warn } = require('../Mod Commands/warn');

module.exports = {
    name: 'int',
    async run(int, client) {
        const { commandName, options } = int;

        if (int.isContextMenu()) {
            switch (commandName) {
                case 'warnings':
                    new Warn(client).warnnings(int);
                break;
            }
        }



        if (!int.isCommand()) {
            return;
        }

        let dateping = Date.now();

        client.dateping = dateping

        const data = await customdb.findOne({ _id: int.commandId })

        if (!data) {
            

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