const { Client, Message, Collection } = require('discord.js');
const { token } = require("./functions/settings/config/config.js")

const client = new Client({
 partials: ['CHANNEL','GUILD_MEMBER','MESSAGE','REACTION','USER'],
 intents: 32767,
 allowedMentions: {
  parse: ["everyone", "roles", "users"],
  repliedUser: false,
}
})

client.commands = new Collection()
client.cooldowns = new Collection()
client.SlashCommands = new Collection()
const { Loader } = require('./functions/functions');
require('./functions/loader/Slash')(client)


Loader(client)
const { content } = require('./functions/settings/content')
client.perso = content(client);

client.login(token);
// client.guilds.cache.get("").commands.set()