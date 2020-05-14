// {
	// user:123,
	// tx:[{crypto:'Scap',
		// txId :123XYZ,
		// explorer:explorer.com/,
		// amount:123.01,
        // fees:0.01,
        // status:pending,
        // way:withdraw,
        // datetime:12/02/2020 12:00
		// },
        // ]
// };

const mongoose = require('mongoose');

const transactionsdatasSchema = new mongoose.Schema({
	user: { type: 'string' },
	tx: { 
		type: 'array',
		items:
		{ 
			type: 'object',
			properties:
			{ 
				crypto: { type: 'string' },
				txid: {type: 'string' },
				explorer: { type: 'string' },
				amount: { type: Number },
				fees: { type: Number },
				status: { type: 'string' },
                way: { type: 'string' },
                datetime: { type: Date },
			} 
		} 
	} 
});

module.exports = mongoose.model('Transactions_datas', transactionsdatasSchema);
