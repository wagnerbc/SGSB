$(document).ready(function(){
	$('#btnRelAgen').click(function(evt){
		var data = $('#raData').val();
		var url = "/buscaAgendamentos/" + data;
		$('#tabelaRelAgendamento').html("");

		$.getJSON(url, function(agendamentos){
			if(!agendamentos.length > 0){
				alert("Não existem Agendamentos para a data informada");
			}else{
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
									html: 	'<tr>' +
												'<th colspan="4">Agendamentos do dia ' + data + '</th>' +
											'</tr>' +
											'<tr class="ui-bar-d">' +
										      '<th data-priority="1">Hora</th>' +
										      '<th data-priority="2">Cliente</th>'+ 
										      '<th data-priority="3">Serviço</th>' + 
										      '<th data-priority="4">Funcionário</th>' +
										    '</tr>',
										}).appendTo('#tabelaRelAgendamento');
				
				var $tbody = $('<tbody/>').appendTo('#tabelaRelAgendamento');
				
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


	$('#btnRelAniv').click(function(evt){
		var dataIn = $('#ranData').val();
		var url = '/aniversariantes/' + dataIn;


		$.getJSON(url, function(aniversariantes){
			if(!aniversariantes.length > 0){
				alert("Não existem aniversariantes para a data informada");
			}else{				
				var $thead = $('<thead/>', {
									html: 	'<tr>' +
												'<th colspan="4">Aniversariantes do dia ' + formataData(dataIn) + '</th>' +
											'</tr>' +
											'<tr class="ui-bar-d">' +
										      '<th data-priority="1">Nome</th>'+ 
										      '<th data-priority="2">Telefone</th>' + 
										      '<th data-priority="3">Tipo</th>' +
										    '</tr>',
										}).appendTo('#tabelaRelAniversariantes');
				
				var $tbody = $('<tbody/>').appendTo('#tabelaRelAniversariantes');
				
				for (var i = 0; i < aniversariantes.length; i++) {
					var $tr = $("<tr/>").appendTo($tbody);
					var $td2 = $("<td/>").html(aniversariantes[i].nome).appendTo($tr);
					var $td3 = $("<td/>").html(aniversariantes[i].telefone).appendTo($tr);
					var $td4 = $("<td/>").html(aniversariantes[i].tipo).appendTo($tr);
				};
			}
		});
	});

	var formataData = function formataData(data) {
		function pad(s) { 
			return (s < 10) ? '0' + s : s;
		}
		var d = new Date(data);
		return [pad(d.getDate()+1), pad(d.getMonth()+1), d.getFullYear()].join('/');
	}

	$('#btnRelAtendFunc').click(function(evt){
		var dataAtend = $('#rafData').val();
		var funcionarioAtend = $('#rafFuncionario').val();
		var url = '/atendimentos/' + funcionarioAtend + '/' + dataAtend;


		$.getJSON(url, function(atendimentos){
			if(!atendimentos.length > 0){
				alert("Não existem atendimentos para o funcionário na data informada");
			}else{
				var $thead = $('<thead/>', {
									html: 	'<tr>' +
												'<th colspan="3">Atendimentos do dia ' + formataData(dataAtend) + ' - Funcionário: ' + funcionarioAtend + '</th>' +
											'</tr>' +
											'<tr class="ui-bar-d">' +
										      '<th data-priority="1">Cliente</th>'+ 
										      '<th data-priority="2">Serviço Realizado</th>' + 
										      '<th data-priority="3">Valor</th>' +
										    '</tr>'
										}).appendTo('#tabelaRelAtendFunc');
				
				var $tbody = $('<tbody/>').appendTo('#tabelaRelAtendFunc');
				
				var total = 0;
				for (var i = 0; i < atendimentos.length; i++) {
					var $tr = $("<tr/>").appendTo($tbody);
					var $td2 = $("<td/>").html(atendimentos[i].cliente).appendTo($tr);
					var $td3 = $("<td/>").html(atendimentos[i].servico).appendTo($tr);
					var $td4 = $("<td/>").html(atendimentos[i].valor).appendTo($tr);

					total = parseFloat(atendimentos[i].valor) + parseFloat(total);
				};

				var $trTotal = $('<tr/>', {
									class: 'rodape',
									html: 	'<td colspan="2">Total</td>' +
											'<td>' + total + '</td>'
				});
				$trTotal.appendTo($tbody);
			}
		});
	});


	$('#btnRelAtendGeral').click(function(evt){
		var dataAtend = $('#ragData').val();
		var url = '/atendimentosGeral/' + dataAtend;


		$.getJSON(url, function(atendimentos){
			if(!atendimentos.length > 0){
				alert("Não existem atendimentos para a data informada");
			}else{
				var $thead = $('<thead/>', {
									html: 	'<tr>' +
												'<th colspan="4">Atendimentos do dia ' + formataData(dataAtend) + '</th>' +
											'</tr>' +
											'<tr class="ui-bar-d">' +
										        '<th data-priority="1">Cliente</th>'+ 
										        '<th data-priority="2">Serviço Realizado</th>' +
										 		'<th data-priority="3">Funcionário</th>' +
										        '<th data-priority="4">Valor</th>' +
										    '</tr>'
										}).appendTo('#tabelaRelAtendGeral');
				
				var $tbody = $('<tbody/>').appendTo('#tabelaRelAtendGeral');
				
				var total = 0;
				for (var i = 0; i < atendimentos.length; i++) {
					var $tr = $("<tr/>").appendTo($tbody);
					var $td1 = $("<td/>").html(atendimentos[i].cliente).appendTo($tr);
					var $td2 = $("<td/>").html(atendimentos[i].servico).appendTo($tr);
					var $td3 = $("<td/>").html(atendimentos[i].funcionario).appendTo($tr);
					var $td4 = $("<td/>").html(atendimentos[i].valor).appendTo($tr);

					total = parseFloat(atendimentos[i].valor) + parseFloat(total);
				};

				var $trTotal = $('<tr/>', {
									class: 'rodape',
									html: 	'<td colspan="3">Total</td>' +
											'<td>' + total + '</td>'
				});
				$trTotal.appendTo($tbody);
			}
		});
	});

});

$(document).on("pagecreate", "#relatorioAtendimentosFuncionario", function() {
	$("#autocompleteRafFuncionario").on("filterablebeforefilter", function (e, data){
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
                    html += '<li onclick="addFunc($(this).html())">' + val.nome + '</li>';
                });
                $ul.html(html);
                $ul.listview("refresh");
                $ul.trigger("updatelayout");
            });
        }
    });
});
var addFunc = function(nome){
	$('#rafFuncionario').val(nome);
	$('#autocompleteRafFuncionario').html("");
}