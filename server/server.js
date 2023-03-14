const http = require('http');
const express = require("express");
const app = express();
const getAllTransactions = require("./transactionData")
const cors = require('cors');

// app.use(express.json());

app.use(cors({
  origin: '*'
}));

app.get('/getTransactions', async (req, res) => {
	const transactions = await getAllTransactions(req, res)

});
const server = http.createServer(app);

server.listen(5002);
