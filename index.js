const lojaController = require("./controllers/LojaController");
const buscarCep = require("./src/cep");

const cep = "55270000";
buscarCep(cep);
console.log(lojaController.pegarMesmoCep("55270-000"));
