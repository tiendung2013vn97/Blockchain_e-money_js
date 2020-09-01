
const p2p = require("./modules/p2p")
const vorpal = require('vorpal')();

p2p.startServer(3003)
console.log("INFO: Start server on port 3003 successfully!")

vorpal.use(require('./modules/cli'));

