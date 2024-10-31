// logger.js
const { createLogger, transports, format } = require('winston');

// Configuração do logger
const logger = createLogger({
  level: 'info', // Nível mínimo para logar mensagens ("info", "warn", "error")
  format: format.combine(
    format.timestamp(), // Adiciona timestamp aos logs
    format.json()       // Define o formato JSON
  ),
  transports: [
    new transports.File({ filename: 'app.log' }) // Salva logs no arquivo "app.log"
  ]
});

module.exports = logger;
