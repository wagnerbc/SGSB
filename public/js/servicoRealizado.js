$(document).ready(function(){

	var listaServicos = new Array();
	var valorTotal;
	$('#btnAddServ').click(function(evt){
		
	  	var nome = $('#rsNomeServico').val();
	  	var valor = $('#rsValorServico').val();
	  	var funcionario = $('#rsNomeFuncionario').val();
	  	var produtoUtilizado = $('#rsProdutoUtilizado').val();
	  	
	  	var servico = {
	  					nomeServico: nome,
	  					valorServico: valor,
	  					nomeFuncionario: funcionario,
	  					produtoUtilizado: produtoUtilizado
					  	};
		listaServicos.push(servico);
		
		var valorTemp = $('#rsValorTotal').html();
		valorTotal = parseFloat(valorTemp) + parseFloat(valor);
		
		var soma = $('#rsValorTotal');
		soma.html(valorTotal.toString());
		$('#rsNomeServico').val("");
	  	$('#rsValorServico').val("");
	  	$('#rsNomeFuncionario').val("");
	  	$('#rsProdutoUtilizado').val("");
  	});

// captura os dados do cadastro de Clientes para serem armazenados
	$('#btnCadServReal').click(function(evt){
		var cliente = $('#rsNomeCliente').val();
    	var valorTotal = $('#rsValorTotal').html();
    	var data = $('#dataServico').val();

		$.ajax({
		  method: 'POST',
		  url: '/servicoRealizado',
		  data:{
		    cliente: cliente,
    		servicos: listaServicos,
		    valorTotal: valorTotal,
		    data: data
		  }
		});
		location.reload();
	});

	$('#rsValorServico').change(function(evt){
		var nomeServico = $('#rsNomeServico').val();
		var url = '/servicos/' + nomeServico;

		$.getJSON(url, function(servico){
			var valorMinimo = parseFloat(servico.valorMinimo);
			var valorMaximo = parseFloat(servico.valorMaximo);
			var valorServico = parseFloat($('#rsValorServico').val());

			if(valorServico < valorMinimo || valorServico > valorMaximo){
				alert("Valor Inválido\nValor mínimo: " + valorMinimo.toString() + "\nValor Máximo: " + valorMaximo.toString());
				$('#rsValorServico').val("");
			}
		});
	});

});

$(document).on("pagecreate", "#registrarServico", function() {
    $("#autocompleteCliSr").on("filterablebeforefilter", function (e, data){
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
                    html += '<li onclick="addCliente($(this).html())">' + val.nome + '</li>';
                });
                $ul.html(html);
                $ul.listview("refresh");
                $ul.trigger("updatelayout");
            });
        }
    });

	$("#autocompleteFuncSr").on("filterablebeforefilter", function (e, data){
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
                    html += '<li onclick="addFuncionario($(this).html())">' + val.nome + '</li>';
                });
                $ul.html(html);
                $ul.listview("refresh");
                $ul.trigger("updatelayout");
            });
        }
    });


	$("#autocompleteServ").on("filterablebeforefilter", function (e, data){
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
                    html += '<li onclick="addServico($(this).html())">' + val.nome + '</li>';
                });
                $ul.html(html);
                $ul.listview("refresh");
                $ul.trigger("updatelayout");
            });
        }
    });

	$("#autocompleteProdUtil").on("filterablebeforefilter", function (e, data){
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
                    html += '<li onclick="addProduto($(this).html())">' + val.nome + '</li>';
                });
                $ul.html(html);
                $ul.listview("refresh");
                $ul.trigger("updatelayout");
            });
        }
    });

});

addCliente = function(nome){
	$('#rsNomeCliente').val(nome);
	$('#autocompleteCliSr').html("");
}

addFuncionario = function(nome){
	$('#rsNomeFuncionario').val(nome);
	$('#autocompleteFuncSr').html("");
}

addServico = function(nome){
	$('#rsNomeServico').val(nome);
	$('#autocompleteServ').html("");
}

addProduto = function(nome){
	$('#rsProdutoUtilizado').val(nome);
	$('#autocompleteProdUtil').html("");
}