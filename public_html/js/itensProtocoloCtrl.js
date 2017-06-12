/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var operacao = "A"; //"A"=Adição; "E"=Edição
var indice_selecionado = -1; //Índice do itemProtocolo selecionado na lista
var tbItensProtocolo;
var itemTemp;

$(function () {

//    tbItensProtocolo = sessionStorage.getItem("tbItensProtocolo");// Recupera os dados armazenados
//    tbItensProtocolo = JSON.parse(tbItensProtocolo); // Converte string para objeto
    if (tbItensProtocolo == null) // Caso não haja conteúdo, iniciamos um vetor vazio
        tbItensProtocolo = [];
});

function AdicionarItemProtoco(codProtocolo) {

    var temp = $("#itemProtocolo").val();
    if (temp != "") {

        var select = document.getElementById("itemProtocolo");
        var itemSelecionado = select.options[select.selectedIndex].value;
        localizaItem(itemSelecionado);
        var codItemProtocolo = GerarIdItemProtocolo();
        if (document.getElementById("idProtocolo").value == "") {
        } else {
            codProtocolo = document.getElementById("idProtocolo").value;
        }

        var itemProtocolo = JSON.stringify({
            idItemProtocolo: codItemProtocolo,
            nome: itemTemp.nome,
            tipo: itemTemp.tipo,
            retorno: itemTemp.retorno
        });
        tbItensProtocolo.push(itemProtocolo);
        sessionStorage.setItem("tbItensProtocolo", JSON.stringify(tbItensProtocolo));
        ListarItensProtocolo(codProtocolo);
    } else {
        alert("Você deve Selecionar um Item para adicionar!");
    }
}


function localizaItem(idItem) {
    listItens.forEach(function (each) {
        if (each.idItem == idItem) {
            itemTemp = each;
        }
    });
}

function  getListaItensProtocolo() {

    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/clientes/getListaCLientes/" + empresa.idEmpresa,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            listClientes = data;
            if (data != null) {
                data.forEach(function (each) {
                    var cnpjTemp = each.cnpj;
                    var cnpj = cnpjTemp.substr(0, 2) + "." + cnpjTemp.substr(2, 3) + "." + cnpjTemp.substr(5, 3) + "/" + cnpjTemp.substr(8, 4) + "-" + cnpjTemp.substr(12, 2);

                    $("#tblListarClientes tbody").append("<tr class=\"active\">");
                    $("#tblListarClientes tbody").append("<td>" + each.idCliente + "</td>");
                    $("#tblListarClientes tbody").append("<td>" + cnpj + "</td>");
                    $("#tblListarClientes tbody").append("<td>" + each.nome + "</td>");
                    $("#tblListarClientes tbody").append("<td>" + each.cidade + "</td>");
                    $("#tblListarClientes tbody").append("<td> <button id=\"btn_clientes_Edit\" type=\"button\" class=\"btn btn-primary actionModal\" onclick=\"ExibirCliente(" + each.idCliente + ")\" title=\"Editar\"><span class=\"glyphicon glyphicon-pencil\"></span>\
                                             <button class=\"btn btn-primary\" onclick=\"ExcluirCliente(" + each.idCliente + ")\" title=\"Remover\"><span class=\"glyphicon glyphicon-remove\"></span></button></td>");
                    $("#tblListarClientes tbody").append("</tr>");
                });
            } else {

            }
        }
    });



}
//Limitaçao do GerarID() -> Sempre compara com o ID do ultimo cliente. Se o ultimo cliente for excluido, o ID sera re-usado.
// Nao devemos re-usar IDs
function GerarIdItemProtocolo() {
    var ultimoCod = -1;
    if (tbItensProtocolo.length == 0) {
        ultimoCod = 1;
    } else {
        var ultimoItemProtocolo = JSON.parse(tbItensProtocolo[tbItensProtocolo.length - 1]);
        ultimoCod = ultimoItemProtocolo.idItemProtocolo;
        ultimoCod++;
    }
    return ultimoCod;
}

function EditarCadastrarItemProtocolo() {
    if (document.getElementById("idItem").value == "") {
        AdicionarItemProtocolo();
    } else {
        EditarItemProtocolo(document.getElementById("idItem").value);
    }
}

