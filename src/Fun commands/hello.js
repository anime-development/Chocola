const { get, fun } = require("ram-api.js");
const { ramapiv } = require("../../config");
const { ramapitoken } = require("../../secure/token");

class Hello {
    constructor (int, client) {
        fun.hello(ramapiv, ramapitoken).then(data => {
            int.reply({content: data.text})
        }).catch(err => {
            int.reply({content: 'There was an error!', ephemeral: true,});

            client.log.error(err)

        })
    }
}

exports.Hello = Hello