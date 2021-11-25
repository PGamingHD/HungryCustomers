const {
    MessageEmbed
} = require("discord.js");
const client = require("../index");
const ee = require("../botconfig/embed.json");

client.giveawaysManager.on('endedGiveawayReactionAdded', (giveaway, member, reaction, client) => {
    member.send({
        embeds: [
            new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription(`You may not join a giveaway that has already ended!`)
        ]
    })
    return reaction.users.remove(member.user);
});