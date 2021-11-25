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
    name: "ban",
    aliases: ['banuser', 'b'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        try {
            let kickmember = message.mentions.members.first() || message.guild.members.cache.get(args[0] ? args[0] : ``);
            if (!kickmember) {
                let embed = new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setDescription(`Please provide a member to ban.`)
                return message.reply({
                    embeds: [embed.setColor(ee.wrongcolor)]
                })
            }

            if (kickmember == message.author.id) {
                return message.reply({
                    embeds: [new MessageEmbed().setColor(ee.color).setDescription(`You may not ban yourself.`)]
                })
            }

            if (kickmember == client.user.id) {
                return message.reply({
                    embeds: [new MessageEmbed().setColor(ee.color).setDescription(`You may not ban me.`)]
                })
            }

            let reason = args.slice(1).join(` `);
            if (!reason) {
                reason = `No reason specified`;
            }

            const memberPosition = kickmember.roles.highest.rawPosition;
            const moderationPosition = message.member.roles.highest.rawPosition;

            if (moderationPosition <= memberPosition) {
                let embed = new MessageEmbed()
                    .setDescription(`You may not ban a higher roled / same roled user.`)
                return message.reply({
                    embeds: [embed.setColor(ee.wrongcolor)]
                })
            }

            if (!kickmember.bannable) {
                let embed = new MessageEmbed()
                    .setDescription(`That member is not bannable.`)
                return message.reply({
                    embeds: [embed.setColor(ee.wrongcolor)]
                })
            }

            try {
                kickmember.ban({
                    days: 7,
                    reason: `Reason: ` + `${reason}` + ` || Executed by: ${message.author.tag}`
                }).then(() => {
                    let embed = new MessageEmbed()
                        .setAuthor(`New Ban`, `https://cdn.discordapp.com/attachments/900434193643896882/900446086190202920/876572608584380446.png`)
                        .addField(`Banned Member`, `${kickmember.user.tag}`, true)
                        .addField(`Banned by`, `${message.author.tag}`, true)
                        .setThumbnail(`${kickmember.user.displayAvatarURL({ dynamic: true })}`)
                        .addField(`Reason`, `\`\`\`${reason}\`\`\``)
                    return message.reply({
                        embeds: [embed.setColor(ee.color)]
                    })
                });
            } catch (e) {
                console.log(String(e.stack));
                let embed = new MessageEmbed()
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`${emoji.error} | Something went very wrong`)
                    .setDescription(`\`\`\`${e.message}\`\`\``)
                return message.reply({
                    embeds: [embed.setColor(ee.wrongcolor)]
                })
            }
        } catch (e) {
            console.log(String(e.stack))
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