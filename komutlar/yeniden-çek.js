const Nuggies = require('nuggies');
const  { MessageButton } = require('discord-buttons');
module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.reply('Lütfen bir mesaj kimliği verin!', { allowedMentions: { repliedUser: false } });
    let win;
    try {
        win = await Nuggies.giveaways.reroll(client, args[0]);
    }
    catch (err) {
        console.log(err);
        return message.channel.send('Çekiliş bulunamıyor!');
    }
    if (!win[0]) return message.channel.send('There are not enough people in the giveaway!');
    message.channel.send(`Yeniden çekildi! <@${win}> hediyenin yeni kazananı! `, { component: new MessageButton().setLabel('Giveaway').setURL(`https://discord.com/channels/${message.guild.id}/${message.channel.id}/${args[0]}`).setStyle('url') });
}

exports.help = {
    name: 'pre-çekiliş-yeniden-çek'
}
