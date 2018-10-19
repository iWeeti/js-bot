const mongoose = require("mongoose");
const Coin = require("../models/coin.js");
const discord = require("discord.js");
mongoose.connect("mongodb://localhost:27017/js-bot", {
    useNewUrlParser: true
});

function addCoins(ctx, amount) {
    Coin.findOne({
        userID:ctx.author.id,
        guildID:ctx.guild.id
    }, (err, coins) => {
        if(err) console.log(err);
        if(!coins) {
            let coins = new Coin({
                coins: 0,
                userID: ctx.author.id,
                guildID: ctx.guild.id
            });
        }
        coins.coins += amount;
        coins.save().catch(err => console.log(err));
        ctx.channel.send(`You went to work and got ${amount} coins, you have now ${coins.coins}.`);
    });
}

module.exports.run = async (bot, ctx) => {
    const add = Math.ceil(Math.random() * 100);
    console.log(bot.cooldowns);
    if (!bot.cooldowns.get(ctx.author.id)) {
        bot.cooldowns.set(ctx.author.id, new Date());
        addCoins(ctx, add);
    } else {
        if(new Date - bot.cooldowns.get(ctx.author.id) < 30 * 1000) {
            let total = (new Date() - bot.cooldowns.get(ctx.author.id)) / 1000;
            let hours = Math.round(total / 3600) ? `${Math.round(total / 3600)} hours` : '';
            total %= 3600;
            let minutes = Math.round(total / 60) ? `${Math.round(total / 60)} minutes` : '';
            total %= 60;
            let seconds = Math.round(total % 60);
            let embed = new discord.RichEmbed()
            .setTitle("You are ratelimited.")
            .setFooter(`Try again in ${hours} ${minutes} ${seconds} seconds.`);
            ctx.channel.send(embed);
        } else {
            bot.cooldowns.set(ctx.author.id, new Date());
            addCoins(ctx, add);
        }
    }
}

module.exports.help = {
    name:"work",
    description: 'Go to work to gain coins.',
    usage:"work",
    longhelp:""
}