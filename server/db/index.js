require('dotenv').config();
// Realiza a conexão do servidor com o banco de dados
const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/IntuitivoDB", {useUnifiedTopology: true, useNewUrlParser: true});

mongoose.connect(process.env.BD_URL, {useUnifiedTopology: true, useNewUrlParser: true});

const db = mongoose.connection;

module.exports = db;