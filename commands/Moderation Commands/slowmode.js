const {
    Message,
    Client,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const emoji = require("../../botconfig/emojis.json")
const ee = require("../../botconfig/embed.json");
const config = require("../../botconfig/config.json");

module.exports = {
    name: "slowmode",
    aliases: ['slow', 'setslowmode', 'setslow', 's'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {


        if (!message.channel.permissionsFor(message.guild.me).has("MANAGE_CHANNELS")) return message.reply({
            embeds: [new MessageEmbed().setColor(ee.wrongcolor).setDescription(`I do not have permission to manage messages in this channel.`)]
        })

        try {
            if (args[0] == 0) {
                message.reply({
                    embeds: [new MessageEmbed().setColor(ee.color).setDescription(`Slowmode was Disabled.`)]
                })
                message.channel.setRateLimitPerUser(args[0]);
                return;
            }
            if (!isNaN(args[0]) || parseInt(args[0]) < 0) {
                message.channel.setRateLimitPerUser(args[0]);
                let embed = new MessageEmbed()
                    .setDescription(`Slowmode changed to \`[ ${args[0]}s ]\` `)
                return message.reply({
                    embeds: [embed.setColor(ee.color)]
                })
            } else {
                let embed = new MessageEmbed()
                    .setDescription(`Input a valid number to set slowmode to.`)
                return message.reply({
                    embeds: [embed.setColor(ee.wrongcolor)]
                })
            }
        } catch (e) {
            console.log(String(e.stack))
            let embed = new MessageEmbed()
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.error} | Something went very wrong`)
                .setDescription(`\`\`\`${e.message}\`\`\``)
            return message.reply({
                embeds: [embed.setColor(ee.wrongcolor)]
            })
        }
    },
};