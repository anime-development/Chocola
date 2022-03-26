const mongoose = require("mongoose");

const warn = mongoose.Schema({
    guildID: String,
    memberID: String,
    warnnings: Array,
    staff: Array,
    date: Array,
})

module.exports = mongoose.model(`warn`, warn);