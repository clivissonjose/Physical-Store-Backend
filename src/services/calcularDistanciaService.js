function radianos(degrees) {
  return degrees * (Math.PI / 180);
}

function calcularDistancia(latCep, longCep, latLoja, longLoja) {
  const R = 6371; // Raio da Terra em quilômetros

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
// Maceio -> -9.6462652, -35.7341512
// Garanhuns -> -8.8909, -36.4965
// Venturosa -> -8.5772346, -36.8741731 === -8.5765, -36.8749
// Pedra -> -8.5001, -36.9483
// Arcoverde -> -8.4176, -37.0585
// const distance =  calcularDistancia(-8.4176, -37.0585, -8.5001, -36.9483);
// console.log(distance);
module.exports = calcularDistancia;