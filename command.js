const { Guild, Client } = require("discord.js");


/**
 * 
 * @param {Client} client 
 * @param {Guild} guild 
 */
module.exports = (client, guild) => {
    let commands = guild.commands;

    commands?.create({
        name: "music",
        description: "get music",
        options: [
            {
                name: "play",
                description: "Play a song",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "query",
                        description: "Provide a name or url for the song",
                        type: "STRING",
                        required: true,
                    },
                ],
            },
            {
                name: "shuffle",
                description: "shuffle a queue",
                type: "SUB_COMMAND",
            },
            {
                name: "volume",
                description: "Control the volume",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "percent",
                        description: "10 = 10%",
                        type: "NUMBER",
                        required: true,
                    },
                ],
            },
            {
                name: "queue",
                description: "get the queue",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "page",
                        description: "the page #",
                        type: "NUMBER",
                        required: false,
                    },
                ],
            },
            {
                name: "settings",
                description: "Select a setting",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "options",
                        description: "Select an option.",
                        type: "STRING",
                        required: true,
                        choices: [
                            {
                                name: "skip",
                                value: "skip",
                            },
                            {
                                name: "pause",
                                value: "pause",
                            },
                            {
                                name: "resume",
                                value: "resume",
                            },
                            {
                                name: "stop",
                                value: "stop",
                            },
                            {
                                name: "queueloop",
                                value: "loop",
                            },
                            {
                                name: "loopoff",
                                value: "loopoff",
                            },

                            {
                                name: "songloop",
                                value: "loop2",
                            },
                        ],
                    },
                ],
            },
        ],
    });

    commands?.create({
        name: 'help',
        description: 'help command',
        options: [
            {
                name: 'catagories',
                description: 'the catagory',
                type: 'STRING',
                choices: [
                    {
                        name: 'fun',
                        value: 'fun',

                    },
                    {
                        name: 'mod',
                        value: 'mod',
                        
                    },
                    {
                        name: 'misc',
                        value: 'misc',
                        
                    },
                    {
                        name: 'music',
                        value: 'music',
                        
                    }
                ],
                required: true,
            },
            {
                name: 'page',
                description: 'page number',
                type: 'NUMBER',
                required: false
            }
        ]
    })

    commands?.create({
        name: 'fun',
        description: 'fun',
        options: [
            {
                name: 'hello',
                description: 'Sends a hello',
                type: 'SUB_COMMAND',
            },
            {
                name: '8ball',
                description: 'ask the bot a question',
                type: 'SUB_COMMAND',
                options: [
                    {
                        name: 'question',
                        description: 'question to ask',
                        type: 'STRING',
                        required: true
                    }
                ]
            },
            {
                name: 'hug',
                description: 'hug someone',
                type: 'SUB_COMMAND',
                options: [
                    {
                        name: 'user',
                        description: 'member to hug',
                        type: 'USER',
                        required: true,
                    }
                ]
            }
        ]
    })

    commands?.create({
        name: 'mod',
        description: 'Moderation',
        options: [
            {
                name: 'kick',
                description: 'kick a member',
                type: 'SUB_COMMAND',
                options: [
                    {
                        name: "member",
                        type: 'USER',
                        description: 'the member to kick',
                        required: 'true',
                    }
                ]
            }
        ]
    })
}