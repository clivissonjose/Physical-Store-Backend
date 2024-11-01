const Loja = require("../model/lojaModel");
const buscarEndereco = require("../services/buscarEnderecoService");
const geoLocalizacao = require("../services/buscarCoordenadasService");
const calcularDistancia = require("../services/calcularDistanciaService");
const logger = require("../utils/logger");

// Ver todas as lojas no  BD
async function pegarLojas(req,res)  {

  try {
    const lojas = await Loja.find();

    if(lojas.length > 0){
      logger.info("Lojas recuperadas com sucesso", { total: lojas.length });
      console.log("LOjas cadastradas: ", lojas);
      res.status(200).json({
        status: "success",
        results: lojas.length,
        data: {
          lojas,
        },
      });
    }else{
      console.log("Sem lojas cadastradas!");
    }

  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Algo deu errado!",
    });
  }
};

// Deletar Loja
async function deletarLoja(req,res) {

  try {
    
    const loja = await Loja.findOneAndDelete({ cep: req.params.cep });
    
    
    if (!loja) {
      console.log("Não foi possível  deletar loja!");
      logger.warn("Não foi possível deletar loja, loja não encontrada:", { cep: req.params.cep });
      return res.status(404).json({
        status: "Fail",
        message: "Não foi possível achar tal cep!",
      });
    }

    logger.info("Loja deletada com sucesso:", { loja });
    console.log("Loja removida: ", loja);
    res.status(200).json({
      status: "success",
      data: {
        loja,
      },
    });
  } catch (err) {
    logger.error('Erro ao deletar loja:', { message: err.message });
    res.status(500).json({
      status: "error",
      message: 'Erro ao deletar loja.'
    });
  }
};

async function criarLoja(req,res) {
  try {
    // Pegar cep digitado pelo usuário
    const cep = await buscarEndereco(req.body.cep);

    // Constante para pegar latitude e longitude
    const latLong = await geoLocalizacao(cep.cep);

    // Constantes para armazenar latitude e longitude
    const latitude = latLong.latitude;
    const longitude = latLong.longitude;

    // Adicionar loja no Bando de Dados
    const novaLoja = await Loja.create({
      nome: "Magazine Luiza",
      cep: cep.cep,
      logradouro: cep.logradouro,
      complemento: cep.complemento,
      latitude: latitude,
      longitude: longitude,
      unidade: cep.unidade,
      bairro: cep.bairro,
      localidade: cep.cidade,
      uf: cep.uf,
      estado: cep.estado,
      regiao: cep.regiao,
      ibge: cep.ibge,
      gia: cep.gia,
      ddd: cep.ddd,
      siafi: cep.siafi,
    });

    logger.info("Nova loja criada:", { loja: novaLoja });
    console.log("Loja criada: ", novaLoja);
    res.status(201).json({
      status: "success",
      data: {
        loja: novaLoja,
      },
    });
  } catch (err) {
    logger.error('Erro ao criar loja:', { message: err.message });
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

async function lojasProximas100km(req,res) {

  try {
    const latLong = await geoLocalizacao(req.params.cep);
    const lojas = await Loja.find();

    // Filtra as lojas no raio de 100km e adiciona a distância calculada

    const lojasProximas = lojas
      .map((el) => {
        const distancia = calcularDistancia(
          latLong.latitude,
          latLong.longitude,
          el.latitude,
          el.longitude
        );
        return { ...el._doc, distancia }; // usa o _doc para copiar os dados da loja e adicionar a distância
      })
      .filter((el) => el.distancia <= 100);

    // Ordena as lojasProximas pela distância
    lojasProximas.sort((a, b) => a.distancia - b.distancia);

    if (lojasProximas.length > 0) {
      logger.info("Lojas próximas encontradas:", { lojas: lojasProximas });
      console.log("Lojas mais próximas encontradas: ", lojasProximas);
      res.status(200).json({
        status: "Success",
        data: {
          lojas: lojasProximas,
        },
      });
    } else {
      logger.warn("Sem lojas no raio de 100km para o CEP:", { cep: req.params.cep });
      console.log("Sem lojas no raio de 100km!");
      res.status(200).json({
        status: "Success",
        message: "Sem lojas no raio de 100km!",
      });
    }
  } catch (error) {
    logger.error('Erro ao buscar lojas próximas:', { message: error.message });
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};


// Exportar funções 
module.exports = {
  pegarLojas,
  deletarLoja,
  criarLoja,
  lojasProximas100km
};  