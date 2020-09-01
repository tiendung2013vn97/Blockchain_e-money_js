
const blockchain = require("../blockchain")
const p2p = require('../p2p')

function cli(vorpal) {
    vorpal
        .use(welcome)
        .use(blockchainCommand)
        .delimiter('blockchain →')
        .show()
}

module.exports = cli;

// COMMANDS
function welcome(vorpal) {
    vorpal.log("Welcome to Blockchain CLI!");
    vorpal.exec("help");
}

function blockchainCommand(vorpal) {
    vorpal
        .command('blockchain', 'See the current state of the blockchain.')
        .alias('bc')
        .action(function (args, callback) {
            this.log(blockchain)
            callback();
        })
}
