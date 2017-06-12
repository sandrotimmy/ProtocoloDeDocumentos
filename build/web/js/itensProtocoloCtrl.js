

var indice_selecionado = -1; //Índice do itemProtocolo selecionado na lista
var tbItensProtocolo;
var tbItensExcluir
var itemTemp;

$(function () {
    tbItensProtocolo = [];
    tbItensExcluir = [];
});

function AdicionarItemProtoco() {

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
        ListarItensProtocoloPersist($("#idProtocolo").val());
        ListarItensProtocolo();
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

//Gerado somente durante o cadastro do protocolo, depos ele não tem validade, valendo o codigo gerado pelo banco
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
            ListarItensProtocoloPersist($("#idProtocolo").val());
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
            ListarItensProtocoloPersist($("#idProtocolo").val());
            ListarItensProtocolo();
        }
    }
}

function ExcluirItemProtocoloPersist(codItemProtocolo) {
    var dataJson = JSON.stringify({
        idItemProtocolo: codItemProtocolo
    });
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/itemProtocolo/excluir",
        contentType: "application/json; charset=utf-8",
        data: dataJson,
        dataType: "json",
        async: false,
        success: function (data) {
            if (data == true) {
                alert("Item excluído com sucesso!");
                ListarProtocolos();
            } else {
                alert("Ocorreu um erro, Protocolo não Excluído!");
            }
        }
    });
    ListarItensProtocoloPersist($("#idProtocolo").val());
    ListarItensProtocolo();
}
//Carregar os clientes na comboBox para seleção no protocolo
function preencherComboItens() {
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/itens/getListaItens/" + empresa.idEmpresa,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            listItens = data;
            var select = document.getElementById("itemProtocolo");
            if (listItens != null) {
                if (select.length <= 1) {
                    listItens.forEach(function (each) {
                        var opt = each.nome;
                        var val = each.idItem;
                        var el = document.createElement("option");
                        el.textContent = opt;
                        el.value = val;
                        select.appendChild(el);
                    });
                }
            }
        }
    });
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
            "	<th>Sequencia</th>" +
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
function ListarItensProtocoloPersist(codProtocolo) {
    $("#tblListarItensProtocolo").html("");
    $("#tblListarItensProtocolo").html(
            "<thead>" +
            "	<tr>" +
            "	<th>Sequencia</th>" +
            "	<th>Nome</th>" +
            "	<th>Tipo</th>" +
            "	<th>Retornar?</th>" +
            "   <th>Ações</th>" +
            "	</tr>" +
            "</thead>" +
            "<tbody id=\"bodyItemProtocolo\">" +
            "</tbody>"

            );
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/itensProtocolos/getListaItensProtocolos/" + codProtocolo,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            if (data != null) {
                data.forEach(function (each) {
                    $("#tblListarItensProtocolo tbody").append("<tr class=\"active\">");
                    $("#tblListarItensProtocolo tbody").append("<td>" + each.idItem + "</td>");
                    $("#tblListarItensProtocolo tbody").append("<td>" + each.nome + "</td>");
                    $("#tblListarItensProtocolo tbody").append("<td>" + each.tipo + "</td>");
                    $("#tblListarItensProtocolo tbody").append("<td>" + each.retorno + "</td>");
                    $("#tblListarItensProtocolo tbody").append("<td> </button> </button>\n\<button class=\"btn btn-primary\" onclick=\"ExcluirItemProtocoloPersist(" + each.idItem + ")\" title=\"Remover\"><span class=\"glyphicon glyphicon-remove\"></span></button></td>");
                    $("#tblListarItensProtocolo tbody").append("</tr>");
                });
            }
        }
    });


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
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/itensProtocolos/getListaItensProtocolos/" + codProtocolo,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            listProtocolos = data;
            if (data != null) {
                data.forEach(function (each) {
                    $("#tblListarItensRecibo tbody").append("<tr class=\"active\">");
                    $("#tblListarItensRecibo tbody").append("<td align=\"center\">" + each.idItem + "</td>");
                    $("#tblListarItensRecibo tbody").append("<td>" + each.nome + "</td>");
                    $("#tblListarItensRecibo tbody").append("<td>" + each.tipo + "</td>");
                    $("#tblListarItensRecibo tbody").append("<td>" + each.retorno + "</td>");
                    $("#tblListarItensRecibo tbody").append("</tr>");
                });
            }
        }
    });
//    for (var i in tbItensProtocolo) {
//        var protTemp = JSON.parse(tbItensProtocolo[i]);
//        var codProtTemp = protTemp.codProtocolo;
//        if (codProtTemp == codProtocolo) {
//            var itemProtocolo = JSON.parse(tbItensProtocolo[i]);
//
//        }
//    }
}