const {
    MessageEmbed
} = require("discord.js");
const client = require("../index")
const ee = require("../botconfig/embed.json");
const con = client.connection

client.giveawaysManager.on('giveawayEnded', (giveaway, winners, client) => {
    winners.forEach((member) => {
        con.query(`SELECT * FROM business WHERE userId = '${member.id}';`, function (error, results, fields) {
            if (results && results.length) {
                member.send({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`🎉 Congratulations, ` + member.user.username + `! You have won the giveaway and won the price: **` + giveaway.prize + `**! The price has been inserted into your business balance.`)
                    ]
                })
                let prize2 = giveaway.prize;
                let prize3 = prize2.match(/\d+/);
                con.query(`UPDATE business SET businessBalance = businessBalance + ${prize3[0]} WHERE userId = '${member.id}';`)
            } else {
                member.send({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setDescription(`🎉 Congratulations, ` + member.user.username + `! You have won the giveaway and won the price: **` + giveaway.prize + `**!\n\n**error:**You somewhat got past my checks, you do not own a business. Therefore cannot claim this price. Please create one then DM a staff member to claim this price correctly!`)
                    ]
                })
            }
        });
    });
});