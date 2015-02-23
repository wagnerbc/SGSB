/* Modelo para Cliente */

  var mongoose = require('mongoose');

  var ClienteSchema = mongoose.Schema({
    nome: String,
    endereco: { rua: String,
                numero: String
              },
    sexo: String,
    telefone: String,
    dataNascimento: String,
    cpf: String,
    preferenciaHorario: String,
    localTrabalho: String
  });
  
  module.exports = mongoose.model('Cliente', ClienteSchema);