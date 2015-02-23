$(document).ready(function(){


	$('#btnAgend').click(function(evt){
		var data = $('#dataAgendamento').val();
    	var hora = $('#horaAgendamento').val();
    	var cliente = $('#clienteAgendamento').val();
    	var servicoAgendado = $('#servicoAgendado').val();
    	var funcionario = $('#funcionarioAgendamento').val();

		$.ajax({
		  method: 'POST',
		  url: '/agendamento',
		  data:{
		    data: data,
    		hora: hora,
    		cliente: cliente,
    		servicoAgendado: servicoAgendado,
    		funcionario: funcionario
		  }
		});
		location.reload();
	});

	$('#dataAgendamento').change(function(evt){
		var data = $('#dataAgendamento').val();
		var url = "/buscaAgendamentos/" + data;
		
		$('#movie-table-custom').html("");

		$.getJSON(url, function(agendamentos){


			if(agendamentos.length > 0){
				agendamentos = agendamentos.sort(function (a, b) {
										  if (a.hora > b.hora) {
										    return 1;
										  }
										  if (a.hora < b.hora) {
										    return -1;
										  }
										  return 0;
										});
				

				var $thead = $('<thead/>', {
									html: 	'<tr class="ui-bar-d">' +
										      '<th data-priority="1">Hora</th>' +
										      '<th data-priority="2">Cliente</th>'+ 
										      '<th data-priority="3">Serviço</th>' + 
										      '<th data-priority="4">Funcionário</th>' +
										    '</tr>'
										}).appendTo('#movie-table-custom');
				
				var $tbody = $('<tbody/>').appendTo('#movie-table-custom');
				
				for (var i = 0; i < agendamentos.length; i++) {
					var $tr = $("<tr/>").appendTo($tbody);
					var $td1 = $("<td/>").html(agendamentos[i].hora).appendTo($tr);
					var $td2 = $("<td/>").html(agendamentos[i].cliente).appendTo($tr);
					var $td3 = $("<td/>").html(agendamentos[i].servicoAgendado).appendTo($tr);
					var $td4 = $("<td/>").html(agendamentos[i].funcionario).appendTo($tr);
				};
			}
		});
	});
});
$(document).on("pagecreate", "#agendamento", function() {
    $("#autocompleteAgendamento").on("filterablebeforefilter", function (e, data){
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
                    html += '<li onclick="preencheCliente($(this).html())">' + val.nome + '</li>';
                });
                $ul.html(html);
                $ul.listview("refresh");
                $ul.trigger("updatelayout");
            });
        }
    });

	$("#autocompleteFuncionario").on("filterablebeforefilter", function (e, data){
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
                    html += '<li onclick="preencheFuncionario($(this).html())">' + val.nome + '</li>';
                });
                $ul.html(html);
                $ul.listview("refresh");
                $ul.trigger("updatelayout");
            });
        }
    });

	$("#autocompleteAgendServ").on("filterablebeforefilter", function (e, data){
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
                    html += '<li><span class="nomeServico">' + val.nome + '</span><span class="span">Valor Mínimo: R$ ' +
								 val.valorMinimo + '</span><span class="span">Valor Máximo: R$ ' + 
								 val.valorMaximo + '</span></li>';
                });
                $ul.html(html);
                $ul.listview("refresh");
                $ul.trigger("updatelayout");
            });
        }
    });


});

preencheCliente = function(nome){
	$('#clienteAgendamento').val(nome);
	$('#autocompleteAgendamento').html("");
}

preencheFuncionario = function(nome){
	$('#funcionarioAgendamento').val(nome);
	$('#autocompleteFuncionario').html("");
}