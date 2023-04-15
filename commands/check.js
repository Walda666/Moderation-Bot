const fx = require("../fonctions/fonctions")
const discord = require('discord.js');
const config = require("../config.json")

exports.run = async (client, interaction) => {

let utilisateur = interaction.options._hoistedOptions[0].user
let desc = ""
try {
    let membre = await interaction.channel.guild.members.fetch(utilisateur.id)
    let dateCrea = membre.user.createdAt.toString()
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let today  = new Date(dateCrea);
    let date = today.toLocaleDateString("fr-FR", options);
    desc += `Compte crée le ${date}\n\n`
} catch (error) {

}


let casier = fx.query(`SELECT * FROM logs WHERE discord = 'Lyneris' AND discordid = '${utilisateur.id}' ORDER BY id DESC`)
if(!casier.length) desc += "Aucune sanction"

casier.forEach(async (log) => {
    let modo = await client.users.fetch(log.moderateurid)
    let modonom = modo ? modo.username : log.moderateur
    desc += `**·** ${log.sanction} par ${modonom} pour raison ${log.raison}\n`
});
log = casier[0]
let gars = await client.users.fetch(log.discordid)
let garsnom = gars ? gars.username : log.pseudo

let emb = fx.emb(interaction.user, `Casier ${garsnom}`, desc, "WHITE")
interaction.reply({embeds: [emb]})

}

exports.help = {
    name: "check",
}
