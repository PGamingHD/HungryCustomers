const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const emoji = require("../../botconfig/emojis.json")
const ee = require("../../botconfig/embed.json");
const config = require("../../botconfig/config.json");

module.exports = {
    name: "hostdrop", //userMoney, userBank, userBitcoin, userID (ALL USERVALUES)
    aliases: ['dropval', 'startdrop'],
    cooldown: 1, //.startdrop <valuetodrop> <channel> <valueamount>
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!config.adminID.includes(message.author.id) || !config.ownerID.includes(message.author.id)) return;
        return message.reply({
            embeds: [
                new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setDescription(`Please remake command before using it, still uses MongoDB!`)
            ]
        })

        const channel = message.mentions.channels.first();
        if (!channel) return message.reply({
            embeds: [
                new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`Please mention a channel to host a drop in.`)
            ]
        })

        const moneyAmount = args[2];
        if (!moneyAmount) return message.reply({
            embeds: [
                new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`Please enter a valid amount of money to drop in the specified channel.`)
            ]
        })

        const filter = (msg) =>
            msg.guild.id === message.guild.id && msg.content === `.claimdrop`;
        message.reply({
            embeds: [new MessageEmbed().setColor(ee.color).setDescription("The drop has started in " + channel.toString())]
        });
        channel.send({
            embeds: [
                new MessageEmbed()
                .setColor(ee.color)
                .setTitle(`${emoji.loading} Ongoing Currency Drop ${emoji.loading}`)
                .setDescription(`You have 60 seconds to claim the **${moneyAmount}**${emoji.currency} with \`.claimdrop\``)
                .setFooter(`This drop is hosted by: ${message.author.tag}`, ee.footericon)
            ]
        });


        const collector = channel.createMessageCollector({
            filter,
            max: 1,
            time: 60000
        })

        collector.on('collect', async (message) => {
            const findBusiness = await Business.findOne({
                ownerID: message.author.id,
            })

            if (!findBusiness) {
                return message.reply({
                    content: `${emoji.error} You currently do not have a business, therefore cannot claim this price. Please use \`register\` first!`
                })
            }

            if (message.guild.id === message.guild.id && message.content === `.claimdrop` && findUser) {
                const coinsToBeClaimed = parseInt(moneyAmount);

                const updatedBusiness = await Business.findOneAndUpdate({
                    ownerID: message.author.id,
                }, {
                    $inc: {
                        businessBalance: coinsToBeClaimed,
                    }
                });

                return message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.color)
                        .setTitle(`${emoji.success} Currency Drop Claimed ${emoji.success}`)
                        .setDescription(`Congratulations, the **${coinsToBeClaimed}**${emoji.currency} has now been claimed and added to your wallet.`)
                        .setFooter(`This drop was claimed by: ${message.author.tag}`, ee.footericon)
                    ]
                })
            }
        })

        collector.on('end', collected => {
            if (collected.size === 0) {
                channel.send({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.color)
                        .setTitle(`${emoji.error} Currency Drop Timed out ${emoji.error}`)
                        .setDescription(`The time has run out, better luck next time!`)
                    ]
                })
            }
        })
        return;
    },
};