const express = require("express");
const app =  express();

app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

const lojaRouter = require("./routes/lojasRoutes");

app.use("/api/v1/lojas", lojaRouter); 

module.exports = app;