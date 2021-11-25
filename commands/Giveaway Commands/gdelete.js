const {
    Message,
    Client,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const emoji = require("../../botconfig/emojis.json");
const ee = require("../../botconfig/embed.json");
const {
    link
} = require("fs");
const ms = require("ms");
const {
    duration
} = require("moment");

module.exports = {
    name: "gdelete", //userMoney, userBank, userBitcoin, userID (ALL USERVALUES)
    aliases: ['giveawaydelete', 'givedelete'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        let searchquery = args.join(" ");
        const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === message.guildId && g.messageId === searchquery);

        // If no giveaway was found
        if (!giveaway) return message.reply('Unable to find a giveaway for message: **`' + args.join(' ') + '`**.');

        if (giveaway) {
            try {
                client.giveawaysManager.delete(searchquery)
                return message.reply('Success! Giveaway deleted!');
            } catch (e) {
                return message.reply(`An error has occurred, please check and try again.\n\`${err}\``);
            }
        }
    },
};