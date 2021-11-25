const {
    MessageEmbed
} = require("discord.js");
const client = require("../index");
const ee = require("../botconfig/embed.json");

client.giveawaysManager.on('giveawayReactionRemoved', (giveaway, member, reaction, client) => {
    member.send({
        embeds: [
            new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription(`Your giveaway leave has been successfully noted.`)
        ]
    })
});