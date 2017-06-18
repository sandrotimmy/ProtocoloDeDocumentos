
var clienteSelect;
var listProtocolos;

//Adiciona Protocolo
function AdicionarProtocolo() {
    var select = document.getElementById("clienteProtocolo");//Seleciona o Cliente
    var codCliente = select.options[select.selectedIndex].value;//obtem o Index

    getCliente(codCliente);//localiza o Cliente na lista

    var dataJson = JSON.stringify({
        data: $("#dataProtocolo").val(),
        observacoes: $("#observacoes").val(),
        empresaProtocolo: empresa,
        clienteProtocolo: clienteSelect,
        listaItensProtocolo: tbItensProtocolo
    });
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/protocolos/cadastrar",
        contentType: "application/json; charset=utf-8",
        data: dataJson,
        dataType: "json",
        async: false,
        success: function (data) {
            alert("Protocolo Cadastrado com sucesso!");
            ListarProtocolos();
            tbItensProtocolo = [];
            sessionStorage.setItem("tbItensProtocolo", JSON.stringify(tbItensProtocolo));
            var idTemp = data.idProtocolo;
            enviaDadosRecibo(idTemp);
            limparTabela();
        }, error() {
            alert("Erro ao processar a requisição ");
        }
    });
}
//Localiza o Cliente persistido
function getCliente(codCliente) {
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/clientes/getCliente/" + codCliente,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            if (data != null) {
                clienteSelect = data;
            } else {
                alert("Cliente não encontrado!");
            }
        }
    });
}
//Envia os dados para a emissão do Recibo
function enviaDadosRecibo(codProtocolo) {
    gerarRecibo(codProtocolo);
}

function EditarCadastrarProtocolo() {
    if (document.getElementById("idProtocolo").value == "") {
        AdicionarProtocolo();
    } else {
        EditarProtocolo(document.getElementById("idProtocolo").value);
    }
}

function ExcluirProtocolo(id) {

    var dataJson = JSON.stringify({
        idProtocolo: id});
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/protocolo/excluir",
        contentType: "application/json; charset=utf-8",
        data: dataJson,
        dataType: "json",
        async: false,
        success: function (data) {
            if (data == true) {
                alert("Protocolo excluído com sucesso!");
                ListarProtocolos();
            } else {
                alert("Ocorreu um erro, Protocolo não Excluído!");
            }
        }
    });
}
//Limpa a lista de Itens se o usuario cancelar o cadastro de protocolo
function ExcluirItensCancelar() {
        tbItensProtocolo = [];
        sessionStorage.setItem("tbItensProtocolo", JSON.stringify(tbItensProtocolo));
}
////
//function SeletorCliente(codCliente) {
//    var select = document.getElementById("clienteProtocolo");
//    for (var i = 0; i < select.options.length; i++) {
//        if (select.options[i].value == codCliente) {
//            select.options[i].selected = "true";
//            break;
//        }
//    }
//}

////exibe protocolo no modal
//function ExibirProtocolo(id) {
//
//    $.ajax({
//        type: "POST",
//        url: "webresources/WSProtocoloRest/protocolo/getProtocolo/" + id,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        async: false,
//        success: function (data) {
//            if (data != null) {
//                $("#idProtocolo").val(data.idProtocolo);
//                $("#dataProtocolo").val(data.data);
//                SeletorCliente(data.clienteProtocolo.idCliente);
//                $("#observacoes").val(data.observacoes);
//                codProtocolo = data.idProtocolo;
//                ListarItensProtocoloPersist(codProtocolo);
//            }
//        }
//    });
//}
//lista protocolos cadastrados
function ListarProtocolos() {
    $("#tblListarProtocolos").html("");
    $("#tblListarProtocolos").html(
            "<thead>" +
            "	<tr>" +
            "	<th>Código</th>" +
            "	<th>Data</th>" +
            "	<th>Cliente</th>" +
            "	<th>Observações</th>" +
            "	<th>Ações</th>" +
            "	</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
            );
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/protocolos/getListaProtocolos/" + empresa.idEmpresa,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            listProtocolos = data;
            if (data != null) {
                data.forEach(function (each) {
                    $("#tblListarProtocolos tbody").append("<tr class=\"active\">");
                    $("#tblListarProtocolos tbody").append("<td>" + each.idProtocolo + "</td>");
                    $("#tblListarProtocolos tbody").append("<td>" + each.data + "</td>");
                    $("#tblListarProtocolos tbody").append("<td>" + each.clienteProtocolo.nome + "</td>");
                    $("#tblListarProtocolos tbody").append("<td>" + each.observacoes + "</td>");
                    $("#tblListarProtocolos tbody").append("<td> \n\
                                             <button class=\"btn btn-primary\" onclick=\"enviaDadosRecibo(" + each.idProtocolo + ")\" title=\"Recibo\"><span class=\"glyphicon glyphicon-search\"></span>\
                                            <button class=\"btn btn-primary\" onclick=\"ExcluirProtocolo(" + each.idProtocolo + ")\" title=\"Remover\"><span class=\"glyphicon glyphicon-remove\"></span>\</td>");
                    $("#tblListarProtocolos tbody").append("</tr>");
                });
            }
        }
    });
}





