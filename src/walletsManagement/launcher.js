#!/usr/bin/env node
var install = require('./MNinstall/install');

var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Select name, priv key, crypto
rl.question("What is the crypto ? ", function(crypto) {
rl.question("What is the user ? ", function(name) {
    rl.question("What is the private key ? ", function(priv_key) {
        console.log( `Hello ${name}, your Masternode ${crypto} is under setup, the private key is  ${priv_key}`);
		install.main(name,priv_key,crypto);
    });
});
});
