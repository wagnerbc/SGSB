/* Modelo para Funcionário */

var mongoose = require('mongoose');

var FuncionarioSchema = mongoose.Schema({
    nome: String,
    endereco: { 
        rua: String,
        numero: String
    },
    telefone: String,
    dataNascimento: String,
    cpf: String,
    sexo: String,
    funcao: String,
    dataAdmissao: String,
    cursos: String,
    escolaridade: String,
    estadoCivil: String,
    salario: String,
    senha: String,
    login: String,
    permissao: String
  });

  module.exports = mongoose.model('Funcionario', FuncionarioSchema);