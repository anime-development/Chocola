module.exports = {
    name: 'int',
    async run(int, client) {
        if (!int.isCommand()) {
			return;
		}

		const { commandName, options } = int;

        let cmd = client.commands.get(commandName);

        if(!cmd) return;

        cmd.command(int, client)
    }
}