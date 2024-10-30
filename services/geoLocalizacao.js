async function buscarCoordenadas(cep) {
  
  // &country=Brazil
  const response = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${cep}&country=Brazil&format=json&limit=1`);
  const data = await response.json();
  console.log("data:", data);

  if (!response.ok) {
      console.error(`Erro: ${response.status} - ${response.statusText}`);
  }

  if (data.length === 0) throw new Error("CEP não encontrado no nominatim. Sem lat e long");

  return {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon)
  };
}

module.exports = buscarCoordenadas;
