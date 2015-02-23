/* Modelo para Produto */

var mongoose = require('mongoose');

var ProdutoSchema = mongoose.Schema({
    nome: String,
    validade: String,
    quantidade: String,
    valor: String
  });
  
  module.exports = mongoose.model('Produto', ProdutoSchema);