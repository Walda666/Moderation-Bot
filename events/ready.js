const fx = require("../fonctions/fonctions")
module.exports = client => {
  client.user.setPresence({ activities: [{ name: 'Modère un max', type: 'PLAYING' }], status: 'online' });
  fx.client = client

    console.log('Good !');

}