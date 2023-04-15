const { MessageEmbed } = require('discord.js');
const fx = require("../fonctions/fonctions")
const config = require("../config.json")

module.exports = async (client, interaction) => {
    const filter = () => true

    if(interaction.isButton()){
        //interaction.deferUpdate()
        if(interaction.customId == "reclam") {
        let personne = interaction.user
        let chan = await interaction.channel.guild.channels.create(`ticket-${interaction.user.username}`, {
            type: "text",
            parent: config.categorieReclam,
            permissionOverwrites: [
            ],
          })
         //await chan.setParent(config.categorieReclam)
          await chan.permissionOverwrites.edit(interaction.channel.guild.roles.everyone, { VIEW_CHANNEL: false });
          await chan.permissionOverwrites.edit(personne, { VIEW_CHANNEL: true });
          let rolemod = interaction.channel.guild.roles.cache.get(config.roleModo)
          await chan.permissionOverwrites.edit(rolemod, { VIEW_CHANNEL: true });
          await interaction.reply({ content: `<#${chan.id}> pour y accéder`, ephemeral: true })
        }
        
    } else if (interaction.isCommand()) {
        const commandName = interaction.commandName;
        
        let mod = interaction.guild.roles.cache.get('837805683827146762').members.map(m=>m.user.id);
        let admin = interaction.guild.roles.cache.get('837805342695358485').members.map(m=>m.user.id);
        let resp = interaction.guild.roles.cache.get('837822527244992512').members.map(m=>m.user.id);
        let staff = interaction.guild.roles.cache.get('837822848360906753').members.map(m=>m.user.id);

        if(!mod.includes(interaction.user.id) && !admin.includes(interaction.user.id) && !resp.includes(interaction.user.id) && !staff.includes(interaction.user.id)) {
            return interaction.reply({content: "Vous n'avez pas la permission d'effectuer cette commande", ephemeral: true})
        } else {
            const command = client.commands.get(commandName);

            if (!command) return;
            
            command.run(client, interaction);
        }
    } else if (interaction.isMessageComponent()) {
        
    }
    
}