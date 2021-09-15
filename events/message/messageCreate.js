const { MessageEmbed } = require('discord.js');
const functions = require('../../functions/functions')
const { defaultS } = require('../../functions/settings/config/bot')
module.exports = (client, message) => {
 // Questions
 if(message.author.bot) return;
 if(!message.content.startsWith(defaultS.defaultPrefix)) return;
 
 // Définition
  const args = message.content.slice(defaultS.defaultPrefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.info.aliases && cmd.info.aliases.includes(commandName))
  const embedErr = new MessageEmbed()
  .setAuthor(`${client.user.username}`, `https://cdn.discordapp.com/emojis/886627659981922326.png`)
  .setColor(client.perso.color.red)
  .setDescription(`La commandes **${commandName}** n'existe pas. Essaye la commandes **${defaultS.defaultPrefix}**help pour voir toutes les commandes.`)
  .setFooter(`${client.user.username} V-1.0`)
  if(!command) return message.reply({ embeds: [embedErr] })

  if(functions.onCoolDown(message, client, command)) return;
 // Lancement
 command.run(client, message, args)
}