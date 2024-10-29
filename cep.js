// import axios from 'axios';
// import { error } from "winston";
// import fetch from 'node-fetch';

const buscarCep = async function(cep) {
  try {
     //const padraoTeste = "01001000";
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      
      // Verifique se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();

      // Verifique se o CEP retornou dados válidos
      if (data.erro) {
          throw new Error('CEP não encontrado.');
      }
      
      console.log(data); // Aqui você deveria ver os dados da cidade e outros dados do CEP
      return response;
  } catch (error) {
      console.error('Erro ao buscar o CEP:', error);
  }
}

module.exports = buscarCep; 