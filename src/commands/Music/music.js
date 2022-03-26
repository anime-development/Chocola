const {
	CommandInteraction,
	Client,
	Message,
	MessageEmbed,
} = require("discord.js");

const { consoleerror, pages } = require("discord-helper.js");


module.exports = {
	name: "music",
	subdescription: ["play a song", "change volume", "change or use settings", "shuffle queue", "see the queue"],
	category: "music",
	subcommands: ["play", "volume", "settings", "shuffle", "queue"],
	usage: ["/music play [song]", "/music volume [volume]", "/music settings [options]", "/music shuffle", "/music queue [page]"],

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} int
	 */
	async command(int, client) {
		const { options, member, guild, channel } = int;
		const vc = member.voice.channel;

		if (!vc)
			return int.reply({
				content: "You must be in a voice channel!",
				ephemeral: true,
			});

		if (guild.me.voice.channelId && vc.id !== guild.me.voice.channelId)
			return int.reply({
				content: `I am already playing in <#${guild.me.voice.channelId}>`,
				ephemeral: true,
			});

		try {
			switch (options.getSubcommand()) {
				case "play": {
					client.distube.playVoiceChannel(vc, options.getString("query"), {
						textChannel: channel,
						member,
						member,
					});

					client.distube.selfDeaf = false;

					return int.reply({ content: "🎶Request Received 🎼" });
				}
				case "queue": {
					const queue2 = await client.distube.getQueue(vc);
					let pagenumber = options.getNumber("page") || "1";
					let songarray = [];

					queue2.songs.map((song, id) => {
						songarray.push(
							`\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
						);
					});

					const page = await pages(songarray, 20, pagenumber).then(data => {
						return data.array
					}).catch(err => client.log.error(err));

					const maxPages = Math.ceil(songarray.length / 20);

					return int.reply({
						embeds: [
							new MessageEmbed()
								.setColor("#FF69B4")
								.setDescription(
									`${page
										.map((song) => song)
										.join("\n\n")} \n\n Page: ${pagenumber} / ${maxPages}`
								),
						],
					});
				}
				case "shuffle": {
					client.distube.shuffle(vc);
					return int.reply({ content: "Queue shuffled!" });
				}

				case "volume": {
					const volume = options.getNumber("percent");
					if (volume > 100 || volume < 1)
						return int.reply({
							content: `please say a number between 1 and 100`,
							ephemeral: true,
						});

					client.distube.setVolume(vc, volume);
					return int.reply({ content: `Volume changed to ${volume}%` });
				}

				case "settings": {
					const queue = await client.distube.getQueue(vc);

					if (!queue)
						return int.reply({
							content: ` There is no queue`,
							ephemeral: true,
						});

					switch (options.getString("options")) {
						case "skip":
							await queue
								.skip(vc)
								.then(() => {
									return int.reply({ content: "Song Skipped!" });
								})
								.catch((err) => {
									return int.reply({
										content: ` There is no song next`,
										ephemeral: true,
									});
								});
							break;
						case "loop":
							let mode = client.distube.setRepeatMode(vc, parseInt(2));

							int.reply("Queue loop turned on");
							break;
						case "loop2":
							let mode3 = client.distube.setRepeatMode(vc, parseInt(1));

							int.reply("Queue loop turned on");
							break;
						case "loopoff":
							let mode2 = client.distube.setRepeatMode(vc, parseInt(0));

							int.reply("all loops have been turned off");
							break;
						case "stop":
							await queue.stop(vc);
							return int.reply({ content: "Song Stopped!" });
						case "pause":
							await queue.pause(vc);
							return int.reply({ content: "Song Paused!" });
						case "resume":
							await queue.resume(vc);
							return int.reply({ content: "Song Resumed!" });
					}
					return;
				}
			}
		} catch (err) {
			consoleerror(err);
		}
	},
};
