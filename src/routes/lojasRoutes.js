const express = require("express");
const lojaController = require("../controllers/LojaController");

const router = express.Router();

router.route("/")
  .get(lojaController.pegarLojas)
  .post(lojaController.criarLoja);
router.route("/:cep")
  .get(lojaController.lojasProximas100km)
  .delete(lojaController.deletarLoja);

module.exports = router;
