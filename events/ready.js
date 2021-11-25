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
const Discord = require("discord.js");
const {
    FindCursor
} = require("mongodb");

client.on("ready", async (client) => {

    //HOST LOTTERY HERE!

    const job = schedule.scheduleJob('*/10 * * * *', async () => {
        let findc = client.channels.cache.get('913379130987401226')

        if (findc) {

            function shuffelWord(word) {
                word = word.split('');

                //Remove the first and the last letter
                let first = word.shift();
                let last = word.pop();

                //Shuffle the remaining letters
                for (let i = word.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [word[i], word[j]] = [word[j], word[i]];
                }

                //Append and return
                return first + word.join("") + last;
            }


            let num = Math.floor(Math.random() * (25000 - 5000) + 5000);

            let answer = Math.round(num / 100) * 100;
            //WORDS
            let wordarray = [
                "pizza",
                "cheese",
                "dough",
                "sauce",
                "pineapple",
                "pepperoni",
                "flour",
                "tomato",
                "mozzarella",
                "basil",
                "yeast",
                "onion",
                "oregano",
                "water",
                "salt",
                "olives",
                "mushroom",
                "pepper",
                "sugar",
                "garlic",
                "salami",
                "ham",
                "chicken"
            ];

            let r = Math.floor(Math.random() * wordarray.length);

            //SCRAMBLERS
            let scrambledword = shuffelWord(wordarray[r]);
            if (scrambledword === wordarray[r]) {
                scrambledword = shuffelWord(wordarray[r]);
            }
            if (scrambledword === wordarray[r]) {
                scrambledword = shuffelWord(wordarray[r]);
            }
            if (scrambledword === wordarray[r]) {
                scrambledword = shuffelWord(wordarray[r]);
            }
            if (scrambledword === wordarray[r]) {
                scrambledword = shuffelWord(wordarray[r]);
            }
            if (scrambledword === wordarray[r]) {
                scrambledword = shuffelWord(wordarray[r]);
            }
            if (scrambledword === wordarray[r]) {
                scrambledword = shuffelWord(wordarray[r]);
            }
            if (scrambledword === wordarray[r]) {
                scrambledword = shuffelWord(wordarray[r]);
            }
            //SCRAMBLERS

            findc.send({
                content: `${emoji.success} Someone left a tip containing **$${answer.toLocaleString('en-US')}**! Unscramble the word \`${scrambledword}\` to claim it!`
            });

            collector = findc.createMessageCollector({
                time: 60000
            })

            collector.on('collect', async (msg) => {
                if (msg.guild.id === findc.guild.id && msg.content.toLowerCase() === `${wordarray[r]}`) {
                    client.connection.query(`SELECT * FROM business WHERE userId = '${msg.author.id}';`, function (error, results, fields) {
                        if (results && results.length) {
                            collector.stop();
                            client.connection.query(`UPDATE business SET businessBalance = businessBalance + ${answer} WHERE userId = '${msg.author.id}'`)
                            return findc.send({
                                content: `**${msg.author.tag}** Has successfully unscrambled the word \`${wordarray[r]}\` and therefor claimed the tip of **$${answer.toLocaleString('en-US')}**! `
                            })
                        } else {
                            findc.send({
                                content: 'You must own a business in order to claim this, please register one with the \`.register\` command first!'
                            })
                        }
                    });
                }
            });

            collector.on('end', collected => {
                let allmsgs = collected.map(message => `${message}`).join(`, `).toLowerCase();
                if (collected.size === 0 || !allmsgs.includes(wordarray[r])) {
                    findc.send({
                        content: `😡 Seems like everyone working here is lazy, I'll just go get some Sandwiches across the street instead.`
                    })
                }
            })
        }
    });

    //LOTTERY ABOVE!

    const job2 = schedule.scheduleJob('*/15 * * * *', async () => {
        let findc = client.channels.cache.get('913444398203805696')

        if (findc) {

            function shuffelWord(word) {
                word = word.split('');

                //Remove the first and the last letter
                let first = word.shift();
                let last = word.pop();

                //Shuffle the remaining letters
                for (let i = word.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [word[i], word[j]] = [word[j], word[i]];
                }

                //Append and return
                return first + word.join("") + last;
            }


            let num = Math.floor(Math.random() * (35000 - 5000) + 5000);
            let percentage = Math.floor(Math.random() * (25 - 5) + 5);
            let answer = Math.round(num / 100) * 100;
            let tip = percentage / 100 * answer;
            let pizzas = Math.round(Math.random() * 1200 - 500) + 500;

            findc.send({
                content: `${emoji.pizza} Hello, I am feeling very hungry this fine evening. May I please order \`${pizzas}\` Pizzas? \`Type 'sell' to sell the Pizzas to them!\``
            });

            collector = findc.createMessageCollector({
                time: 60000
            })

            collector.on('collect', async (msg) => {
                if (msg.guild.id === findc.guild.id && msg.content.toLowerCase() === `sell`) {
                    client.connection.query(`SELECT * FROM business WHERE userId = '${msg.author.id}';`, function (error, results, fields) {
                        if (results && results.length) {
                            collector.stop();

                            client.connection.query(`UPDATE business SET businessBalance = businessBalance + ${answer} WHERE userId = '${msg.author.id}';
                            UPDATE business SET businessBalance = businessBalance + ${tip} WHERE userId = '${msg.author.id}';
                            UPDATE business SET businessProduced = businessProduced + ${pizzas} WHERE userId = '${msg.author.id}';`)

                            return findc.send({
                                content: `${emoji.currency} Pleasure doing business with you, **${msg.author.tag}**! I believe I owe you \`$${answer}\` and then ontop of your awesome service here is a ${percentage}% tip of \`$${tip}\` for being epic!`
                            })

                        } else {
                            findc.send({
                                content: 'You must own a business in order to claim this, please register one with the \`.register\` command first!'
                            })
                        }
                    });
                }
            });

            collector.on('end', collected => {
                let allmsgs = collected.map(message => `${message}`).join(`, `).toLowerCase();
                if (collected.size === 0 || !allmsgs.includes('sell')) {
                    findc.send({
                        content: `😡 Seems like everyone working here is lazy, I'll just go get some Sandwiches across the street instead.`
                    })
                }
            })
        }
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