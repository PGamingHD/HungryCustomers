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

module.exports = {
    name: "help", //userMoney, userBank, userBitcoin, userID (ALL USERVALUES)
    aliases: ['helpme', 'support', 'assistance'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!args[0]) {
            let embed = new MessageEmbed()
                .setColor(ee.color)
                .setTitle(`PizzaShack - Management | Staff Help`)
                .setDescription(`Welcome **${message.author.username}** to the Staff Help!`)
                .addField(`Page 1: Giveaway Commands`, `View all the giveaway commands.`)
                .addField(`Page 2: Information Commands`, `View all the informative commands.`)
                .addField(`Page 3: Moderation Commands`, `View all the server-moderation commands.`)
                .addField(`Page 4: Admin Commands`, `View all the Administrator commands.`)
                .setThumbnail(ee.footericon)
            return message.reply({
                embeds: [embed]
            })
        }
        if (args[0]) {
            if (!["1", "2", "3", "4", "5", "6"].includes(args[0])) {

                let embed = new MessageEmbed()
                    .setColor(ee.color)
                    .setTitle(`PizzaShack - Management | Staff Help`)
                    .setDescription(`Welcome **${message.author.username}** to the Staff Help!`)
                    .addField(`Page 1: Giveaway Commands`, `View all the giveaway commands.`)
                    .addField(`Page 2: Information Commands`, `View all the informative commands.`)
                    .addField(`Page 3: Moderation Commands`, `View all the server-moderation commands.`)
                    .addField(`Page 4: Admin Commands`, `View all the Administrator commands.`)
                    .setThumbnail(ee.footericon)
                return message.reply({
                    embeds: [embed]
                })
            }

            if (args[0] == "1") {
                return message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.color)
                        .setTitle(`PizzaShack | Giveaway Commands`)
                        .addField(`gstart [hostedBy] [duration] [WinnerCount] [money]`, `start a money giveaway in #channel`)
                        .addField(`gend [msgid]`, `End a message that is hosted in message ID provided!`)
                        .addField(`gdelete [msgid]`, `Delete a giveaway that is hosted in provided message ID!`)
                        .addField(`greroll [msgid] (DISABLED)`, `Reroll a giveaway that has been hosted in provided message ID!`)
                    ]
                })
            }

            if (args[0] == "2") {
                return message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.color)
                        .setTitle(`PizzaShack | Information Commands`)
                        .addField(`help`, `Get the staff management menu!`)
                        .addField(`djsdocs`, `Search and return options from djs documentation!`)
                    ]
                })
            }

            if (args[0] == "3") {
                return message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.color)
                        .setTitle(`PizzaShack | Moderation Commands`)
                        .addField(`ban [user] [reason]`, `Ban a user from the server for reason!`)
                        .addField(`kick [user] [reason]`, `Kick a user from the server for reason!`)
                        .addField(`purge [msgcount]`, `Purge messages from a specific channel!`)
                        .addField(`slowmode [duration]`, `Set up a channel slowmode for Xs!`)
                        .addField(`mute [user] [time] [reason]`, `Mute a user for X time for provided reason.`)
                    ]
                })
            }

            if (args[0] == "4") {
                return message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.color)
                        .setTitle(`PizzaShack | Admin Commands`)
                        .addField(`giveaways`, `Display all ongoing giveaways!`)
                        .addField(`hostdrop`, `Host a drop for the members (DISABLED)`)
                        .addField(`reload [cmd]`, `Reload a cmd that has been altered with.`)
                        .addField(`removeslash`, `Wipe all bot slash commands.`)
                        .addField(`shutdown`, `Shut the bot down, why tho?`)
                    ]
                })
            }
        }
    },
};