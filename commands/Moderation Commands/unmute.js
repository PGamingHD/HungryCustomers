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
const ms = require("ms")

module.exports = {
    name: "unmute",
    aliases: ['unmuteu', 'unm'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let member = message.mentions.members.first();
        if (!member)
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setDescription(`Please provide a member to unmute!`)
                ]
            });
        if (member.roles.highest.position >= message.member.roles.highest.position)
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setDescription(`You may not unmute a higher ranked person.`)
                ]
            });
        let mutedrole = message.guild.roles.cache.get('897840771313598464');
        if (!mutedrole) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setDescription(`Couldn't find a muted role? Please ask a higher up to check this!`)
                ]
            })
        }
        if (!member.roles.cache.has(mutedrole.id)) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setDescription(`The mentioned user is not muted.`)
                ]
            })
        }
        if (mutedrole.position > message.guild.me.roles.highest.position) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setDescription(`I cannot access the muted role, because it is above my role`)
                ]
            });
        }
        message.reply({
            embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setAuthor(`New Unmute`, `https://cdn.discordapp.com/attachments/900434193643896882/900446086190202920/876572608584380446.png`)
                .addField(`Muted Member`, `${member.user.tag}`, true)
                .addField(`Unmuted by`, `${message.author.tag}`, true)
                .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}`)
            ]
        });
        member.send({
            embeds: [
                new MessageEmbed()
                .setColor(ee.color)
                .setAuthor(`You got unmuted`, `https://cdn.discordapp.com/attachments/900434193643896882/900446086190202920/876572608584380446.png`)
                .addField(`Unmuted in`, `**${message.guild.name}**`, true)
                .addField(`Unmuted by`, `**${message.author.tag}**`, true)
                .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}`)
            ]
        }).catch(e => console.log(e.message))
        member.roles.remove(mutedrole);
    },
};