async function buscarCoordenadas(cep) {
  
  // const response = await fetch(`https://nominatim.openstreetmap.org/search?postalcode
  //   =${cep}&country=Brazil&format=json&limit=1`); 

   /*   const apiKey = 'pk.487ef7e6f008830296a5e830d192c09a';
      const response = await fetch(`https://us1.locationiq.com/v1/search.php?key=${apiKey}&postalcode=${cep}&country=Brazil&format=json`);
    */
   // Google Maps
   
      const apiKey = 'AIzaSyCkgYheq_hsuBgi2RISBZHprvquFiwe9pk';
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${cep},Brazil&key=${apiKey}`);
 
      const data = await response.json();
    
  
    console.log("Resposta da API:", data);  // Inspecione a resposta aqui

    if (data.status !== "OK" || data.results.length === 0) {
      throw new Error("CEP não encontrado ou erro na requisição");
    }

    return {
      latitude: data.results[0].geometry.location.lat,
      longitude: data.results[0].geometry.location.lng
    };
}

module.exports = buscarCoordenadas;
