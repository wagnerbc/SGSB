$(document).ready(function(){
	$('#btnLogin').click(function(evt){
		var login = $('#acessoLogin').val();
		var senha = $('#acessoPassword').val();
		var url = '/login/' + login + '/' + senha;
		
		$.getJSON(url, function(acesso){
			if(acesso == "administrador"){
				window.location.href = "/#menu";
			}else{
				if(acesso == "comum"){
					window.location.href = "/#registrarServico";	
				}
			};
		});
	});
});