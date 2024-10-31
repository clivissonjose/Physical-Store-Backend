const axios = require('axios');

async function buscarCoordenadas(cep) {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: `${cep}, Brazil`,
        key: 'AIzaSyCkgYheq_hsuBgi2RISBZHprvquFiwe9pk',
        // parâmetro aleatório para evitar o cache
        random: Math.random()
      }
    });

    const data = response.data;

    if (data.status !== "OK" || data.results.length === 0) {
      console.error("CEP não encontrado ou erro na requisição:", data.status);
      return null;
    }

    console.log(" latitude: ", data.results[0].geometry.location.lat,  "Longitude: ", data.results[0].geometry.location.lng);
    return {
      latitude: data.results[0].geometry.location.lat,
      longitude: data.results[0].geometry.location.lng
    };
  } catch (error) {
    console.error("Erro ao buscar coordenadas:", error.message);
    return null;
  }
}



module.exports = buscarCoordenadas;
