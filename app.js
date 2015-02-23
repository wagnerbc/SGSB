/* Requisição do Express */
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Funcionario = {};
var Cliente = {};
var Servico = {};
var ServicoRealizado = {};
var Agendamento = {};
var Produto = {};

mongoose.connect('mongodb://localhost/salao');

var db = mongoose.connection;

/* Criar a estrutura e modelo dos Schemas */
db.once('connected', function(){

  console.log('Conectado com o MongoDB');
  
/* Modelo para Funcionário */
  Funcionario = require('./model/Funcionario');

/* Modelo para Cliente */
  Cliente = require('./model/Cliente');

/* Modelo para Serviço */
  Servico = require('./model/Servico') ;

/* Modelo para Serviço Realizado */ 
  ServicoRealizado = require('./model/ServicoRealizado');
  
/* Modelo para Agendamento */
  Agendamento = require('./model/Agendamento');

/* Modelo para Produto */
  Produto = require('./model/Produto');
});

/* Requisição do arquivo de msgs */
var msg = require('./config/msg');

/* Instanciação do Express*/
var app = express();

/* Configurações adicionais do Express */

/* Configurar pasta pública */
app.use(express.static(__dirname + '/public'));

app.use(methodOverride('_method'));

/* Parsear POST e JSON */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/* Utilizar EJS como mecanismo de renderização das views*/
app.set('view engine', 'ejs');

/* Tratamento das Rotas */

app.get('/', function(req, res){
  /* Renderizar uma view - EJS */
  res.render('main');
});

// grava o novo funcionário
app.post('/funcionarios', function(req, res){
  var funcionario = new Funcionario({
    nome: req.body.nome,
    endereco: { rua: req.body.endereco.rua,
                numero: req.body.endereco.numero
              },
    telefone: req.body.telefone,
    dataNascimento: req.body.dataNascimento,
    cpf: req.body.cpf,
    sexo: req.body.sexo,
    funcao: req.body.funcao,
    dataAdmissao: req.body.dataAdmissao,
    cursos: req.body.cursos,
    escolaridade: req.body.escolaridade,
    estadoCivil: req.body.estadoCivil,
    salario: req.body.salario,
    senha: req.body.senha,
    login: req.body.login,
    permissao: req.body.permissao
  });

  funcionario.save(function(err){
    if (!err){
      res.redirect('/');
    }else{
      console.error('Fud...!');
    }
  });
});

// grava o novo cliente
app.post('/cliente', function(req, res){
  var cliente = new Cliente({
    nome: req.body.nome,
    endereco: { rua: req.body.endereco.rua,
                numero: req.body.endereco.numero
              },
    sexo: req.body.sexo,
    telefone: req.body.telefone,
    dataNascimento: req.body.dataNascimento,
    cpf: req.body.cpf,
    preferenciaHorario: req.body.preferenciaHorario,
    localTrabalho: req.body.localTrabalho
  });

  cliente.save(function(err){
    if (!err){
      res.redirect('/');
    }else{
      console.error('Fud...!');
    }
  });
});

// grava o novo Serviço
app.post('/servico', function(req, res){
  var servico = new Servico({
    nome: req.body.nome,
    valorMinimo: req.body.valorMinimo,
    valorMaximo: req.body.valorMaximo
  });

  servico.save(function(err){
    if (!err){
      res.redirect('/');
    }else{
      console.error('Fud...!');
    }
  });
});

// grava o novo Produto
app.post('/produto', function(req, res){
  var produto = new Produto({
    nome: req.body.nome,
    validade: req.body.validade,
    quantidade: req.body.quantidade,
    valor: req.body.valor
  });

  produto.save(function(err){
    if (!err){
      res.redirect('/');
    }else{
      console.error('Fud...!');
    }
  });
});

// grava o novo Serviço Realizado
app.post('/servicoRealizado', function(req, res){
  var servicoRealizado = new ServicoRealizado({
    cliente: req.body.cliente,
    servicos: req.body.servicos,
    valorTotal: req.body.valorTotal,
    data: req.body.data
  });

  servicoRealizado.save(function(err){
    if (!err){
      res.redirect('/');
    }else{
      console.error('Fud...!');
    }
  });
});

// grava os Agendamentos
app.post('/agendamento', function(req, res){
  var agendamento = new Agendamento({
    cliente: req.body.cliente,
    servicoAgendado: req.body.servicoAgendado,
    funcionario: req.body.funcionario,
    data: req.body.data,
    hora: req.body.hora
  });

  agendamento.save(function(err){
    if (!err){
      res.redirect('/');
    }else{
      console.error('Fud...!');
    }
  });
});

