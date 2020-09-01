const wrtc = require("wrtc");
const Exchange = require("peer-exchange");
const p2p = new Exchange("Blockchain Demo 2.0", { wrtc: wrtc });
const net = require("net");
const messageType = require("./message-type.js");
const {
  REQUEST_LATEST_BLOCK,
  RECEIVE_LATEST_BLOCK,
  REQUEST_BLOCKCHAIN,
  RECEIVE_BLOCKCHAIN,
} = messageType;
const Messages = require("./Messages.js");

class PeerToPeer {
  constructor(blockchain) {
    this.peers = [];
    this.blockchain = blockchain;
  }

  // startServer(port) {
  //   const server = net
  //     .createServer(socket =>
  //       p2p.accept(socket, (err, conn) => {
  //         if (err) {
  //           throw err;
  //         } else {
  //           this.initConnection.call(this, conn);
  //         }
  //       })
  //     )
  //     .listen(port);
  // }

  // discoverPeers() {
  //   p2p.getNewPeer((err, conn) => {
  //     if (err) {
  //       throw err;
  //     } else {
  //       this.initConnection.call(this, conn);
  //     }
  //   });
  // }

  connectToPeer(host, port) {
    const socket = net.connect(port, host, () =>
      p2p.connect(socket, (err, conn) => {
        if (err) {
          console.log("ERROR: Connect to peer fail!:", err)
          throw err
        } else {
          this.initConnection.call(this, conn);
          console.log("INFO: Connected!")
        }
      })
    );
  }

  closeConnection() {
    p2p.close(err => {
      console.log("ERROR: Close connection fail!:", err)
    });
  }

  // broadcastLatest() {
  //   this.broadcast(Messages.sendLatestBlock(this.blockchain.latestBlock));
  // }

  broadcastMineBlock(data) {
    this.broadcast(Messages.mineBlock(data))
  }

  broadcast(message) {
    this.peers.forEach(peer => this.write(peer, message));
  }

  write(peer, message) {
    peer.write(JSON.stringify(message));
  }

  initConnection(connection) {
    this.peers.push(connection);
    this.initMessageHandler(connection);
    this.initErrorHandler(connection);
    this.write(connection, Messages.getLatestBlock());
  }

  initMessageHandler(connection) {
    connection.on("data", data => {
      const message = JSON.parse(data.toString("utf8"));
      this.handleMessage(connection, message);
    });
  }

  initErrorHandler(connection) {
    connection.on("error", err => {
      console.log("ERROR:", err)
    });
  }

  handleMessage(peer, message) {
    switch (message.type) {
      case REQUEST_LATEST_BLOCK:
        this.write(peer, Messages.sendLatestBlock(this.blockchain.latestBlock));
        break;
      case REQUEST_BLOCKCHAIN:
        this.write(peer, Messages.sendBlockchain(this.blockchain.get()));
        break;
      case RECEIVE_LATEST_BLOCK:
        console.log("Receive latest block->block.index:", message.data.index)
        this.handleReceivedLatestBlock(message, peer);
        break;
      case RECEIVE_BLOCKCHAIN:
        console.log("Receive new blockchain->block length:", message.data.length)
        this.handleReceivedBlockchain(message);
        break;
      default:
        console.log("ERROR: Received invalid message.")
    }
  }

  handleReceivedLatestBlock(message, peer) {
    const receivedBlock = message.data;
    const latestBlock = this.blockchain.latestBlock;
    const thiz = this

    if (latestBlock.hash === receivedBlock.previousHash) {
      try {
        this.blockchain.addBlock(receivedBlock);
      } catch (err) {
        console.log("ERROR: Add block fail!:", err)
      }

      console.log("Send latest block after add->index:", this.blockchain.latestBlock.index)
      this.peers.forEach(p => { thiz.write(p, Messages.sendLatestBlock(thiz.blockchain.latestBlock)) })

    } else if (receivedBlock.index > latestBlock.index) {
      this.write(peer, Messages.getBlockchain());
    } else {
      // Do nothing.
    }
  }

  handleReceivedBlockchain(message) {
    const receivedChain = message.data;
    const thiz = this

    try {
      this.blockchain.replaceChain(receivedChain);
      console.log("Send latest block after replace blockchain->index:" + this.blockchain.latestBlock.index)
      this.peers.forEach(p => { thiz.write(p, Messages.sendLatestBlock(thiz.blockchain.latestBlock)) })
    } catch (err) {
      console.log("ERROR: Replace chain fail!:", err)
    }
  }
}

module.exports = PeerToPeer;
