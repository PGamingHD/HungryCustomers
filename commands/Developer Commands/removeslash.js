const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const emoji = require("../../botconfig/emojis.json")
const ee = require("../../botconfig/embed.json");
const config = require("../../botconfig/config.json")

module.exports = {
    name: "removeslash", //userMoney, userBank, userBitcoin, userID (ALL USERVALUES)
    aliases: ['removeslashcmd', 'removeslashcmds'],
    cooldown: 1,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!config.adminID.includes(message.author.id) || !config.ownerID.includes(message.author.id)) return;

        client.application?.commands.set([]); // REMOVE ALL SLASH COMMANDS FROM ALL GUILDS! (WILL BE REINSTATED UPON RESTART)

        message.reply({
            embeds: [
                new MessageEmbed()
                .setColor("AA00FF")
                .setDescription(`Global slash commands removed upon request.`),
            ],
        });
    },
};