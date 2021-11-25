//           --------------------<CONSTRUCTORS>--------------------

const {
    Client,
    Collection,
    Intents,
    WebhookClient
} = require("discord.js");
const mongodb = require("mongodb");
const {
    readdirSync
} = require("fs");
//TOP.GG CONSTRUCTORS!
const {
    AutoPoster
} = require('topgg-autoposter');
const Topgg = require("@top-gg/sdk");
const express = require("express");
const mysql = require('mysql2');
const config = require("./botconfig/config.json");
const schedule = require("node-schedule");
const {
    GiveawaysManager
} = require('discord-giveaways');

//           --------------------<CONSTRUCTORS>--------------------


//           --------------------<CONSTRUCTING CLIENT>--------------------
const client = new Client({
    allowedMentions: {
        parse: ["users", "roles"], // "everyone", "roles", "users"
        repliedUser: true,
    },

    intents: [
        Intents.FLAGS.GUILDS,
        //Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        //Intents.FLAGS.GUILD_BANS,
        //Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        //Intents.FLAGS.GUILD_INTEGRATIONS,
        //Intents.FLAGS.GUILD_WEBHOOKS,
        //Intents.FLAGS.GUILD_INVITES,
        //Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        //Intents.FLAGS.GUILD_MESSAGE_TYPING,
        //Intents.FLAGS.DIRECT_MESSAGES,
        //Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        //Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
});
//           --------------------<CONSTRUCTING CLIENT>--------------------


//           --------------------<MODULE EXPORTS>--------------------

module.exports = client;

//           --------------------<MODULE EXPORTS>--------------------


//           --------------------<GLOBAL VARIABLES CONSTRUCTION>--------------------
client.commands = new Collection();
client.slashCommands = new Collection();
client.cooldowns = new Collection();
client.categories = readdirSync("./commands/");
client.config = require("./botconfig/config.json");
//           --------------------<GLOBAL VARIABLES CONSTRUCTION>--------------------


//           --------------------<REQUIRES>--------------------
require("./handler/anticrash")(client)
// Initializing the project
require("./handler")(client);
//require("./database/db")
//           --------------------<REQUIRES>--------------------

//           --------------------<ESTABLISHING MYSQL CONNECTION>--------------------

const con = mysql.createConnection({
    host: config.Database.DB_HOST,
    user: config.Database.DB_USER,
    password: config.Database.DB_PASS,
    database: config.Database.DB_DATABASE,
    multipleStatements: true,
    supportBigNumbers: true,
});

con.connect(err => {
    if (err) throw err;
    console.log("Successfully connected to the MySQL Database as Customer!")
    //con.query("SHOW TABLES", console.log)
});

client.connection = con;

//           --------------------<MYSQL CONNECTION ESTABLISHED>--------------------


//           --------------------<GIVEAWAY MANAGER CREATION>--------------------

const manager = new GiveawaysManager(client, {
    storage: './giveaways.json',
    default: {
        botsCanWin: false,
        embedColor: '#66ed81',
        embedColorEnd: '#e6cb20',
        reaction: '💰'
    }
});

client.giveawaysManager = manager;

//           --------------------<GIVEAWAY MANAGER CREATED>--------------------


//           --------------------<POST TOP.GG VOTES!>--------------------

const api = new Topgg.Api(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4NzMwMzE2MDc0NzEzMDkxMCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjMyNTAwMjYxfQ.nTzjyIEnlp_mTouNPXX_PtLLjV8qw5qQib8rA9gHW2w`)

//           --------------------<POST TOP.GG VOTES!>--------------------


//           --------------------<STARTER>--------------------

client.login(client.config.token);

//           --------------------<STARTER>--------------------