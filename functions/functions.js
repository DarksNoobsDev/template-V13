const { readdirSync } = require('fs')
const { Collection, MessageEmbed } = require('discord.js')
const { defaultS: defaultSett} = require('./settings/config/bot')
const Loader = (client, dir="./commands/", EvtDir="./events/") => {
const commands = (client, dir) => {
  readdirSync(dir).forEach(dirs => {
   const commandFile = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
   for (const commands of commandFile) {
    const File = require(`../${dir}/${dirs}/${commands}`);
    const FileName = File.info.name;
    client.commands.set(FileName, File)
    console.log(`Commandes chargé --> ${FileName}`);
   }
  });
 }


 const events = (client, dir) => {
  readdirSync(dir).forEach(dirs => {
   const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
   for (const event of events) {
       const evt = require(`../${dir}/${dirs}/${event}`);
       const evtName = event.split('.')[0];
       client.on(evtName, evt.bind(null, client))
       console.log(`Events Chargé --> ${evtName}`);
  }
})
 }
 commands(client, dir)
 events(client, EvtDir)
}


function onCoolDown(message, client, command) {
  if(!client.cooldowns.has(command.info.name)){
    client.cooldowns.set(command.info.name, new Collection())
  }
  const timeNow = Date.now();
  const tStamps = client.cooldowns.get(command.info.name)
  const cdAmount = (command.info.cooldown || defaultSett.defaultCooldown) * 1000
  
  if(tStamps.has(message.author.id)) {
    const cdExpiritionTime = tStamps.get(message.author.id) + cdAmount;
   if(timeNow < cdExpiritionTime) {
      const TimeLeft = (cdExpiritionTime - timeNow) / 1000;
      const Embed = new MessageEmbed()
      .setDescription(`La commandes **${command.info.name}** a un cooldown de **${command.info.cooldown || defaultSett.defaultCooldown}** seconde(s)\nTu dois encore attendre **${TimeLeft.toFixed(0)}** seconde(s) avant de réutiliser la commandes.`)
      .setAuthor(`${client.user.username}`, `https://cdn.discordapp.com/emojis/886627659981922326.png`)
      .setColor(client.perso.color.red)
      .setFooter(`${client.user.username} Version 1.0`)
      return message.channel.send({ embeds: [Embed] });
   } else {
    tStamps.set(message.author.id, timeNow);
    setTimeout(() => tStamps.delete(message.author.id), cdAmount)
    }
  } else {
    tStamps.set(message.author.id, timeNow);
  setTimeout(() => tStamps.delete(message.author.id), cdAmount)
  }
 }
module.exports = {
 Loader,
 onCoolDown
}