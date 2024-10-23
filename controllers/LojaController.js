const Loja = require("./../model/lojaModel");

exports.pegarLojas = async (req, res, next) => {  
  // EXECUTE QUERY
  /*const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitedFields()
    .paginate();  */

  const tours = await features.query;

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });

}