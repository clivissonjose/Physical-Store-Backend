// Converter graus em radianos
function radianos(graus) {
  return graus * (Math.PI / 180);
}

function calcularDistancia(latCep, longCep, latLoja, longLoja) {
  const R = 6371; // Raio da Terra em km

  // Diferenças entre as latitudes de longitudes
  const dLat = radianos(latLoja - latCep);
  const dLon = radianos(longLoja - longCep);

  // Fórmula de harvesine para  calcular distancias
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + // Componente de latitude
    Math.cos(radianos(latCep)) * Math.cos(radianos(latLoja)) * // Ajuste para diferenças de longitude e latitude
    Math.sin(dLon / 2) * Math.sin(dLon / 2); // Componente de longitude

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distancia = R * c; // Resultado em quilômetros
  return distancia;
}

module.exports = calcularDistancia;