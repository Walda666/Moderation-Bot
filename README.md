# DiscordBot Modération

## Description
Bot discord permettant une modération classique (mute, ban, kick, warn) avec des logs pour chaque actions, enregistrés dans une base de données.

<br>

## Installation & lancement

Pour installer le bot, procédez comme tel :
- Installer nodejs si ce n'est pas le cas
- Ajouter les données suivantes dans un fichier `.env`
```bash
token=
dbUser=
dbPassword=
dbDatabase=
dbHost=
```

- Entrer la comande suivante

```bash
npm install
```

Puis, pour démarrer le bot, entrer la commande suivante :
```bash
node index.js
```