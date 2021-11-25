const client = require("../index");
const {
    change_status
} = require("../handler/functions");
const {
    evaluate,
    random
} = require("mathjs");
const config = require("../botconfig/config.json");
const emoji = require("../botconfig/emojis.json");
const schedule = require("node-schedule");
const ms = require("ms");
const ee = require("../botconfig/embed.json");

client.on("ready", async (client) => {

    //HOST LOTTERY HERE!

    const job = schedule.scheduleJob('0 0 1-31/2 * *', async () => {
        //console.log("Doing every second day!")
        const channel = client.channels.cache.get('909572939861618688');

        const award = Math.floor(Math.random() * (500000 - 100000) + 100000);
        const duration = "12h";
        const winnerCount = 1;
        const roleName = '[ Pizza Supporter ]';
        const roleBonusEntries = 2;
        const pingRole = "910640717863456778";
        client.giveawaysManager.start(channel, {
            duration: ms(duration),
            winnerCount,
            prize: "💰 Money: $" + award,
            thumbnail: ee.footericon,
            messages: {
                giveaway: `<@&${pingRole}>
                
💰 **MONEY GIVEAWAY ONGOING** 💰`,
                giveawayEnded: '💰 **MONEY GIVEAWAY OVER** 💰',
                drawing: 'Ending in: {timestamp}',
                inviteToParticipate: 'React with 💰 to participate!',
                embedFooter: '{this.winnerCount} winner(s)',
                winners: 'Giveaway Winner(s):',
                endedAt: 'Giveaway ended',
                winMessage: '🎉Congratulations, {winners}! You won **{this.prize}**!\n{this.messageURL}',
                utils: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    plurals: false,
                }
            },
            bonusEntries: [{
                // Members who have the role which is assigned to "roleName" get the amount of bonus entries which is assigned to "roleBonusEntries"
                bonus: new Function('member', `return member.roles.cache.some((r) => r.name === \'${roleName}\') ? ${roleBonusEntries} : null`),
                cumulative: false
            }],
        })
    });

    //LOTTERY ABOVE!

    const job2 = schedule.scheduleJob('00 * * * *', async () => {
        client.connection.query(`SELECT 1;`)
        console.log("Posted SELECT 1 to DB for upkeep!")
    });

    try {
        try {
            console.log(`[LOGIN] <==> || I successfully logged into ${client.user.tag} and started ALL services || <==> [LOGIN]`)
        } catch {
            /* */
        }
        change_status(client);
        //loop through the status per each 10 minutes
        setInterval(() => {
            change_status(client);
        }, 1000 * 60 * 10);

    } catch (e) {
        console.log(String(e.stack))
    }
});