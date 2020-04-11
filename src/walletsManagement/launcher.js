#!/usr/bin/env node
var install = require('./MNinstall/createMN');

var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Select name, priv key, crypto
rl.question("What is the crypto ? ", function(crypto) {
rl.question("What is the user ? ", function(name) {
		install.main(name,crypto);
});
});
