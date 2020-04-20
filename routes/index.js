const start = require('../start');
const async = require('asyncawait/async');
const test_async =require('./test_async');
const auth = require('http-auth');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { check, validationResult } = require('express-validator');
const dashboard_data = require('./dashboard_data');
const masternodes_data = require('./masternodes_data');
const router = express.Router();
const Registration = mongoose.model('Registration');
const Masternodes = mongoose.model('Masternodes');
const basic = auth.basic({
  file: path.join(__dirname, '../conf/users.htpasswd'),
});

router.get('/', auth.connect(basic), (req, res) => {
	dashboard.data(function(data){
  Masternodes.find()
    .then((masternodes) => {
		console.log(masternodes.length);
      res.render('dashboard', { title: 'Dashboard - Masternodes', masternodes, data });
    })
    .catch((err) => {
      console.log(err);
      res.send('Sorry! Something went wrong.');
    });
	})
});

router.get('/masternodes', auth.connect(basic), (req, res) => {
	masternodes_data.data(function(data){
		res.render('masternodes', { title: 'Masternodes - Management', data });
	})
});

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


router.post('/',
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

router.get('/registrations', auth.connect(basic), (req, res) => {
  Registration.find()
    .then((registrations) => {
      res.render('index', { title: 'Listing registrations', registrations });
    })
    .catch((err) => {
      console.log(err);
      res.send('Sorry! Something went wrong.');
    });
});

module.exports = router;

