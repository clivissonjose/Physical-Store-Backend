const mongoose = require("mongoose");

const lojaSchema = new mongoose({
  cep: {
    type: String,
    required: [true, "Uma loja precisa ter um cep"],
    trim: true,
  },
  logradouro:{
    type: String,
    required: [true, "Uma loja precisa ter um logradouro"]
  }, 
  bairro: {
    type: String,
    required: [true, "Uma loja precisa ter um bairro"]
  }
});

const Loja = mongoose.model("Loja", lojaSchema);

module.exports = Loja;