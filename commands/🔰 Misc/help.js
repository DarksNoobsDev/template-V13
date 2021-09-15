const { MessageEmbed } = require('discord.js')
const { readdirSync } = require('fs')
const CategoryList = readdirSync("./commands")

module.exports.run = (client, message, args) => {
 if(!args.length) {
  const Embed = new MessageEmbed()
  .setColor(client.perso.color.yellow)
  .setTitle(`🔰 ${client.user.username} | Help`)
  .setDescription(`\`\`\`Affiche toute une liste de commandes avec leurs catégories.\`\`\``)
  .setFooter(`Syntax <> = non optinnel et [] = requis.`, message.author.avatarURL({ dynamic: true }))
  .setThumbnail(client.user.avatarURL({ dynamic: true }))
  for(const category of CategoryList) {
    const FilteredCmd = client.commands.filter(cat => cat.info.category === category).map(cmd => cmd.info.name).join(',  ')
    const FilteredCmdNumber = client.commands.filter(cat => cat.info.category === category).size;
   Embed.addField(
    `**${category}** [${FilteredCmdNumber}]`,
    `> \`\`\`${FilteredCmd}\`\`\``
   )
  }
  message.channel.send({ embeds: [Embed] })

 } else {
   const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.info.aliases && cmd.info.aliases.includes(args[0]));
   if(!command) return message.channel.send(`La commande en question : ${args[0]} n'existe pas. \nSi vous voulez donner des suggections, regarder ma bio, et contactez mon owner.`)
   const Embed = new MessageEmbed()
   .setTitle(`**${command.info.name.toLocaleUpperCase()}** ${command.info.status}`)
   .setDescription(`**__Description :__** ${command.info.description || "Aucune description trouvé pour cette commande !"}\n`)
   Embed.addField(`**__Catégories :__**`, `\`\`\`${command.info.category}\`\`\``, true)
   .setColor(client.perso.color.orange)
   .setFooter(`Syntax <> = non optinnel et [] = requis.`, message.author.avatarURL({ dynamic: true }))
   .setAuthor(`${client.user.username}`, `${client.user.avatarURL({ dynamic: true })}`)
   .setThumbnail(client.user.avatarURL({ size: 2048 }))
   .setTimestamp()
   if(command.info.aliases.length > 0) {
     Embed.addField(`**__Aliases :__**`, `\`\`\`${command.info.aliases.join(", ")}\`\`\``, true)
   }
   Embed.addField(`**__Cooldown :__**`, `\`\`\`${command.info.cooldown || require('../../functions/settings/config/bot').defaultS.defaultCooldown} seconde(s)\`\`\``, true)
     Embed.addField(`**__Permissions :__**`, `\`\`\`${command.info.permissions.join(", ") || "Non requis"}\`\`\``, true)
   
   if(command.info.usage) {
     Embed.addField(`**__Utilisations :__**`, `\`\`\`m!${command.info.name.toLocaleUpperCase()} ${command.info.usage}\`\`\``, true)
   }    
   message.channel.send({ content: `Une information détaillé de la commande.`, embeds: [Embed] })
 }
}

module.exports.info = {
 name: "help",
 aliases: ["help", "aide"],
 usage: "<COMMAND_NAME>",
 description: "Une commandes qui vous aides a voir et mieux comprendre mes commandes.",
 permissions: ["SEND_MESSAGES"],
 category: "🔰 Misc",
 status: "🟢",
 cooldown: 2.5
}