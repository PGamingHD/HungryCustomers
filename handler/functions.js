const {
    MessageEmbed,
    Collection
} = require("discord.js");
const Discord = require("discord.js")
const config = require("../botconfig/config.json");
const ee = require("../botconfig/embed.json");

module.exports.change_status = change_status;

function change_status(client) {
    try {
        client.user.setActivity(config.status.text, {
            type: config.status.type,
            url: config.status.url
        }); //status
    } catch (e) {
        console.log(String(e.stack));
        client.user.setActivity(client.user.username, {
            type: "PLAYING"
        });
    }
}