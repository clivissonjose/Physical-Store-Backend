const express = require("express");
const lojaController = require("./../controllers/LojaController");

const router = express.Router();

 // Aqui vai dar uma falha para pegar todas as lojas por causa da url do postman que esta diferente
router.route("/:cep")
  .get(lojaController.pegarLojas)
  .post(lojaController.criarLoja);
router.route("/:cep")
  .get(lojaController.pegarMesmoCep);

module.exports =  router;