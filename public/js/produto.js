$(document).ready(function(){

// captura os dados do cadastro de produtos para serem armazenados
  $('#btnCadProd').click(function(evt){
    console.log("entrou");
    var nome = $('#inputNomeProduto').val();
    var validade = $('#validade').val();
    var quantidade = $('#quantidade').val();
    var valor = $('#valorProduto').val();
    
    $.ajax({
      method: 'POST',
      url: '/produto',
      data:{
        nome: nome,
        validade: validade,
        quantidade: quantidade,
        valor: valor
      }
    });
    location.reload();
  });
});

$(document).on("pagecreate", "#buscarProduto", function() {
    $("#autocomplete-prod").on("filterablebeforefilter", function (e, data){
        var $ul = $(this),
            $input = $(data.input),
            value = $input.val(),
            html = "";
        $ul.html("");
        if (value && value.length > 2){
            $ul.html("<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
            $ul.listview("refresh");
            $.ajax({
                url: "/buscaProduto",
                method: "get",
                dataType: "json",
                crossDomain: true,
                data: {
                    q: $input.val()
                }
            })
            .then(function (res) {
                $.each(res, function(i, val) {
                    html += '<li><a href="#exibirProduto" onclick="exibeProduto($(this).html())">' + val.nome + '</a></li>';
                });
                $ul.html(html);
                $ul.listview("refresh");
                $ul.trigger("updatelayout");
            });
        }
    });

    var idTemp;

    exibeProduto = function exibeProduto(nome){
      var url = '/produtos/' + nome;

      $.getJSON(url, function(produto){
        idTemp = produto._id;
       
        $('#exibeNomeProduto').val(produto.nome);
        $('#exibeValidade').val(produto.validade);
        $('#exibeQuantidade').val(produto.quantidade);
        $('#exibeValorProduto').val(produto.valor);
      });
    }

    $('#btnExcluirProd').click(function(){
      $.ajax({
        method: 'delete',
        url: '/produtos/remove/' + idTemp
      });
      location.reload();
      idTemp = null;
    });


    $('#btnAlterarProd').click(function(evt){
      var nome = $('#exibeNomeProduto').val();
      var validade = $('#exibeValidade').val();
      var quantidade = $('#exibeQuantidade').val();
      var valor = $('#exibeValorProduto').val();

      $.ajax({
        method: 'PUT',
        url: '/produtos/edit/' + idTemp,
        data:{
            nome: nome,
            validade: validade,
            quantidade: quantidade,
            valor: valor
        }
      });
      location.reload();
      idTemp = null;
    });
});
