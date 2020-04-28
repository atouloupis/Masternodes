const mongoose = require('mongoose');

const crypto_datasSchema = new mongoose.Schema({
  id: {
    type: String,
    trim: true,
  },
  symbol: {
  type: String,
  trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  genesis_date: {
    type: Date,
    trim: true,
  },
  description: {
    type: Object,
	  properties: 
     {
		 en: { type: String, format: 'style' },
		 fr: { type: String, format: 'style' }
	 }
  },
  github:{
	type: Array, 
	items: { 
		type: String, 
		format: 'uri' 
		}
  },
  blockchain_site:{
	type: Array, 
	items: { 
		type: String, 
		format: 'uri' 
		}
  },
  image:
  { type: Object,
  properties: 
	{
		thumb: { type: String, format: 'uri' },
		small: { type: String, format: 'uri' },
		large: { type: String, format: 'uri' } 
	} 
  },
  country_origin:
  { 
	type:String
  },
  market_data:
  { 
	type: Object,
	properties: { 
		current_price: { 
			type: Object, 
			properties: { 
				usd: { 
					type: Number 
					},
				eur: { 
					type: Number 
					},
				btc: { 
					type: Number 
					}
			}
		},
		market_cap: { 
			type: Object, 
			properties: { 
				usd: { 
					type: Number 
				},
				eur: { 
					type: Number 
				},
				btc: { 
					type: Number 
				}
			}
		},
		total_volume: { 
			type: Object, 
			properties: { 
				usd: { 
					type: Number 
				},
				eur: { 
					type: Number 
				},
				btc: { 
					type: Number 
				}
			}
		},
		high_24h: { 
			type: Object, 
			properties: { 
				usd: { 
					type: Number 
				},
				eur: { 
					type: Number 
				},
				btc: { 
					type: Number 
				}
			}
		},
		low_24h: { 
			type: Object, 
			properties: { 
				usd: { 
					type: Number 
					},
				eur: { 
					type: Number 
					},
				btc: { 
					type: Number 
				}
			}
		},
		price_change_24h: { type: Number },
		price_change_percentage_24h: { type: Number },
		price_change_percentage_7d: { type: Number },
		price_change_percentage_14d: { type: Number },
		price_change_percentage_30d: { type: Number },
		price_change_percentage_60d: { type: Number },
		price_change_percentage_200d: { type: Number },
		price_change_percentage_1y: { type: Number }
	}
  },
  tickers:{
	type: Array, 
	items: { 
		type: Object,
		properties: { 
			base: { type: String },
			target: { type: String },
			market: { 
				type: Object, 
				properties: { 
					type: Object,
					properties:{ 
						name: { 
							type: String
						},
						identifier: { 
							type: String 
						},
						has_trading_incentive: { 
							type: Boolean 
						} 
					} 
				}
			},
			last: { type: Number },
			volume: { type: Number },
			bid_ask_spread_percentage: { type: Number },
			last_traded_at: { type: String, format: 'date-time' },
			trade_url: { type: String, format: 'uri' },
			coin_id: { type: String },
			target_coin_id: { type: String } 
		} 
	}
  }
});



module.exports = mongoose.model('Crypto_datas', crypto_datasSchema);

