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
        let findc = client.channels.cache.get('892069654753853460')

        if (findc) {
            /*
            const filter = (msg) =>
                msg.guild.id === message.guild.id && msg.content === `.claimdrop`;
            message.reply({
                embeds: [new MessageEmbed().setColor(ee.color).setDescription("The drop has started in " + channel.toString())]
            });
            findc.send({
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
                    findc.send({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setDescription(`Customer left due to waiting too long.`)
                        ]
                    })
                }
            })
            return;
            */

            /*
            let wordarray = ["pog", "poggers", "epic", "gamer", "awesome"];
            let r = Math.floor(Math.random() * wordarray.length);
            console.log(wordarray[r])

            function scramble(wordarray) {
                let word = wordarray[r].split("")
                n = word.length

                for (var i = n - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var tmp = word[i];
                    word[i] = word[j]
                    word[j] = tmp;
                }
                return word.join("")
            }
            scrambledword = scramble(wordarray[r])

            const embed = new Discord.MessageEmbed()
                .setTitle('Scramble time!')
                .setColor("RANDOM")
                .setDescription("The word is: " + scrambledword)
                .setFooter('You have 30 seconds to try and guess it, the first person to answer correctly ')
            findc.send({
                embeds: [embed]
            });

            const filter = m => m.content.toLowercase().includes(wordarray[r]);
            const collector = findc.createMessageCollector(filter, {
                time: 30000
            });

            collector.on('collect', m => {
                console.log(`Collected ${m.content}`);
            });

            collector.on('end', collected => {
                findc.send(`${collected.first().author} got the correct answer first! The answer was ${wordarray[r]}`);
                console.log(`Collected ${collected.size} items`);
            });
            */
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

                //WORKS
                //if (allmsgs.includes(wordarray[r])) {
                //    findc.send({
                //        content: `Has successfully unscrambled the word \`${wordarray[r]}\` and therefor claimed the tip of **$10,000**! `
                //    })
                //}
            })

            //console.log(test);
        }
    });

    //LOTTERY ABOVE!

    const job2 = schedule.scheduleJob('*/15 * * * *', async () => {
        let findc = client.channels.cache.get('892069654753853460')

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

                //WORKS
                //if (allmsgs.includes(wordarray[r])) {
                //    findc.send({
                //        content: `Has successfully unscrambled the word \`${wordarray[r]}\` and therefor claimed the tip of **$10,000**! `
                //    })
                //}
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