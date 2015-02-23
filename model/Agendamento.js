/* Modelo para Agendamento */

var mongoose = require('mongoose');

var AgendamentoSchema = mongoose.Schema({
    cliente: String,
    servicoAgendado: String,
    funcionario: String,
    data: String,
    hora: String
  });

  module.exports = mongoose.model('Agendamento', AgendamentoSchema);