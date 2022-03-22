const { emoji} = require("../../config");
const bot = require("../bot");

bot.emotes = emoji;




// Define configuration options






const status = (queue, song) =>
	`Volume: \`${queue.volume}%\` |  Loop: \`${
		queue.repeatMode
			? queue.repeatMode === 2
				? "All Queue"
				: "This Song"
			: "Off"
	}\` `;

// Function called when the "dice" command is issued
function rollDice() {
	const sides = 6;
	return Math.floor(Math.random() * sides) + 1;
}

bot.distube
	.on("playSong", async (queue, song) => {
		
		bot.distube.selfDeaf = false;

		

		queue.textChannel.send(
			`${bot.emotes.play} | Playing: \`${song.name}\` - \`${
				song.formattedDuration
			}\`\nRequested By: ${song.user.username}\n${status(
				queue,
				song
			)}`
		);
	})
	.on("addSong", async (queue, song) => {
	
		queue.textChannel.send(
			`${bot.emotes.success} | Added: ${song.name} - \`${
				song.formattedDuration
			}\` To the queue By: ${song.user.username}`
		);
	})
	.on("addList", async (queue, playlist) => {
		queue.textChannel.send(
			`${bot.emotes.success} | Added \`${playlist.name}\` playlist (${
				playlist.songs.length
			} songs) to queue\n${status(queue)}`
		);
	})
	// DisTubeOptions.searchSongs = true
	.on("searchResult", async (message, result) => {
		let i = 0;
		message.channel.send(
			`**Choose an option from below**\n${result
				.map(
					(song) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``
				)
				.join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`
		);
	})
	// DisTubeOptions.searchSongs = true
	.on("searchCancel", async (message) => {
		message.channel.send(`${bot.emotes.error} | Searching canceled`);
	})
	.on("error", async (channel, e) => {
		channel.send(`${bot.emotes.error} | An error encountered: ${e}`);
		console.error(e);
	})
	.on("empty", async (channel) => {
		channel.send("Voice channel is empty! Leaving the channel...");
	})
	.on("searchNoResult", async (message) => {
		message.channel.send(`${bot.emotes.error} | No result found!`);
	})
	.on("finish", async (queue) => {
		queue.textChannel.send("Finished!");
	});
