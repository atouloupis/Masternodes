const mongoose = require('mongoose');

const walletsdatasSchema = new mongoose.Schema({
	type: 'object',
	properties: 
	{ 
		user: { type: 'string' },
		crypto: { 
			type: 'array',
			items:
			{ 
				type: 'object',
				properties: 
				{ 
					name: { type: 'string' },
					pubkeys: { type: 'array', items: {type: 'string' } },
					privkeysid: { type: 'string' },
					balance: { type: 'integer' } 
				} 
			} 
		} 
	}
});

module.exports = mongoose.model('Wallets_datas', walletsdatasSchema);

// {
	// user:123,
	// crypto:[{name:'Scap',
		// pubkeys :[123,456],
		// privkeysid:123,
		// balance:123
		// },
		// {name:'Btc',
		// pubkeys :[123,456],
		// privkeysid:123,
		// balance:123
		// }]
// };