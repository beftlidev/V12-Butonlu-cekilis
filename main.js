const Nuggies = require('nuggies');
Nuggies.giveaways.connect(process.env.mongoURI);
client.on('ready', () => {
    console.log(`${client.user.tag} is online.`)
    Nuggies.giveaways.startAgain(client);
});
client.on('clickButton', button => {
    Nuggies.giveaways.buttonclick(client, button);
});
