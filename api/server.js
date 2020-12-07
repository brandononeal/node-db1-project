const express = require("express");
const server = express();

const AccountRouter = require("./accounts/accountRouter");

server.use(express.json());
server.use("/api/accounts", AccountRouter);

module.exports = server;
