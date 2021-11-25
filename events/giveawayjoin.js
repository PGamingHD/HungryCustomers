const {
    MessageEmbed
} = require("discord.js");
const client = require("../index")
const ee = require("../botconfig/embed.json");
const con = client.connection

client.giveawaysManager.on('giveawayReactionAdded', (giveaway, member, reaction) => {
    con.query(`SELECT * FROM business WHERE userId = '${member.id}';`, function (error, results, fields) {
        if (results && results.length) {
            return member.send({
                embeds: [
                    new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`Your giveaway entry has been noted, good luck!\n\n**Note:** Please note that by voting for our server you get 2 additional entries, vote here: https://top.gg/servers/904813369142427749`)
                ]
            })
        } else {
            member.send({
                embeds: [
                    new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setDescription(`You must have a business registered to join this giveaway, please register one with the \`.register\` command and then try again.`)
                ]
            })
            return reaction.users.remove(member.user);
        }
    })
});