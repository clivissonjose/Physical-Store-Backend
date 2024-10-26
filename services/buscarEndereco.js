async function buscarEndereco(cep) {
  try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (data.erro) {
          throw new Error("CEP não encontrado");
      }

      // Retorna o endereço completo
      return {
          cep: data.cep,
          logradouro: data.logradouro,
          complemento: data.complemento,
          unidade: data.unidade,
          bairro: data.bairro,
          cidade: data.localidade,
          uf: data.uf,
          estado: data.estado,
          regiao: data.regiao,
          ibge: data.ibge,
          gia: data.gia,
          ddd: data.ddd,
          siafi: data.siafi
      };
  } catch (error) {
      console.error("Erro ao buscar endereço:", error.message);
      return null;
  }
}

module.exports = buscarEndereco;