const { MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require('discord.js');
const syncSql = require("sync-sql")
const config = require("../config.json")
module.exports = {
    // GLOBAL

    filter: () => true,

    configSql: {

        host: process.env.dbHost,
        user: process.env.dbUser,
        password: process.env.dbPassword,
        database : process.env.dbDatabase
      },

      emb: function(author, titre, desc, couleur) {
        const embed = new MessageEmbed()
            .setAuthor({ name: author.username,  iconURL: author.displayAvatarURL() })
            .setTitle(titre)
            .setColor(couleur)
            if(desc) embed.setDescription(desc)
            // add commande dans le footer ?
            return embed
    },

    tempsMessage: async function(channel, texte, temps) {
        let msg = await channel.send(texte)
        setTimeout(() => {
            msg.delete()
        }, temps);
    },

    query: function(query) {
         console.log(query)
        return syncSql.mysql(this.configSql, query).data.rows
    },

    sleep: async function(ms) {
        await new Promise(resolve => setTimeout(resolve, ms));
    },

    pagin: function(interaction, pages, message) {
        message.react("⬅️")
        message.react("➡️")
        const filter = (reaction, user) => user.id == interaction.user.id
        let compteur = 0
        const collector = message.createReactionCollector({filter: filter});
        collector.on('collect', (reaction, user) => {
            if(reaction.emoji.name === "➡️") {
                message.reactions.resolve("➡️").users.remove(user)
                if(compteur == pages.length-1) {
                    message.edit(pages[0])
                    compteur = 0
                } else {
                    message.edit(pages[compteur+1])
                    compteur++
                }
            }
            if(reaction.emoji.name === "⬅️") {
                message.reactions.resolve("⬅️").users.remove(user)
                if(compteur == 0) {
                    message.edit(pages[pages.length-1])
                    compteur = pages.length -1
                } else {
                    message.edit(pages[compteur-1])
                    compteur--
                }
            }
        });
        setTimeout(() => {
            collector.stop()
        }, 50000);
    },

    client: null,

    name: "fonctions",
}
