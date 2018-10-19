const discord = require("discord.js");

module.exports.run = async (bot, ctx) => {
    const member = ctx.getMemberOrAuthor(ctx, ctx.args.join(" "));
    if(!member) {
        return ctx.channel.send("Lol something went wrong.");
    }

    if(!member.roles) {
        return ctx.channel.send("This member does not have any roles.");
    }
    let embed = new discord.RichEmbed()
    .setTitle(`Roles of ${member.displayName}`)
    .setColor(member.displayHexColor)
    .setThumbnail(member.user.displayAvatarURL)
    .addField("Roles", member.roles.map(r => r.id ? `<@&${r.id}>` : r.name));

    ctx.channel.send(embed);
} 

module.exports.help = {
    name: "roles",
    description: "Show all the roles of a member.",
    usage: "roles [member]",
    longhelp: "If no member is passed this will show your roles."
}