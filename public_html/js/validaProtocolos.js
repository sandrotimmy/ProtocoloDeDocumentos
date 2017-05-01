$(document).ready(function() {
	//Desabilita submit do cadastro da empresa até todos os campos serem preenchidos
	var btn = document.getElementById('btnCadastrarEmp');
		$('#zipCodeEmpresa,#cnpjEmpresa,#nomeEmpresa,#addressEmpresa,#numberEmpresa,#districtEmpresa,#cityEmpresa').on('input', function() {
			btn.disabled = !$('#zipCodeEmpresa').val().match(/[0-9]{5}[-][0-9]{3}/) 
				|| !$('#cnpjEmpresa').val().match(/[0-9]{2}[\.][0-9]{3}[\.][0-9]{3}[\/][0-9]{4}[\-][0-9]{2}/) 
				|| $("#nomeEmpresa").val().length <= 0 || $("#addressEmpresa").val().length <= 0 
				|| $("#numberEmpresa").val().length <= 0 || $("#districtEmpresa").val().length <= 0
 				|| $("#cityEmpresa").val().length <= 0;
	});

	//Desabilita submit do cadastro de clientes até preencher campos de CNPJ e Nome
	var btn2 = document.getElementById('btnCadClient');
		$('#cnpjClient,#nomeClient').on('input', function() {
			btn2.disabled = !$('#cnpjClient').val().match(/[0-9]{2}[\.][0-9]{3}[\.][0-9]{3}[\/][0-9]{4}[\-][0-9]{2}/) 
				|| $("#nomeClient").val().length <= 0;
	});

	//Desabilita o submit do cadastro de itens até todos os campos serem preenchidos
	var btn3 = document.getElementById('btnCadItem');
		$('#nomeItem,#tipo,#retorno').on('input', function() {
			btn3.disabled = $("#nomeItem").val().length <= 0 || $('#tipo').val() == "" || $('#retorno').val() == "";
	});

	//Desabilita o submit do cadastro de protocolos até os campos data, cliente e item serem preenchidos
	var btn4 = document.getElementById('btnCadProtocol');
		$('#clienteProtocolo,#itemProtocolo').on('input', function() {
			btn4.disabled = $('#clienteProtocolo').val() == "" || $('#itemProtocolo').val() == "";
	});
});