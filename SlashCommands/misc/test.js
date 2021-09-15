const { MessageEmbed } = require('discord.js')
const { readdirSync } = require('fs')
const CategoryList = readdirSync("./commands")


module.exports = {
 name: "test",
 description: "Une commandes qui vous aides a voir et mieux comprendre mes commandes.",
 run: async (client, interaction) => {
  interaction.channel.send("Je fonctionne")
 }
}