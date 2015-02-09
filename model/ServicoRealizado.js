/* Modelo para ServicoRealizado */

var mongoose = require('mongoose');

var ServicoRealizadoSchema = mongoose.Schema({
    cliente: String,
    servicos: [],
    valorTotal: String,
    data: String
  });

  module.exports = mongoose.model('ServicoRealizado', ServicoRealizadoSchema);
