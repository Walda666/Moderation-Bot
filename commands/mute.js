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
let textTemps = temps ? `${temps} heures` : "∞"

let utilisateur = interaction.options._hoistedOptions[0].user
let membre = await interaction.channel.guild.members.fetch(utilisateur.id)
rolemute = interaction.channel.guild.roles.cache.get(config.roleMute)
membre.roles.add(rolemute)
fx.query(`INSERT INTO logs(discord, pseudo, discordid, sanction, moderateur, moderateurid, raison) VALUES("Lyneris", '${utilisateur.username}', '${utilisateur.id}', 'mute', '${interaction.user.username}', '${interaction.user.id}', '${raison}')`)
let chan = client.channels.cache.get(config.channelLogs)
chan.send({embeds: [fx.emb(interaction.user, "Mute", `${utilisateur.username} a été mute ${textTemps} par ${interaction.user.username} pour la raison : ${raison}`)]})

if(temps) {
    setTimeout(() => {
        membre.roles.remove(rolemute)
    }, temps * 24 * 3600 * 1000);
}

}

exports.help = {
    name: "ban",
}