/* Modelo para Serviço */

var mongoose = require('mongoose');

var ServicoSchema = mongoose.Schema({
    nome: String,
    valorMinimo: String,
    valorMaximo: String
});
  
module.exports = mongoose.model('Servico', ServicoSchema);