function ExcluirItemProtocolo(id) {

    for (var i in tbItensProtocolo) {
        var itemProtocolo = JSON.parse(tbItensProtocolo[i]);
        if (itemProtocolo.idItemProtocolo == id) {
            tbItensProtocolo.splice(i, 1);
            sessionStorage.setItem("tbItensProtocolo", JSON.stringify(tbItensProtocolo));
            ListarItensProtocolo();
            break;
        }
    }
}

function ExcluirItemPorProtocolo(codProtocolo) {

    for (var i = 0; i < tbItensProtocolo.length; i++) {
        var itemProtocolo = JSON.parse(tbItensProtocolo[i]);
        if (itemProtocolo.codProtocolo == codProtocolo) {
            tbItensProtocolo.splice(i, 1);
            sessionStorage.setItem("tbItensProtocolo", JSON.stringify(tbItensProtocolo));
            i--;
        }
    }


}

function ExibirItemProtocolo(id) {
    for (var i in tbItensProtocolo) {
        var itemProtocolo = JSON.parse(tbItensProtocolo[i]);
        if (itemProtocolo.codigo == id) {
            $("#idItem").val(itemProtocolo.codigo);
            $("#nomeItem").val(itemProtocolo.nome);
            $("#tipo").val(itemProtocolo.tipo);
            $("#retorno").val(itemProtocolo.retorno);
            break;
        }
    }
}
function limparTabela() {
    document.getElementById("bodyItemProtocolo").innerHTML = "";
}

function ListarItensProtocolo() {
    $("#tblListarItensProtocolo").html("");
    $("#tblListarItensProtocolo").html(
            "<thead>" +
            "	<tr>" +
            "	<th>Código</th>" +
            "	<th>Nome</th>" +
            "	<th>Tipo</th>" +
            "	<th>Retornar?</th>" +
            "   <th>Ações</th>" +
            "	</tr>" +
            "</thead>" +
            "<tbody id=\"bodyItemProtocolo\">" +
            "</tbody>"

            );
    var cont;
    for (var i in tbItensProtocolo) {
            
            var itemProtocolo = JSON.parse(tbItensProtocolo[i]);
            $("#tblListarItensProtocolo tbody").append("<tr class=\"active\">");
            $("#tblListarItensProtocolo tbody").append("<td>" + itemProtocolo.idItemProtocolo + "</td>");
            $("#tblListarItensProtocolo tbody").append("<td>" + itemProtocolo.nome + "</td>");
            $("#tblListarItensProtocolo tbody").append("<td>" + itemProtocolo.tipo + "</td>");
            $("#tblListarItensProtocolo tbody").append("<td>" + itemProtocolo.retorno + "</td>");
            $("#tblListarItensProtocolo tbody").append("<td> </button> </button>\n\<button class=\"btn btn-primary\" onclick=\"ExcluirItemProtocolo(" + itemProtocolo.idItemProtocolo + ")\" title=\"Remover\"><span class=\"glyphicon glyphicon-remove\"></span></button></td>");
            $("#tblListarItensProtocolo tbody").append("</tr>");
        }
    }

function passarItensProtocoloRecibo(codProtocolo) {
    $("#tblListarItensRecibo").html("");
    $("#tblListarItensRecibo").html(
            "<thead align=\"center\">" +
            "	<tr>" +
            "	<th>Código</th>" +
            "	<th>Nome</th>" +
            "	<th>Tipo</th>" +
            "	<th>Retornar?</th>" +
            "	</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
            );
    for (var i in tbItensProtocolo) {
        var protTemp = JSON.parse(tbItensProtocolo[i]);
        var codProtTemp = protTemp.codProtocolo;
        if (codProtTemp == codProtocolo) {
            var itemProtocolo = JSON.parse(tbItensProtocolo[i]);
            $("#tblListarItensRecibo tbody").append("<tr class=\"active\">");
            $("#tblListarItensRecibo tbody").append("<td align=\"center\">" + itemProtocolo.codigo + "</td>");
            $("#tblListarItensRecibo tbody").append("<td>" + itemProtocolo.nome + "</td>");
            $("#tblListarItensRecibo tbody").append("<td>" + itemProtocolo.tipo + "</td>");
            $("#tblListarItensRecibo tbody").append("<td>" + itemProtocolo.retorno + "</td>");
            $("#tblListarItensRecibo tbody").append("</tr>");
        }
    }
}