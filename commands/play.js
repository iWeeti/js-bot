const discord = require("discord.js");
const snekfetch = require("snekfetch");

module.exports.run = async (bot, ctx) => {
    console.log(`http://${bot.config.lavahost}:${bot.config.restport}/loadtracks?identfier=${ctx.args.join("%20")}`);
    bot.getSongs(bot, `ytsearch:${ctx.args.join("%20")}`).then(songs => {
        console.log(songs);
        ctx.channel.send(songs.toString());
    });
    console.log(`http://${bot.config.lavahost}:${bot.config.restport}/loadtracks?identfier=${ctx.args.join("%20")}`);
}

module.exports.help = {
    name:"play",
    description:"Plays a song.",
    usage:"play <song>",
    longhelp:"You can search from youtube and soundcloud."
}