$(document).ready(function(){


// captura os dados do cadastro de Clientes para serem armazenados
  $('#btnCadServ').click(function(evt){
    var nome = $('#inputNomeServico').val();
    var valorMinimo = $('#valorMinimo').val();
    var valorMaximo = $('#valorMaximo').val();
    
    $.ajax({
      method: 'POST',
      url: '/servico',
      data:{
        nome: nome,
        valorMinimo: valorMinimo,
        valorMaximo: valorMaximo
      }
    });
    location.reload();
  });
});

$(document).on("pagecreate", "#buscarServico", function() {
    $("#autocomplete-serv").on("filterablebeforefilter", function (e, data){
        var $ul = $(this),
            $input = $(data.input),
            value = $input.val(),
            html = "";
        $ul.html("");
        if (value && value.length > 2){
            $ul.html("<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
            $ul.listview("refresh");
            $.ajax({
                url: "/buscaServico",
                method: "get",
                dataType: "json",
                crossDomain: true,
                data: {
                    q: $input.val()
                }
            })
            .then(function (res) {
                $.each(res, function(i, val) {
                    html += '<li><a href="#exibirServico" onclick="exibeServico($(this).html())">' + val.nome + '</a></li>';
                });
                $ul.html(html);
                $ul.listview("refresh");
                $ul.trigger("updatelayout");
            });
        }
    });

    var idTemp;

    exibeServico = function exibeServico(nome){
      var url = '/servicos/' + nome;

      $.getJSON(url, function(servico){
        idTemp = servico._id;

        $('#exibeNomeServico').val(servico.nome);
        $('#exibeValorMinimo').val(servico.valorMinimo);
        $('#exibeValorMaximo').val(servico.valorMaximo);
      });
    }

    $('#btnExcluirServ').click(function(){
      $.ajax({
        method: 'delete',
        url: '/servicos/remove/' + idTemp
      });
      location.reload();
      idTemp = null;
    });


    $('#btnAlterarServ').click(function(evt){
      var nome = $('#exibeNomeServico').val();
      var valorMinimo = $('#exibeValorMinimo').val();
      var valorMaximo = $('#exibeValorMaximo').val();

      $.ajax({
        method: 'PUT',
        url: '/servicos/edit/' + idTemp,
        data:{
            nome: nome,
            valorMinimo: valorMinimo,
            valorMaximo: valorMaximo
        }
      });
      location.reload();
      idTemp = null;
    });
});