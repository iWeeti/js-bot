const discord = require("discord.js");
const Coin = require("../models/coin.js");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/js-bot", {
    useNewUrlParser: true
});

module.exports.run = async (bot, ctx) => {
    const member = ctx.getMemberOrAuthor(ctx, ctx.args.join(" "));
    if (!member) {
        return ctx.channel.send("lol");
    }

    Coin.findOne({
        userID: member.id,
        guildID: ctx.guild.id
    }, (err, coins) => {
        if(err) console.log(err);
        let embed = new discord.RichEmbed()
        .setColor(member.displayHexColor)
        .setThumbnail(member.user.displayAvatarURL)
        .setTitle(`Coins of ${member.displayName}`)
        .setDescription(coins.coins || 0);
        ctx.channel.send(embed);
    });
}

module.exports.help = {
    name:"coins",
    description:"Tells how much coins you or a member you specify have.",
    usage:"coins [member]",
    longhelp:""
}