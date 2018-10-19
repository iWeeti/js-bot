const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
const MongoClient = require("mongodb");
const db = require("./mongo.js");
const ex = require("./example.js");

bot.commands = new Discord.Collection();
bot.cooldowns = new Discord.Collection();
bot.prefixes = new Map();
bot.settings = new Map();
bot.blacklist = new Map();

class Context {
    constructor(message) {
        this.message = message;
        this.invoke_content = this.message.content.toLowerCase();
        this.messageArray = this.message.content.split(/\s+/g);
        this.command = this.messageArray[0];
        this.args = this.messageArray.slice(1);
        this.author = message.member;
        this.channel = this.message.channel;
        this.guild = this.message.guild;
        this.db = db;
    }

    tick(boolean) {
        if (boolean) {
            return "<:greentick:491575309045465089>";
        } else {
            return "<:redtick:491575308944932866>";
        }
    }

    getMember(ctx, name) {
        if (name) {
            return ctx.message.mentions.members.first() ||
                ctx.guild.members.get(name) ||
                ctx.guild.members.find(member => member.displayName === name) ||
                ctx.guild.members.find(member => member.displayName.toLowerCase() === name.toLowerCase());
        } else {
            return ctx.message.mentions.members.first();
        }
    }
    getMemberOrAuthor(ctx, name) {
        if (name) {
            return ctx.message.mentions.members.first() ||
                ctx.guild.members.get(name) ||
                ctx.guild.members.find(member => member.displayName === name) ||
                ctx.guild.members.find(member => member.displayName.toLowerCase() === name.toLowerCase()) ||
                ctx.author;
        } else {
            return ctx.message.mentions.members.first() ||
                ctx.author;
        }
    }
}

fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() == "js");
    if (jsfiles.length <= 0) {
        console.log("No commands to load.");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands.`);

    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        bot.commands.set(props.help.name, props);
        console.log(`Loaded ${f}`);
    });
});

bot.on('ready', async () => {
    try {
        await db.start();
    } catch(e) {
        console.error(e)
        process.exit(1)
    }
    await db.blacklist.find({}).forEach(doc => {
        obj = {
            userID: doc._id,
            reason: doc.reason
        }
        bot.blacklist.set(doc._id, obj);
    });
    console.log(`Ready, logged in as ${bot.user.tag}`);
});

bot.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return message.channel.send("You can not use this bot in dms.");
    if (!message.member) return;
    let prefix;
    prefix = bot.prefixes.get(message.guild.id);
    if(!prefix) {
        prefix = await db.prefixes.findOne({id:message.guild.id});
        bot.prefixes.set(message.guild.id, prefix);
    }
    if (!prefix) {
        prefix = "js.";
    }
    let ctx = new Context(message);
    if (!ctx.invoke_content.startsWith(prefix)) {
        let mention = "<@488929645186514954> ";
        if (!ctx.invoke_content.startsWith(mention)) {
            mention = "<@!488929645186514954> ";
            if (!ctx.invoke_content.startsWith(mention)) {
                return;
            } else {
                ctx.message.mentions.members.delete(ctx.message.mentions.members.first());
                prefix = mention;
            }
        } else {
            ctx.message.mentions.members.delete(ctx.message.mentions.members.first());
            prefix = mention;
        }
    }
    ctx.prefix = prefix;
    // ctx.channel.send(ctx.message.mentions.members.forEach(mention => ctx.channel.send(mention)));
    let cmd = bot.commands.get(ctx.message.content.slice(prefix.length));
    ctx.cmd = cmd;
    if (!cmd) return;
    if (!ctx.author.id === config.ownerID) {
        const blacklisted = bot.blacklist.get(ctx.author.id);
        if (blacklisted) {
            let embed = Discord.RichEmbed()
                .setTitle("You have been blacklisted.")
                .setDescrption(blacklisted.reason)
                .setColor(0xf44242);
            return ctx.channel.send(embed);
        }
        if (cmd.help.nsfw && !ctx.channel.nsfw) {
            let embed = new Discord.RichEmbed()
                .setTitle("This command can only be use in nsfw channels.")
                .setColor(0xf44242);
            return ctx.channel.send(embed);
        }
        try {
            cmd.run(bot, ctx);
        } catch (e) {
            console.error(e);
        }
    } else {
        try {
            cmd.run(bot, ctx);
        } catch (e) {
            console.error(e);
        }
    }
});

bot.login(config.token);