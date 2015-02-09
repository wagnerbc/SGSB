$(document).ready(function(){

// captura os dados do cadastro de Clientes para serem armazenados
  $('#btnCadCli').click(function(evt){
    var nome = $('#inputNomeCliente').val();
    var rua = $('#enderecoClienteRua').val();
    var numero = $('#enderecoClienteNumero').val();
    var telefone = $('#inputFoneCliente').val();
    var dataNascimento = $('#dataNascimentoCliente').val();
    var cpf = $('#inputCpfCliente').val();
    var sexo = $('input:radio[name=sexoCliente]:checked').val();
    var preferenciaHorario = $('#preferenciahorario').val();
    var localTrabalho = $('#localTrabalho').val();
    
    $.ajax({
      method: 'POST',
      url: '/cliente',
      data:{
        nome: nome,
        endereco: { rua: rua,
                    numero: numero
                  },
        sexo: sexo,
        telefone: telefone,
        dataNascimento: dataNascimento,
        cpf: cpf,
        preferenciaHorario: preferenciaHorario,
        localTrabalho: localTrabalho
      }
    });
    location.reload();
  });
});

$(document).on("pagecreate", "#buscarCliente", function() {
    $("#autocomplete-cli").on("filterablebeforefilter", function (e, data){
        var $ul = $(this),
            $input = $(data.input),
            value = $input.val(),
            html = "";
        $ul.html("");
        if (value && value.length > 2){
            $ul.html("<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
            $ul.listview("refresh");
            $.ajax({
                url: "/buscaCliente",
                method: "get",
                dataType: "json",
                crossDomain: true,
                data: {
                    q: $input.val()
                }
            })
            .then(function (res) {
                $.each(res, function(i, val) {
                    html += '<li><a href="#exibirCliente" onclick="exibeCliente($(this).html())">' + val.nome + '</a></li>';
                });
                $ul.html(html);
                $ul.listview("refresh");
                $ul.trigger("updatelayout");
            });
        }
    });

    var idTemp;

    exibeCliente = function exibeCliente(nome){
      var url = '/clientes/' + nome;

      $.getJSON(url, function(cliente){
        idTemp = cliente._id;
        
        $('#exibeNomeCliente').val(cliente.nome);
        $('#exibeClienteRua').val(cliente.endereco.rua);
        $('#exibeClienteNumero').val(cliente.endereco.numero);
        $('#exibeFoneCliente').val(cliente.telefone);
        $('#exibeDataNascCliente').val(cliente.dataNascimento);
        $('#exibeCpfCliente').val(cliente.cpf);
        $('#exibePreferenciaHorario').val(cliente.preferenciaHorario);
        $('#exibeLocalTrabalho').val(cliente.localTrabalho);
        

        if(cliente.sexo == "masculino"){
          $('#exibeSexoClienteMasc').attr("checked", true).checkboxradio('refresh');
        }else{
            if(cliente.sexo == "feminino"){
              $('#exibeSexoClienteFem').attr("checked", true).checkboxradio('refresh');
            }
        }
      });
    }

    $('#btnExcluirCli').click(function(){
      $.ajax({
        method: 'delete',
        url: '/clientes/remove/' + idTemp
      });
      location.reload();
      idTemp = null;
    });


    $('#btnAlterarCli').click(function(evt){
      var nome = $('#exibeNomeCliente').val();
      var rua = $('#exibeClienteRua').val();
      var numero = $('#exibeClienteNumero').val();
      var telefone = $('#exibeFoneCliente').val();
      var dataNascimento = $('#exibeDataNascCliente').val();
      var cpf = $('#exibeCpfCliente').val();
      var sexo = $('input:radio[name=exibeSexoCliente]:checked').val();
      var preferenciaHorario = $('#exibePreferenciaHorario').val();
      var localTrabalho = $('#exibeLocalTrabalho').val();

      $.ajax({
        method: 'PUT',
        url: '/clientes/edit/' + idTemp,
        data:{
            nome: nome,
            endereco: { rua: rua,
                        numero: numero
                      },
            sexo: sexo,
            telefone: telefone,
            dataNascimento: dataNascimento,
            cpf: cpf,
            preferenciaHorario: preferenciaHorario,
            localTrabalho: localTrabalho
        }
      });
      location.reload();
      idTemp = null;
    });
});
