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
    name: "gstart", //userMoney, userBank, userBitcoin, userID (ALL USERVALUES)
    aliases: ['giveawaystart', 'givestart'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, con) => {
        con.query(`SELECT * FROM business WHERE userId = '${message.author.id}';`, function (error, results, fields) {
            if (results && results.length) {
                message.delete(100);
                //const channel = message.mentions.channels.first();
                const hostedByUser = message.mentions.users.first();
                const duration = args[1];
                const winnerCount = parseInt(args[2]);
                const prize = args[3]
                //message.delete();

                if (!hostedByUser) {
                    return message.channel.send({
                        content: `${message.author}, Please ping the user that hosted this giveaway!`
                    }).then(msg => {
                        setTimeout(() => {
                            msg.delete();
                        }, 15 * 1000);
                    })
                }

                if (!duration) {
                    return message.channel.send({
                        content: `${message.author}, Please choose a giveaway duration! (eg: 10s, 10m, 10h, 10d)`
                    }).then(msg => {
                        setTimeout(() => {
                            msg.delete();
                        }, 15 * 1000);
                    })
                }

                if (!winnerCount) {
                    return message.channel.send({
                        content: `${message.author}, Please choose a winner count for this giveaway!`
                    }).then(msg => {
                        setTimeout(() => {
                            msg.delete();
                        }, 15 * 1000);
                    })
                }

                if (!prize) {
                    return message.channel.send({
                        content: `${message.author} Please choose a money value between **$100,000** - **$5,000,000**!`
                    }).then(msg => {
                        setTimeout(() => {
                            msg.delete();
                        }, 15 * 1000);
                    })
                }

                if (prize < 100000 || prize > 5000000) {
                    return message.channel.send({
                        content: `${message.author} Please choose a money value between **$100,000** - **$5,000,000**!`
                    }).then(msg => {
                        setTimeout(() => {
                            msg.delete();
                        }, 15 * 1000);
                    })
                }

                if (prize * winnerCount > results[0].businessBalance) {
                    return message.channel.send({
                        content: `${message.author} This command requires you to have the money to giveaway, please insert money into your business first.`
                    }).then(msg => {
                        setTimeout(() => {
                            msg.delete();
                        }, 15 * 1000);
                    })
                }

                if (isNaN(winnerCount)) {
                    return message.channel.send({
                        content: `${message.author} Winner count must be a number!`
                    }).then(msg => {
                        setTimeout(() => {
                            msg.delete();
                        }, 15 * 1000);
                    })
                }

                if (isNaN(prize)) {
                    return message.channel.send({
                        content: `${message.author} Prize must be a number!`
                    }).then(msg => {
                        setTimeout(() => {
                            msg.delete();
                        }, 15 * 1000);
                    })
                }

                const roleName = '[ Pizza Supporter ]';
                const roleBonusEntries = 2;
                const pingRole = "910640717863456778";
                client.giveawaysManager.start(message.channel, {
                    duration: ms(duration),
                    winnerCount,
                    prize: "💰 Money: $" + prize,
                    thumbnail: ee.footericon,
                    hostedBy: hostedByUser, // Who Hosted GiveAway
                    messages: {
                        giveaway: `<@&${pingRole}>
                        
💰 **MONEY GIVEAWAY ONGOING** 💰`,
                        giveawayEnded: '💰 **MONEY GIVEAWAY OVER** 💰',
                        drawing: 'Ending in: {timestamp}',
                        inviteToParticipate: 'React with 💰 to participate!',
                        hostedBy: 'Hosted By: {this.hostedBy}', // Who Hosted GiveAway
                        embedFooter: '{this.winnerCount} winner(s)',
                        winners: 'Giveaway Winner(s):',
                        endedAt: 'Giveaway ended',
                        winMessage: '🎉Congratulations, {winners}! You won **{this.prize}**!\n{this.messageURL}',
                    },
                    bonusEntries: [{
                        // Members who have the role which is assigned to "roleName" get the amount of bonus entries which is assigned to "roleBonusEntries"
                        bonus: new Function('member', `return member.roles.cache.some((r) => r.name === \'${roleName}\') ? ${roleBonusEntries} : null`),
                        cumulative: false
                    }],
                })
                return con.query(`UPDATE business SET businessBalance = businessBalance - ${prize} * ${winnerCount} WHERE userId = '${message.author.id}';`)
            } else {
                return message.channel.send({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setDescription(`You really trying to host a giveaway without a business? Shame on you..`)
                    ]
                })
            }
        });
    },
};