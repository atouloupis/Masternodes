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
	wallets_data.Walletsdatas(function(Walletsdatas){
		crypto_data.Cryptodata(function(Cryptodata){
			res.render('wallets', { title: 'Page non trouvée',Cryptodata,User});
		});
	});
}));

router.post('/wallets',
  [
    check('name')
      .isLength({ min: 1 })
      .withMessage('Please enter a name'),
    check('email')
      .isLength({ min: 1 })
      .withMessage('Please enter an email'),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const registration = new Registration(req.body);
      registration.save()
        .then(() => { res.send('Thank you for your registration!'); })
        .catch((err) => {
          console.log(err);
          res.send('Sorry! Something went wrong.');
        });
    } else {
      res.render('form', {
        title: 'Registration form',
        errors: errors.array(),
        data: req.body
      });
    }
  });


module.exports = router;

