// Converter graus em radianos
function radianos(graus) {
  return graus * (Math.PI / 180);
}

function calcularDistancia(latCep, longCep, latLoja, longLoja) {
  const R = 6371; // Raio da Terra em km

  const dLat = radianos(latLoja - latCep);
  const dLon = radianos(longLoja - longCep);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(radianos(latCep)) * Math.cos(radianos(latLoja)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distancia = R * c; // Resultado em quilômetros
  return distancia;
}

module.exports = calcularDistancia;