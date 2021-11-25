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
    name: "purge",
    aliases: ['p', 'clear'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES")) return message.reply({
            embeds: [new MessageEmbed().setColor(ee.wrongcolor).setDescription(`I do not have permission to manage messages in this channel.`)]
        })

        try {
            clearamount = Number(args[0]);
            if (clearamount >= 1 && clearamount <= 100) {
                message.channel.bulkDelete(clearamount).catch(e => console.log("Couldn't delete msg, this is for preventing a bug"));
            } else {
                let limit = clearamount > 1000 ? 1000 : clearamount;
                for (let i = 100; i <= limit; i += 100) {
                    try {
                        await message.channel.bulkDelete(i).catch(e => console.log("Couldn't delete msg, this is for preventing a bug"));
                    } catch {}
                    await delay(1500);
                }
            }
            message.channel.send({
                embeds: [new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`Purged \`[ ${clearamount} ]\` messages.`)
                ]
            }).catch(e => console.log("Couldn't delete msg, this is for preventing a bug"));
        } catch (e) {
            console.log(String(e.stack));
            let embed = new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.error} | Something went very wrong`)
                .setDescription(`\`\`\`${e.message}\`\`\``)
            return message.reply({
                embeds: [embed.setColor(ee.wrongcolor)]
            })
        }
    },
};