const client = require("../index");
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js")
const ee = require("../botconfig/embed.json")
const emoji = require("../botconfig/emojis.json");
const config = require("../botconfig/config.json");

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;

    let con = client.connection;


    if (!config.staffID.includes(message.author.id) && !config.ownerID.includes(message.author.id)) return message.reply({
        content: `This bot is only intended to be used by **Server Staff**, therefore you may not use this bot. Sorry!`
    });

    client.connection.query(`SELECT * FROM payoutcooldown`, async function (error, results, fields) {
        if (error) throw error;
        if (results[0].payoutcooldown == 1) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setDescription(`${emoji.error} Hourly incomes are currently being sent out, please wait around **15 seconds** before running commands again. Sorry for the inconvenience!`)
                ]
            })
        } else {
            await command.run(client, message, args, con); //IF GOES WRONG, PLACE COMMAND.RUN FUNCTION HERE AGAIN (AND DELETE QUERY ABOVE)! -- await command.run(client, message, args, con);
        }
    });
});