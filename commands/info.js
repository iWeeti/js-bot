const discord = require("discord.js");

module.exports.run = async (bot, ctx) => {
    const member = ctx.getMemberOrAuthor(ctx, ctx.args.join(" "));
    if(!member) {
        return ctx.channel.send("Something went wrong.");
    }
    let embed = new discord.RichEmbed()
    .setThumbnail(member.user.displayAvatarURL)
    .setColor(member.displayHexColor)
    .setFooter("User created at")
    .setTimestamp(member.user.createdTimestamp);

    if (member.roles) {
        embed.addField("Roles", member.roles.map(r => r.id ? `<@&${r.id}>` : r.name));
    }

    if (member.voiceChannel) {
        let voiceChannel = member.voiceChannel;
        embed.addField("Voice", `Currently at ${voiceChannel.name} with ${voiceChannel.members.size - 1} others.`);
    }

    if (member.nickname) {
        embed.setTitle(`Info of ${member.user.username} a.k.a (${member.nickname})`);
    } else {
        embed.setTitle(`Info of ${member.displayName}`);
    }

    ctx.channel.send(embed);
}

module.exports.help = {
    name: "info",
    description:"Tells info about a member.",
    usage:"info <member>",
    longhelp:"If you do not specify a member this will tell your info."
}