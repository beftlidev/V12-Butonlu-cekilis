const Discord = require('discord.js');
const data = require('croxydb')
const Nuggies = require('nuggies');

module.exports.run = async (client, message, args) => {

  let açıkmı = await data.fetch(`pre_${message.author.id}`)
  if(açıkmı) {

    if (!args[0]) return message.reply('Lütfen sonuna kadar çekilişin kimliği sağlayın!', { allowedMentions: { repliedUser: false } });
    try {
        const data = await Nuggies.giveaways.getByMessageID(args[0]);
		const msg = await client.guilds.cache.get(data.guildID).channels.cache.get(data.channelID).messages.fetch(args[0]);
		await Nuggies.giveaways.end(msg, data, msg);
    }
    catch (err) {
        console.log(err);
        return message.channel.send('Çekiliş bulunamıyor! ');
    }
} else { return message.channel.send(new Discord.MessageEmbed()
 .setDescription(`Bu komut premiumlulara özel!
Premium almak için [Destek sunucumuzu](https://discord.gg/KZfAEjrPUF) ziyaret et!`)
.setTimestamp()
)
} 
}

exports.help = {
    name: 'pre-çekiliş-bitir' 
}
