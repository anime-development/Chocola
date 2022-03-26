const mongoose = require("mongoose");

const PrefixSchema = new mongoose.Schema({
	response: {
		type: String,
		default: "disabled",
	},
	command: {
		type: String,
		default: "disabled",
	},
	ping: String,
	title: String,
	guildid: String,
	perm: {
		type: String,
		default: 'disabled'
	},
	_id: String,
});

const MessageModel = (module.exports = mongoose.model(
	"commands",
	PrefixSchema
));

