const client = require("../index")

client.giveawaysManager.on('giveawayRerolled', (giveaway, winners, client) => {
    winners.forEach((member) => {
        member.send({
            embeds: [
                new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`🎉 Congratulations, ` + member.user.username + `! You have won the giveaway and won the price: **` + giveaway.prize + `**!`)
            ]
        })
    });
});