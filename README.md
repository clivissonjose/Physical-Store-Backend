# Physical-Store-Backend

## Desafio 2 do programa de bolsa da compass uol (NodeJs)

Este projeto permite que os usuários localizem lojas físicas em um raio de 100 km a partir de um CEP digitado, priorizando as lojas mais próximas da localização informada. Utilizei a api do google maps para obter a latitude e longitude dos endereços, permitindo calcular as distâncias entre o CEP do usuário e as lojas cadastradas no banco de dados. Projeto foi feito utilizando o máximo possível de JavaScript puro sem frameworks de aceleradores de desenvolvimento.

## Funcionalidades

- **Cadastro de Lojas**: Permite cadastrar lojas físicas informando CEPs e outros dados da loja.
- **Busca de Lojas Próximas**: Busca lojas em um raio de 100 km com base em um CEP fornecido pelo usuário, listando as lojas mais próximas primeiro.
- **API de Localização por CEP**: Utiliza a API do goole maps para converter CEPs em coordenadas geográficas (latitude e longitude).
