const Loja = require("./../model/lojaModel");
const buscarEndereco = require("../services/buscarEnderecoService");
const geoLocalizacao = require("../services/geoLocalizacao");
const calcularDistancia = require("../services/calcularDistanciaService");

exports.pegarLojas = async(req, res)  => {  
    try {

      const lojas = await Loja.find();
  
      console.log(lojas);
      res.status(200).json({
        status: 'success',
        results: lojas.length,
        data: {
          lojas
        }
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Algo deu errado!',
      });
    }
  };

exports.pegarMesmoCep = async (req, res) => {

  try{
    console.log("CEP buscado:", req.params.cep);
    const lojas =  await Loja.find({ cep: req.params.cep });
  
    if(!lojas){
      return res.status(404).json({
        status: "Fail",
        message: "Não foi possível achar tal cep!",
      })
  }
 // console.log("Quantidade de lojas: ", lojas.length); -> undefined  
    res.status(200).json({
      status: "Success9",
      data: {
        lojas: lojas
      }
    });
  }catch(err){
    res.status(500).json({
       status: "Error",
       message: err.message
    })
  }
}

exports.criarLoja = async (req, res) => {

  try {

    // Pegar cep digitado pelo usuário
    const cep = await buscarEndereco(req.body.cep);

    console.log(cep);
    // Constante para pegar latitude e longitude
    const latLong = await geoLocalizacao(cep.cep);
   
    const latitude = latLong.latitude;
    const longitude = latLong.longitude;

    // Adicionar loja no Bando de Dados
    const novaLoja = await Loja.create({
      nome: "Magazine Luiza",         
      cep:cep.cep,
      logradouro: cep.logradouro,
      complemento: cep.complemento,
      latitude: latitude,
      longitude: longitude,
      unidade: cep.unidade,
      bairro:   cep.bairro,
      localidade: cep.cidade,
      uf: cep.uf,
      estado: cep.estado,
      regiao: cep.regiao,
      ibge: cep.ibge,
      gia: cep.gia,
      ddd: cep.ddd,
      siafi: cep.siafi
    });

    res.status(201).json({
      status: 'success',
      data: {
        loja: novaLoja
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.lojasProximas100km = async (req,res) => {
  try{

    const latLong = await geoLocalizacao(req.params.cep);
    console.log("Latitude: ", latLong.latitude, " Longitude: ", latLong.longitude);
    
    const lojas = await Loja.find();

    const lojasProximas = lojas.filter((el) => {
      const distancia = calcularDistancia(latLong.latitude, latLong.longitude, el.latitude, el.longitude);
      return distancia <= 100;
    });

    if (lojasProximas.length > 0) {
      console.log(lojasProximas);
      res.status(200).json({
        status: "Success",
        data: {
          lojas: lojasProximas
        }
      });
    } else {
      console.log("Sem lojas no raio de 100km!");
      res.status(200).json({
        status: "Success",
        message: "Sem lojas no raio de 100km!"
      });
    }

    if(lojasProximas.length > 0)
      console.log(lojasProximas);
    else
      console.log("Sem lojas no raio de 100km!");
 
  }catch(error){
    res.status.json({
      status: "fail",
      message: message.error
    })
  }
}