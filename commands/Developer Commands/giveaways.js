const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const emoji = require("../../botconfig/emojis.json")
const ee = require("../../botconfig/embed.json");
const config = require("../../botconfig/config.json");

module.exports = {
    name: "giveaways", //userMoney, userBank, userBitcoin, userID (ALL USERVALUES)
    aliases: ['allgiveaways', 'totalgiveaways'],
    cooldown: 1, //.startdrop <valuetodrop> <channel> <valueamount>
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!config.adminID.includes(message.author.id) || !config.ownerID.includes(message.author.id)) return;

        const notEnded = client.giveawaysManager.giveaways.filter((g) => !g.ended);
        return message.reply({
            embeds: [
                new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`I currently have **${notEnded.length}** giveaways going on!`)
            ]
        })
    },
};