/*-------------------Funcionário-------------------*/
// Busca os funcionários pesquisados
app.get('/buscaFuncionario', function(req, res){
  Funcionario.find(function(err, funcionarios){
    
    res.json(funcionarios);
  });
});

// retorna o funcionário selecionado
app.get('/funcionarios/:nome', function(req, res){
  var name = req.params.nome;

  Funcionario.find(function(err, funcionarios){
    for (var i = 0; i < funcionarios.length; i++) {
      if(funcionarios[i].nome == name){
        res.json(funcionarios[i]);
      }
    };
  });
});

// remove funcionário
app.delete('/funcionarios/remove/:id', function(req, res){
  var id = req.params.id;

  Funcionario.findByIdAndRemove(id, function(err){
    if(err){
      console.log("Erro ao remover");
    }
  });
});

//Altera funcionário
app.put('/funcionarios/edit/:id', function(req, res){
  var id = req.params.id;
  var query = {
    nome: req.body.nome,
    endereco: { rua: req.body.endereco.rua,
                numero: req.body.endereco.numero
              },
    telefone: req.body.telefone,
    dataNascimento: req.body.dataNascimento,
    cpf: req.body.cpf,
    sexo: req.body.sexo,
    funcao: req.body.funcao,
    dataAdmissao: req.body.dataAdmissao,
    cursos: req.body.cursos,
    escolaridade: req.body.escolaridade,
    estadoCivil: req.body.estadoCivil,
    salario: req.body.salario
  }

  Funcionario.findByIdAndUpdate(id, query, function(err, funcionario){
    res.json(funcionario);
  });
});
/*-----------------------Fim-Funcionário---------------*/

/*-------------------Cliente---------------------------*/
// Busca os clientes pesquisados
app.get('/buscaCliente', function(req, res){
  Cliente.find(function(err, clientes){
    res.json(clientes);
  });
});

// retorna o cliente selecionado
app.get('/clientes/:nome', function(req, res){
  var name = req.params.nome;

  Cliente.find(function(err, clientes){
    for (var i = 0; i < clientes.length; i++) {
      if(clientes[i].nome == name){
        res.json(clientes[i]);
      }
    };
  });
});

// remove cliente
app.delete('/clientes/remove/:id', function(req, res){
  var id = req.params.id;

  Cliente.findByIdAndRemove(id, function(err){
    if(err){
      console.log("Erro ao remover");
    }
  });
});

//Altera cliente
app.put('/clientes/edit/:id', function(req, res){
  var id = req.params.id;
  var query = {
    nome: req.body.nome,
    endereco: { rua: req.body.endereco.rua,
                numero: req.body.endereco.numero
              },
    sexo: req.body.sexo,
    telefone: req.body.telefone,
    dataNascimento: req.body.dataNascimento,
    cpf: req.body.cpf,
    preferenciaHorario: req.body.preferenciaHorario,
    localTrabalho: req.body.localTrabalho
  }

  Cliente.findByIdAndUpdate(id, query, function(err, cliente){
    res.json(cliente);
  });
});
/*---------------------Fim-Cliente-----------------------*/

/*-------------------Produto---------------------------*/
// Busca os produtos pesquisados
app.get('/buscaProduto', function(req, res){
  Produto.find(function(err, produtos){
    res.json(produtos);
  });
});

// retorna o produto selecionado
app.get('/produtos/:nome', function(req, res){
  var name = req.params.nome;

  Produto.find(function(err, produtos){
    for (var i = 0; i < produtos.length; i++) {
      if(produtos[i].nome == name){
        res.json(produtos[i]);
      }
    };
  });
});

// remove produto
app.delete('/produtos/remove/:id', function(req, res){
  var id = req.params.id;

  Produto.findByIdAndRemove(id, function(err){
    if(err){
      console.log("Erro ao remover");
    }
  });
});


//Altera produto
app.put('/produtos/edit/:id', function(req, res){
  var id = req.params.id;
  var query = {
    nome: req.body.nome,
    validade: req.body.validade,
    quantidade: req.body.quantidade,
    valor: req.body.valor
  }

  Produto.findByIdAndUpdate(id, query, function(err, produto){
    res.json(produto);
  });
});
/*---------------------Fim-Produto-----------------------*/

/*-------------------Serviço---------------------------*/
// Busca os serviços pesquisados
app.get('/buscaServico', function(req, res){
  Servico.find(function(err, servicos){
    res.json(servicos);
  });
});


// retorna o serviço selecionado
app.get('/servicos/:nome', function(req, res){
  var name = req.params.nome;

  Servico.find(function(err, servicos){
    for (var i = 0; i < servicos.length; i++) {
      if(servicos[i].nome == name){
        res.json(servicos[i]);
      }
    };
  });
});

