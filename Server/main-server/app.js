const express = require("express")
const http = require("http")
const cors = require("cors")
const bodyParser = require("body-parser")
const p2p = require("./modules/p2p")

const app = express()
app.use(cors())
app.use(bodyParser())
app.use(express.urlencoded())

app.use("/api/user", require("./modules/user/router"))
app.use("/api/votes", require("./modules/vote/router"))

const WORKER1_HOST = "localhost",
    WORKER2_HOST = "localhost",
    WORKER1_PORT = 3002,
    WORKER2_PORT = 3003;

console.log("INFO: Connecting to peers!")
p2p.connectToPeer(WORKER1_HOST, WORKER1_PORT)
p2p.connectToPeer(WORKER2_HOST, WORKER2_PORT)


const server = http.createServer(app)
server.listen(3001, err => {
    if (err) {
        console.log("ERROR when init app on PORT 3001")
    } else {

        console.log("Server is running on PORT 3001")
    }
})

