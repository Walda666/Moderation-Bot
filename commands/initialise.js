const fx = require("../fonctions/fonctions")
const {MessageButton, MessageEmbed, MessageActionRow} = require('discord.js');
const config = require("../config.json")

exports.run = async (client, interaction) => {

    let chan = client.channels.cache.get(config.channelTickets)
    let rolemute = interaction.channel.guild.roles.cache.get(config.roleMute)

    // rôle mute empêche de parler partout

    interaction.channel.guild.channels.cache.forEach(chan => {
        chan.permissionOverwrites.edit(rolemute, { SEND_MESSAGES: false });
    });

    // crée bouton
    const button = new MessageButton()
	.setCustomId('reclam')
	.setLabel('📩 Faire un ticket')
	.setStyle('PRIMARY')

    let embedopen = new MessageEmbed()
	.setDescription(`Cliquez sur le bouton pour faire un ticket.`)
	.setTitle("Ticket")
	.setColor("AQUA")

    const row = new MessageActionRow()
			.addComponents(button)

            chan.send({embeds: [embedopen], components: [row]})


}

exports.help = {
    name: "initialise",
}
