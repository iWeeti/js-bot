module.exports.run = async (bot, ctx) => {
    console.log("Pls");
    const player = bot.manager.join({
        guild: ctx.guild.id,
        channel: ctx.author.voiceChannel.id,
        host: bot.config.lavahost
    })
    .then(player => {
        console.log(player);
    })
    .catch(e => {
        ctx.channel.send("Could not join.\n" + e);
    });
    const track = bot.getSongs('ytsearch:' + ctx.args.join("%20"));
    if (!track) {
        ctx.channel.send("Could not find that song.")
    }
    player.play(track);
    player.once("error", error => console.error(error));
    player.once("end", data => {
        if (data.reason === "REPLACED") return;
    });
}

module.exports.help = {
    name:"join",
}