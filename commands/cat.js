const request = require("request");
const discord = require("discord.js");

module.exports.run = async (bot, ctx) => {
    request("http://aws.random.cat/meow", (err, res, body) => {
        if(err){
            ctx.channel.send(err);
        }
        body = JSON.parse(body);
        let embed = new discord.RichEmbed()
        .setTitle("Here's a cat for you. :cat:")
        .setImage(body.file)
        .setColor(ctx.author.displayHexColor);
        ctx.channel.send(embed);
    });
}

module.exports.help = {
    name:"cat",
    description:"Shows a cat image.",
    usage:"cat",
    longhelp:""
}