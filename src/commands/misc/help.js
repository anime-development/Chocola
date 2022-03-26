const { pages } = require("discord-helper.js");

module.exports = {
	name: 'help',
	description: 'fun commands',
	subcommands: ['help'],
	category: 'misc',
	usage: ['/help [cat] [page]'],
	subdescription: ['send you the help'],
	async command(int, client) {
		const interaction = int;
		const { options, member, guild, channel } = interaction;

		let page = options.getNumber("page") || 1;

		let cat = options.getString("catagories");

		console.log(cat)

		if (!cat) return int.reply({ content: 'Please select a catagory', ephemeral: true, })

		const formatString = (str) =>
			`${str[0].toUpperCase()}${str
				.slice(1)
				.toLowerCase()
				.replace("plugin", "")} Plugin`;

		let funarray = [];
		let num4 = 0;
		let num24;


		try {


			await client.commands
				.filter((cmd) => cmd.category === cat)
				.map((cmd) => {
					console.log(cmd)

					num24 = cmd.subcommands.length;
					cmd.subcommands.forEach((subcmd, index) => {
						num4++;
						funarray.push(
							`Command: **${subcmd}**, usage: **${cmd.usage[index]}**, Description: **${cmd.subdescription[index]}**`
						);
					});
				})

			if (num4 !== num24) return;
			console.log(1)
			const pagecontent = await pages(funarray, 7, page).then(data => { return data }).catch(err => client.log.error(err));




			let embed = {
				color: "RANDOM",
				title: `${formatString(cat)}`,
				description: `${pagecontent.array
					.map((cmd) => cmd)
					.join("\n\n")} \n\n ${pagecontent.page}`,
			};

			interaction.reply({ embeds: [embed] });

		} catch (error) {
			interaction.reply('Command not found or is missing')
			client.log.warn(error)
		}


	}
}

