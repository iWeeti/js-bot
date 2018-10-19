module.exports.run = async (bot, ctx) =>{
    start = Date.now()
    ctx.channel.send("Pong.").then(msg => {
        msg.edit(`Pong, the message roundtrip took ${(Date.now() - start)}ms and the discord api ping is ${Math.round(bot.ping)}ms.`);
    });
    
}

module.exports.help = {
    name:"ping",
    description:"Tells the message roundtrip and the discord API ping.",
    usage:"ping",
    longhelp:""
}