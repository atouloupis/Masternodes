const createBitcoinWallet=require('../src/walletsManagement/bitcoinWallet/bitcoinWalletCreate');
const sendBitcoin=require('../src/walletsManagement/bitcoinWallet/bitcoinTxGenerate');
const start = require('../start');
const async = require('asyncawait/async');
const auth = require('http-auth');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { check, validationResult } = require('express-validator');
const wallets_data = require('./wallets_data');
const masternodes_data = require('./masternodes_data');
const crypto_data = require('./crypto_data');
const router = express.Router();
const Registration = mongoose.model('Registration');
const Masternodes = mongoose.model('Masternodes');
const basic = auth.basic({
  file: path.join(__dirname, '../conf/users.htpasswd'),
});

router.get('/', basic.check( (req, res) => {
var User=req.user;
	wallets_data.Walletsdatas(function(Walletsdatas){
		masternodes_data.MNdata(function(MNdata){
			crypto_data.Cryptodata(function(Cryptodata){
				res.render('dashboard', { title: 'Dashboard', MNdata, Walletsdatas,Cryptodata, User });
			});
		});
	});
}));

router.get('/masternodes', basic.check( (req, res) => {
var User=req.user;
	masternodes_data.MNdata(function(MNdata){
		crypto_data.Cryptodata(function(Cryptodata){
			res.render('masternodes', { title: 'Masternodes', MNdata, Cryptodata, User});
		});
	});
}));

router.post('/masternodes',
  async(req, res) => {
	// masternodes_data.createMN(req.body.crypto,req.body.user)
	    // .then((MNinfos) => {
			// return res.render('masternodes',{ title: 'Masternodes - Management', MNinfos});
	    // }, (error) => {
		    // return res.render('masternodes');;
		// })
		const MNinfos= masternodes_data.createMN(start.io,req.body.crypto,req.body.user);
		res.redirect('/masternodes');
  });

router.get('/404', basic.check( (req, res) => {
	var User=req.user;
	crypto_data.Cryptodata(function(Cryptodata){
		res.render('404', { title: 'Page non trouvée',Cryptodata,User});
	});
}));

router.get('/wallets', basic.check( (req, res) => {
	var User=req.user;
	wallets_data.Walletsdatas(User,function(Walletsdatas){
		crypto_data.Cryptodata(function(Cryptodata){
            // console.log(Walletsdatas);
			res.render('wallets', { title: 'Portefeuilles',Cryptodata,Walletsdatas,User});
		});
	});
}));

router.post('/wallets',
  [
    check('password')
      .isLength({ min: 8 })
      .withMessage('Please enter a password'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        if (req.body.crypto=='Btc' && req.body.confirmpassword==req.body.password){
            createBitcoinWallet.createWallet(req.body.user,req.body.password, function(BTCwallet){
                console.log(BTCwallet);
                var User=req.body.user;
                wallets_data.Walletsdatas(User,function(Walletsdatas){
                    crypto_data.Cryptodata(function(Cryptodata){
                        res.redirect('/wallets');
                    });
                });
            });
        }
        else {
            var User=req.body.user;
           wallets_data.Walletsdatas(User,function(Walletsdatas){
              crypto_data.Cryptodata(function(Cryptodata){
                  res.redirect('/wallets');
              });
          });
        }
    }
    else {
      var User=req.body.user;
      wallets_data.Walletsdatas(User,function(Walletsdatas){
        crypto_data.Cryptodata(function(Cryptodata){
          res.redirect('/wallets');
        });
      });
    }
  }
);

router.post('/sendBtc',
  [
    check('password')
      .isLength({ min: 8 }),
    check('sendaddress')
      .matches(/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/),
    check('walletId')
      .isLength({ min: 36 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      var User=req.body.user;
      var password=req.body.password;
      var amount=req.body.amount;
      var address=req.body.sendaddress;
      var walletId=req.body.walletId;
      console.log(User+password+amount+address);
      sendBitcoin.sendWallet(User,password,walletId,address,amount,function(callback){
          res.redirect('/wallets');
        });
    }
    else {
        console.log(errors);
          res.redirect('/wallets');
    }
  }
);

module.exports = router;

