const fx = require("../fonctions/fonctions")
const discord = require('discord.js');
const config = require("../config.json")

exports.run = async (client, interaction) => {

let raison = null
let temps = null
interaction.options._hoistedOptions.forEach(elt => {
    if(elt.name == "raison") raison = elt.value
    if(elt.name == "temps") temps = elt.value
});
if(!raison) raison = "Non précisée"
let textTemps = temps ? `${temps} jours` : "∞"

let utilisateur = interaction.options._hoistedOptions[0].user
let membre = await interaction.channel.guild.members.fetch(utilisateur.id)
membre.ban()
fx.query(`INSERT INTO logs(discord, pseudo, discordid, sanction, moderateur, moderateurid, raison) VALUES("Lyneris", '${utilisateur.username}', '${utilisateur.id}', 'ban', '${interaction.user.username}', '${interaction.user.id}', '${raison}')`)
let chan = client.channels.cache.get(config.channelLogs)
chan.send({embeds: [fx.emb(interaction.user, "Ban", `${utilisateur.username} a été ban ${textTemps} par ${interaction.user.username} pour la raison : ${raison}`)]})

if(temps) {
    setTimeout(() => {
        interaction.channel.guild.members.unban(utilisateur.id)
    }, temps * 24 * 3600 * 1000);
}

}

exports.help = {
    name: "ban",
}