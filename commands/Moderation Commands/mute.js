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
    name: "mute",
    aliases: ['muteuser', 'm'],
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
                    .setDescription(`Please provide a member to mute!`)
                ]
            });
        args.shift();
        if (member.roles.highest.position >= message.member.roles.highest.position)
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setDescription(`You may not mute a higher ranked person.`)
                ]
            });
        //args.shift();
        let time = args[0];
        /*
        if (!time)
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setDescription(`Please add a valid time format! Ex: 10m, 10s, 10d`)
                ]
            });
            */
        args.shift();
        let reason = args.join(` `);
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
        if (member.roles.cache.has(mutedrole.id)) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setDescription(`The mentioned user is already muted.`)
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

        let mutetime;
        try {
            mutetime = ms(time);
        } catch (e) {
            console.log(e)
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setDescription(`Please add a valid time format! Ex: 10m, 10s, 10d`)
                ]
            });
        }

        if (!mutetime || mutetime === undefined) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setDescription(`Please add a valid time format! Ex: 10m, 10s, 10d`)
                ]
            });
        }

        message.reply({
            embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setAuthor(`New Mute`, `https://cdn.discordapp.com/attachments/900434193643896882/900446086190202920/876572608584380446.png`)
                .addField(`Muted Member`, `${member.user.tag}`, true)
                .addField(`Kicked by`, `${message.author.tag}`, true)
                .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}`)
                .addField(`Reason`, `\`\`\`${reason ? `${reason.substr(0, 2048)}` : `No reason provided.`}\`\`\``)
            ]
        });
        member.send({
            embeds: [
                new MessageEmbed()
                .setColor(ee.color)
                .setAuthor(`You got muted`, `https://cdn.discordapp.com/attachments/900434193643896882/900446086190202920/876572608584380446.png`)
                .addField(`Muted in`, `**${message.guild.name}**`, true)
                .addField(`Muted by`, `**${message.author.tag}**`, true)
                .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}`)
                .addField(`Reason`, `\`\`\`${reason ? `${reason.substr(0, 2048)}` : `No reason provided.`}\`\`\``)
                .setFooter(`This is automated, if you are not unmuted after the time expires, please mention a moderator in the prison channel.`)
            ]
        }).catch(e => console.log(e.message))
        member.roles.add(mutedrole);
        setTimeout(() => {
            try {
                if (!member.roles.cache.has(mutedrole.id)) {
                    return;
                }
                message.reply({
                    embeds: [new MessageEmbed()
                        .setColor(ee.color)
                        .setAuthor(`New Unmute`, `https://cdn.discordapp.com/attachments/900434193643896882/900446086190202920/876572608584380446.png`)
                        .addField(`Muted Member`, `${member.user.tag}`, true)
                        .addField(`Muted by`, `${message.author.tag}`, true)
                        .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}`)
                        .addField(`Reason`, `\`\`\`${reason ? `${reason.substr(0, 2048)}` : `No reason provided.`}\`\`\``)
                        .setFooter(`The user has now served its time in the prison and is therefore unmuted.`)
                    ]
                });
                member.roles.remove(mutedrole);
            } catch (e) {
                return message.reply({
                    embeds: [new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setDescription(`Caught error while executing mute! Please contact the developer.`)
                    ]
                });
            }
        }, mutetime);
    },
};