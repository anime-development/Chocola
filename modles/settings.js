const mongoose = require("mongoose");

const PrefixSchema = new mongoose.Schema({
	modlogs: {
		type: String,
		default: "disabled",
	},
	staffid: {
		type: String,
		default: "disabled",
	},
	welcomecid: {
		type: String,
		default: "disabled",
	},
	byecid: {
		type: String,
		default: "disabled",
	},
	memberrid: {
		type: String,
		default: "disabled",
	},

	_id: String,
});

const MessageModel = (module.exports = mongoose.model(
	"settings",
	PrefixSchema
));

