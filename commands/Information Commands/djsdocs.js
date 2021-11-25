const {
    Message,
    Client,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const emoji = require("../../botconfig/emojis.json")
const ee = require("../../botconfig/embed.json");
const {
    link
} = require("fs");
const axios = require("axios");

module.exports = {
    name: "djsdocs", //userMoney, userBank, userBitcoin, userID (ALL USERVALUES)
    aliases: ['djsdocumentation', 'discordjsdocs'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        if (!args[0]) {
            return message.reply({
                content: 'Input valid search!'
            })
        }
        try {
            axios.get(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${args.join(" ")}`).then(embed => {
                const {
                    data
                } = embed;
                data.color = ee.color
                message.channel.send({
                    embeds: [data]
                });
            });
        } catch (e) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setDescription(`Something went wrong while executing the command:
                    \`\`\`${e}\`\`\``)
                ]
            })
        }
    },
};