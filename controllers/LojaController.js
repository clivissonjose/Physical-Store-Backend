const Loja = require("./../model/lojaModel");
const buscarCep = require("./../services/buscarEndereco");

exports.pegarLojas = async (req, res) => {  
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
    const lojas =  await Loja.findOne({ cep: req.params.cep });
  
    if(!lojas){
      return res.status(404).json({
        status: "Fail",
        message: "Não foi possível achar tal cep",
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

    const cep = await buscarCep(req.params.cep);
     console.log("Cep:" , cep);
    // console.log("Body da req: ", req.body.localidade);
   // const novaLoja = await Loja.create(req.body);

   console.log(cep.cidade);
   console.log(cep.bairro);
    const novaLoja = await Loja.create({
      nome: "Magazine Luiza",            // Nome fixo da loja, substitua conforme necessário
      cep:cep.cep,
      logradouro: cep.logradouro,
      complemento: cep.complemento,
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
}