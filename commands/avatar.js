const discord = require("discord.js");

module.exports.run = async (bot, ctx) => {
    const member = ctx.getMemberOrAuthor(ctx, ctx.args.join(" "));
    if (!member) {
        return ctx.channel.send("Could not find that member.");
    }
    const embed = new discord.RichEmbed()
    .setTitle(`Avatar of ${member.displayName}`)
    .setColor(member.displayHexColor)
    .setImage(member.user.displayAvatarURL);
    
    ctx.channel.send(embed);
}

module.exports.help = {
    name: "avatar",
    description:"Shows the avatar of a user.",
    usage:"avatar [member]",
    longhelp:""
}