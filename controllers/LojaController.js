const Loja = require("./../model/lojaModel");

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
  res.status(200).json({
    status: "Success",
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

    const novaLoja = await Loja.create(req.body);

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