const Discord = require('discord.js');
const request = require('request');
const client = new Discord.Client();
const prefix = '>';
const token = '';
const roleid = '';
const appid = '17390'; //This is spore's appid
client.once('ready', () => { console.log('ready!') });
client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const input = message.content.slice(prefix.length).trim();
    if (!input.length) return;
    const [, command, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);
    console.log(commandArgs)
    if (command === "verifyme") {
        if (!commandArgs.split(' ')[0]) return message.channel.send("Provide your steam64 ID!");
        else request(`https://decapi.me/steam/hours?id=${commandArgs.split(' ')[0]}&appid=${appid}`, function (error, response, body) {
            message.channel.send(`Alright, you have ${body}.`);
            if (parseFloat(body.split(" ")[0]) > 40) {
                message.member.roles.add(message.guild.roles.cache.get(roleid));
                message.channel.send("You have been verified.");
            } else {
                message.channel.send("That's not enough!")
            }
        })
    }
});
client.login(token);
