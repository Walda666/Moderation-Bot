const fx = require("../fonctions/fonctions")
const discord = require('discord.js');
const config = require("../config.json")

exports.run = async (client, interaction) => {

let raison = null
interaction.options._hoistedOptions.forEach(elt => {
    if(elt.name == "raison") raison = elt.value
});
if(!raison) raison = "Non précisée"

let utilisateur = interaction.options._hoistedOptions[0].user
let membre = await interaction.channel.guild.members.fetch(utilisateur.id)
fx.query(`INSERT INTO logs(discord, pseudo, discordid, sanction, moderateur, moderateurid, raison) VALUES("Lyneris", '${utilisateur.username}', '${utilisateur.id}', 'warn', '${interaction.user.username}', '${interaction.user.id}', '${raison}')`)
let chan = client.channels.cache.get(config.channelLogs)
chan.send({embeds: [fx.emb(interaction.user, "Warn", `${utilisateur.username} a été warn par ${interaction.user.username} pour la raison : ${raison}`)]})

}

exports.help = {
    name: "warn",
}