const mongoose = require("mongoose");

const lojaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "Uma loja precisa ter um nome"],
    trim: true
  },
  cep: {
    type: String,
    required: [true, "Uma loja precisa ter um cep"],
    trim: true
  },
  logradouro: {
    type: String,
    required: [true, "Uma loja precisa ter um logradouro"],
  },
  complemento: {
    type: String,
  },
  unidade: {
    type: String,
  },
  bairro: {
    type: String,
    required: [true, "Uma loja precisa ter um bairro"]
  },
  localidade: {
    type: String,
  },
  uf: {
    type: String,
  },
  estado: {
    type: String,
  },
  regiao: {
    type: String,
  },
  ibge: {
    type: String,
  },
  gia: {
    type: String,
  },
  ddd: {
    type: String,
  },
  siafi: {
    type: String,
  }
});

const Loja = mongoose.model("Loja", lojaSchema);

module.exports = Loja;