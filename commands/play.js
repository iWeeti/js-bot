const discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (bot, ctx) => {
    ctx.channel.send("wait");
    const string = ctx.args.join(" ");
    let res = await fetch(`http://${bot.config.lavahost}:${bot.config.restport}/loadtracks?identifier=ytsearch:${string.replace(" ", "%20")}`,{
    headers: {'Authorization': bot.config.restnode.password}
    });
    let song = await res.json();
    if (!song) throw  "No tracks found";
    console.log(song[0]);
    bot.manager.join({
        guild: ctx.guild.id, // Guild id
        channel: ctx.author.voiceChannel.id, // Channel id
        host: "eu"
    }).then(player => {
        player.play(song[0]); // Track is a base64 string we get from Lavalink REST API
     
        player.once("error", error => console.error(error));
        player.once("end", data => {
            if (data.reason === "REPLACED") return; // Ignore REPLACED reason to prevent skip loops
            // Play next song
        });
    });
}

module.exports.help = {
    name:"play",
    description:"Plays a song.",
    usage:"play <song>",
    longhelp:"You can search from youtube and soundcloud."
}