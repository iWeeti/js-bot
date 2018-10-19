const discord = require("discord.js");

module.exports.run = async (bot, ctx) => {
    let command = ctx.args[0];
    if(command) {
        command = bot.commands.get(command);
        let embed = new discord.RichEmbed()
        .setTitle(command.help.usage)
        .setDescription(command.help.description + "\n" + command.help.longhelp)
        .setColor(ctx.author.displayHexColor);
        return ctx.channel.send(embed)
    }
    let embed = new discord.RichEmbed()
    .setTitle("Help menu")
    .setColor(ctx.author.displayHexColor)
    .setDescription(`Use \`${ctx.prefix}help <command>\` to retrieve more specific information.`);
    bot.commands.forEach(command => {
        embed.addField(`${command.help.name}`, command.help.description);
    });
    ctx.channel.send(embed);
}

module.exports.help = {
    name:"help",
    help:"Shows this message.",
    usage:"help [command]",
    longhelp:""
}