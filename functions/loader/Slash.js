const { glob } = require('glob')
const { promisify } = require('util')
const globPromise = promisify(glob)

module.exports = async (client, dir="./SlashCommands") => {
   const slashCommands = await globPromise(
    `${process.cwd()}/SlashCommands/*/*.js`
);
const SlashCMD = [];
slashCommands.map((value) => {
    const file = require(value);
    if (!file?.name) return;
    client.SlashCommands.set(file.name, file);

    if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
    SlashCMD.push(file);
});

 client.on('ready', () => {
    //  Enregistrement dans un seul serveur lors de la connextion, vous pouvez l'améliorer
  client.guilds.cache.get("GUILD_ID").commands.set(SlashCMD)
 })
}