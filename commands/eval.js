module.exports.run = async (bot, ctx) => {
    if (ctx.author.id === "464910064965386283") {
        try {
        ctx.channel.send("```js\n" + eval(ctx.args.join(" ")) + "\n```");
        } catch (err) {
            ctx.channel.send(err.toString());
        }
    } else  {
        ctx.channel.send("You do not have permissions to use this command.");
    }
}

module.exports.help = {
    name:"eval",
    description: "Evaluates code",
    usage:"eval <text>",
    longhelp:""
}