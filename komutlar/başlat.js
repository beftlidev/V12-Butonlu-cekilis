const Nuggies = require('nuggies');
const ms = require('ms')
module.exports.run = async (client, message, args) => {
	let requirements;
	let prize;
	if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply('<:carpi:855750448711467058> Bu Komudu kullanmaya yetkin yok!');
	if (!args[1]) return message.reply('Lütfen argümantları `{süre} {kazanacak sayısı} {ödül}` böyle yapın');
	if (isNaN(parseInt((args[1])))) return message.reply('Lütfen geçerli sayıda kazanan sağlayın', { allowedMentions: { repliedUser: false } });
	if (!args[1]) return message.reply('Lütfen çekilişin zamanını sağlayın! ', { allowedMentions: { repliedUser: false } });
	if (!ms(args[0])) return message.reply('Lütfen geçerli bir süre sağlayın! örnek: `1m 1w`', { allowedMentions: { repliedUser: false } });
	if (!args.slice(2).join(' ')) return message.reply('Lütfen ödülü girin!', { allowedMentions: { repliedUser: false } });
	const host = message.author.id;
	const winners = parseInt(args[1]);
	if (args[2].endsWith('[role]')) {
		const role = args[2].replace('[role]', '');
		const check = message.guild.roles.cache.get(role);
		if (!check) return message.channel.send('please provide a valid role!');
		requirements = { enabled: true, roles: [role] };
		prize = args.slice(3).join(' ');
	}
	else {
		prize = args.slice(2).join(' ');
		requirements = { enabled: false };
	}

	Nuggies.giveaways.create({
		message: message,
		prize: prize,
		host: host,
		winners: winners,
		endAfter: args[0],
		requirements: requirements,
		channel: message.channel.id,
	});
}

exports.help = {
	name: 'pre-çekiliş-başlat'
}
