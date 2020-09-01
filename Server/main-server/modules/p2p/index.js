const blockchain=require('../blockchain')
const P2p=require("./P2p")
const p2p = new P2p(blockchain); 
module.exports=p2p