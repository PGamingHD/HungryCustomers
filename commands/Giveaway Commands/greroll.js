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
    name: "greroll", //userMoney, userBank, userBitcoin, userID (ALL USERVALUES)
    aliases: ['giveawayreroll', 'givereroll'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        return message.reply({
            content: '**This command is currently disabled.**'
        })

        let searchquery = args.join(" ");
        const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === message.guildId && g.messageId === searchquery);

        // If no giveaway was found
        if (!giveaway) return message.reply('Unable to find a giveaway for message: **`' + args.join(' ') + '`**.');

        if (giveaway) {
            client.giveawaysManager.reroll(searchquery).then(() => {
                return message.reply('Success! Giveaway rerolled!');
            }).catch((err) => {
                return message.reply(`An error has occurred, please check and try again.\n\`${err}\``);
            });
        }
    },
};