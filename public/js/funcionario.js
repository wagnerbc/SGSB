$(document).ready(function(){
  
// captura os dados do cadastro de Funcionários para serem armazenados
  $('#btnCadFunc').click(function(evt){
    var nome = $('#inputNomeFuncionario').val();
    var rua = $('#enderecoRua').val();
    var numero = $('#enderecoNumero').val();
    var telefone = $('#inputFoneFuncionario').val();
    var dataNascimento = $('#dataNascimentoFuncionario').val();
    var cpf = $('#inputCpfFuncionario').val();
    var sexo = $('input:radio[name=radioSexo]:checked').val();
    var funcao = $('#inputFuncaoFuncionario').val();
    var dataAdmissao = $('#dataAdmissao').val();
    var cursos = $('#cursos').val();
    var escolaridade = $('#escolaridade').val();
    var salario = $('#salario').val();
    var estadoCivil = $('input:radio[name=radioEstadoCivil]:checked').val();
    var login = $('#login').val();
    var senha = $('#password').val();
    var permissao = $('input:radio[name=radioPermissao]:checked').val();

    $.ajax({
      method: 'POST',
      url: '/funcionarios',
      data:{
        nome: nome,
        endereco: { rua: rua,
                    numero: numero
                  },
        telefone: telefone,
        dataNascimento: dataNascimento,
        cpf: cpf,
        sexo: sexo,
        funcao: funcao,
        dataAdmissao: dataAdmissao,
        cursos: cursos,
        escolaridade: escolaridade,
        estadoCivil: estadoCivil,
        salario: salario,
        login: login,
        senha: senha,
        permissao: permissao
      }
    });
    location.reload();
  });
});

$(document).on("pagecreate", "#buscarFuncionario", function() {
    $("#autocomplete").on("filterablebeforefilter", function (e, data){
        var $ul = $(this),
            $input = $(data.input),
            value = $input.val(),
            html = "";
        $ul.html("");
        if (value && value.length > 2){
            $ul.html("<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
            $ul.listview("refresh");
            $.ajax({
                url: "/buscaFuncionario",
                method: "get",
                dataType: "json",
                crossDomain: true,
                data: {
                    q: $input.val()
                }
            })
            .then(function (res) {
                $.each(res, function(i, val) {
                    html += '<li><a href="#exibirFuncionario" onclick="exibeFuncionario($(this).html())">' + val.nome + '</a></li>';
                });
                $ul.html(html);
                $ul.listview("refresh");
                $ul.trigger("updatelayout");
            });
        }
    });

    var idTemp;

    exibeFuncionario = function exibeFuncionario(nome){
      var url = '/funcionarios/' + nome;

      $.getJSON(url, function(funcionario){
        idTemp = funcionario._id;
        
        $('#exibeNomeFuncionario').val(funcionario.nome);
        $('#exibeRua').val(funcionario.endereco.rua);
        $('#exibeNumero').val(funcionario.endereco.numero);
        $('#exibeFoneFuncionario').val(funcionario.telefone);
        $('#exibeDataNascimento').val(funcionario.dataNascimento);
        $('#exibeCpfFuncionario').val(funcionario.cpf);
        $('#exibeFuncao').val(funcionario.funcao);
        $('#exibeDataAdmissao').val(funcionario.dataAdmissao);
        $('#exibeCursos').val(funcionario.cursos);
        $('#exibeEscolaridade').val(funcionario.escolaridade);
        $('#exibeSalario').val(funcionario.salario);
        $('#exibeLogin').val(funcionario.login);
        $('#exibePassword').val(funcionario.senha);

        if(funcionario.sexo == "masculino"){
          $('#exibeMasculino').attr("checked", true).checkboxradio('refresh');
        }else{
            if(funcionario.sexo == "feminino"){
              $('#exibeFeminino').attr("checked", true).checkboxradio('refresh');
            }
        }

        if(funcionario.estadoCivil == "solteiro"){
          $('#exibeSolteiro').attr("checked", true).checkboxradio('refresh');
        }else{
            if(funcionario.sexo == "casado"){
              $('#exibeCasado').attr("checked", true).checkboxradio('refresh');
            }
        }

        if(funcionario.permissao == "administrador"){
          $('#exibePermissaoAdmin').attr("checked", true).checkboxradio('refresh');
        }else{
            if(funcionario.permissao == "comum"){
              $('#exibePermissaoComum').attr("checked", true).checkboxradio('refresh');
            }
        }
      });
    }

    $('#btnExcluirFunc').click(function(){
      $.ajax({
        method: 'delete',
        url: '/funcionarios/remove/' + idTemp
      });
      location.reload();
      idTemp = null;
    });


    $('#btnAlterarFunc').click(function(evt){
    var nome = $('#exibeNomeFuncionario').val();
    var rua = $('#exibeRua').val();
    var numero = $('#exibeNumero').val();
    var telefone = $('#exibeFoneFuncionario').val();
    var dataNascimento = $('#exibeDataNascimento').val();
    var cpf = $('#exibeCpfFuncionario').val();
    var sexo = $('input:radio[name=exibeSexo]:checked').val();
    var funcao = $('#exibeFuncao').val();
    var dataAdmissao = $('#exibeDataAdmissao').val();
    var cursos = $('#exibeCursos').val();
    var escolaridade = $('#exibeEscolaridade').val();
    var estadoCivil = $('input:radio[name=exibeEstadoCivil]:checked').val();
    var salario = $('#exibeSalario').val();
    var login = $('#exibeLogin').val();
    var senha = $('#exibePassword').val();
    var permissao = $('input:radio[name=permissaoAdmin]:checked').val();

    $.ajax({
      method: 'PUT',
      url: '/funcionarios/edit/' + idTemp,
      data:{
        nome: nome,
        endereco: { rua: rua,
                    numero: numero
                  },
        telefone: telefone,
        dataNascimento: dataNascimento,
        cpf: cpf,
        sexo: sexo,
        funcao: funcao,
        dataAdmissao: dataAdmissao,
        cursos: cursos,
        escolaridade: escolaridade,
        estadoCivil: estadoCivil,
        salario: salario,
        login: login,
        senha: senha,
        permissao: permissao
      }
    });
    location.reload();
    idTemp = null;
  });
});
