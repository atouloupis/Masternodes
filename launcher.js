#!/usr/bin/env node
var axel = require('./crypto/AXEL');

var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Select name, priv key, crypto
rl.question("What is the user ? ", function(name) {
    rl.question("What is the private key ? ", function(priv_key) {
        console.log( `Your name is ${name}, and the private key is  ${priv_key}`);
		axel.main_axel(name,priv_key);
    });
});