// remove serviços
app.delete('/servicos/remove/:id', function(req, res){
  var id = req.params.id;

  Servico.findByIdAndRemove(id, function(err){
    if(err){
      console.log("Erro ao remover");
    }
  });
});

//Altera serviços
app.put('/servicos/edit/:id', function(req, res){
  var id = req.params.id;
  var query = {
    nome: req.body.nome,
    valorMinimo: req.body.valorMinimo,
    valorMaximo: req.body.valorMaximo
  }

  Servico.findByIdAndUpdate(id, query, function(err, servico){
    res.json(servico);
  });
});
/*---------------------Fim-Serviço-----------------------*/

/*---------------------Agendamento-----------------------*/
// retorna o funcionário selecionado
app.get('/buscaAgendamentos/:data', function(req, res){
  var data = req.params.data;
  var listaDatas = [];

  Agendamento.find(function(err, agendamentos){
    for (var i = 0; i < agendamentos.length; i++) {
      if(agendamentos[i].data == data){
        listaDatas.push(agendamentos[i]);
      }
    };
    
    res.json(listaDatas);
  });
});

/*---------------------Fim-Agendamento---------------------*/

/*----------------retorna aniversariantes para Relatório de Aniversariantes--------------------*/
app.get('/aniversariantes/:data', function(req,res){
  var data = req.params.data;
  var aniversariantes = [];

  Funcionario.find(function(err, funcionarios){
    for(var i = 0; i < funcionarios.length; i++){
      if (getMes(funcionarios[i].dataNascimento) == getMes(data)){
        if(getDia(funcionarios[i].dataNascimento) == getDia(data)){
          var funcionario = {
            nome: funcionarios[i].nome,
            telefone: funcionarios[i].telefone,
            tipo: "Funcionário"
          };
          aniversariantes.push(funcionario);
        };
      };
    };
  });

  Cliente.find(function(err, clientes){
    for(var i = 0; i < clientes.length; i++){
      if (getMes(clientes[i].dataNascimento) == getMes(data)){
        if(getDia(clientes[i].dataNascimento) == getDia(data)){
          var cliente = {
            nome: clientes[i].nome,
            telefone: clientes[i].telefone,
            tipo: "Cliente"
          };
          aniversariantes.push(cliente);
        };
      };
    };
    res.json(aniversariantes);
  });
});

var getDia = function getDia(data){
  var dia = new Date(data);
  return dia.getDate();
}

var getMes = function getMes(data){
  var mes = new Date(data);
  return mes.getMonth();
}

/*------------------retorna os atendimentos por funcionário----------*/
app.get('/atendimentos/:funcionario/:data', function(req,res){
  var data = req.params.data;
  var funcionario = req.params.funcionario;
  var atendimentos = [];

  ServicoRealizado.find(function(err, servicosRealizados){
    for(var i = 0; i < servicosRealizados.length; i++){
      if(data == servicosRealizados[i].data){

        for (var j = 0; j < servicosRealizados[i].servicos.length; j++) {
          if(servicosRealizados[i].servicos[j].nomeFuncionario == funcionario){
            var atendimento = {
              cliente: servicosRealizados[i].cliente,
              servico: servicosRealizados[i].servicos[j].nomeServico,
              valor: servicosRealizados[i].servicos[j].valorServico
            };
            atendimentos.push(atendimento);
          }
        };
      };
    };  
    res.json(atendimentos);
  });
});

/*------------------retorna todos os atendimentos por data----------*/
app.get('/atendimentosGeral/:data', function(req,res){
  var data = req.params.data;
  var atendimentos = [];

  ServicoRealizado.find(function(err, servicosRealizados){
    for(var i = 0; i < servicosRealizados.length; i++){
      if(data == servicosRealizados[i].data){
        for (var j = 0; j < servicosRealizados[i].servicos.length; j++) {
          var atendimento = {
            cliente: servicosRealizados[i].cliente,
            servico: servicosRealizados[i].servicos[j].nomeServico,
            funcionario: servicosRealizados[i].servicos[j].nomeFuncionario,
            valor: servicosRealizados[i].servicos[j].valorServico
          };
          atendimentos.push(atendimento);
        };
      };
    };  
    res.json(atendimentos);
  });
});

/*----------------Login-------------------*/
app.get('/login/:login/:senha', function(req, res){
  var acesso = null;

  var login = req.params.login;
  var senha = req.params.senha;

  Funcionario.find(function(err, funcionarios){
    
    for (var i = 0; i < funcionarios.length; i++) {
      if(funcionarios[i].login == login && funcionarios[i].senha == senha){
        acesso = funcionarios[i].permissao;
      }
    };
    res.json(acesso);
  });
});

/* Configuração da porta do Express */
app.listen(3000, function(){
  console.log('App rodando na porta 3000');
});