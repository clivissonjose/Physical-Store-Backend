const express = require("express");
const lojaController = require("./../controllers/LojaController");

const router = express.Router();

router.route("/")
  .get(lojaController.pegarLojas)
  .post(lojaController.criarLoja);
router.route("/:cep")
  .get(lojaController.pegarMesmoCep);

module.exports =  router;