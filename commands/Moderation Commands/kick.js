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
    name: "kick",
    aliases: ['kickuser', 'k'],
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
                    .setDescription(`Please provide a member to kick.`)
                return message.reply({
                    embeds: [embed.setColor(ee.wrongcolor)]
                })
            }

            if (kickmember == message.author.id) {
                return message.reply({
                    embeds: [new MessageEmbed().setColor(ee.color).setDescription(`You may not kick yourself.`)]
                })
            }

            if (kickmember == client.user.id) {
                return message.reply({
                    embeds: [new MessageEmbed().setColor(ee.color).setDescription(`You may not kick me.`)]
                })
            }

            let reason = args.slice(1).join(` `);
            if (!reason) {
                reason = `No reason specified`;
            }

            const memberPosition = kickmember.roles.highest.position;
            const moderationPosition = message.member.roles.highest.position;
            if (moderationPosition <= memberPosition) {
                let embed = new MessageEmbed()
                    .setDescription(`You may not kick a higher roled / same roled user.`)
                return message.reply({
                    embeds: [embed.setColor(ee.wrongcolor)]
                })
            }

            if (!kickmember.kickable) {
                let embed = new MessageEmbed()
                    .setDescription(`That member is not kickable.`)
                return message.reply({
                    embeds: [embed.setColor(ee.wrongcolor)]
                })
            }

            try {
                kickmember.kick({
                    reason: `Reason: ` + `${reason}` + ` || Executed by: ${message.author.tag}`
                }).then(() => {
                    let embed = new MessageEmbed()
                        .setAuthor(`New Kick`, `https://cdn.discordapp.com/attachments/900434193643896882/900446086190202920/876572608584380446.png`)
                        .addField(`Kicked Member`, `${kickmember.user.tag}`, true)
                        .addField(`Kicked by`, `${message.author.tag}`, true)
                        .setThumbnail(`${kickmember.user.displayAvatarURL({ dynamic: true })}`)
                        .addField(`Reason`, `\`\`\`${reason}\`\`\``)
                    return message.reply({
                        embeds: [embed.setColor(ee.color)]
                    })
                });
            } catch (e) {
                console.log(String(e.stack).red);
                let embed = new MessageEmbed()
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`${emoji.error} | Something went very wrong`)
                    .setDescription(`\`\`\`${e.message}\`\`\``)
                return message.reply({
                    embeds: [embed.setColor(ee.wrongcolor)]
                })
            }
        } catch (e) {
            console.log(String(e.stack).bgRed)
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