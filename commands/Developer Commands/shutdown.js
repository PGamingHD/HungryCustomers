const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const emoji = require("../../botconfig/emojis.json")
const ee = require("../../botconfig/embed.json");
const config = require("../../botconfig/config.json")

module.exports = {
    name: "shutdown", //userMoney, userBank, userBitcoin, userID (ALL USERVALUES)
    aliases: ['shutd', 'sd'],
    cooldown: 1,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!config.adminID.includes(message.author.id) || !config.ownerID.includes(message.author.id)) return;

        await message.reply({
            embeds: [
                new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`Message recieved, shutting down...`),
            ],
        });
        return process.exit();
    },
};