async function buscarCoordenadas(cep) {
  
  const response = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${cep}&country=Brazil&format=json&limit=1`);
  const data = await response.json();

  if (!response.ok) {
      console.error(`Erro: ${response.status} - ${response.statusText}`);
  }


  if (data.length === 0) throw new Error("CEP não encontrado");

  return {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon)
  };
}

module.exports = buscarCoordenadas;
