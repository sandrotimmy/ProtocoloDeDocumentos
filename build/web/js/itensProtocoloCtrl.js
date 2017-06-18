
var tbItensProtocolo;
var itemTemp;

$(function () {
    tbItensProtocolo = [];
});
//Adiciona os itensProtocolo em uma lista temporária que será persistida após 
//a gravação do protocolo
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
        ListarItensProtocolo();
    } else {
        alert("Você deve Selecionar um item para adicionar!");
    }
}
//Exclui item protocolo da lista antes da persistencia
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
//Localiza o Item selecionado na lista para adicionar no protocolo
function localizaItem(idItem) {
    listItens.forEach(function (each) {
        if (each.idItem == idItem) {
            itemTemp = each;
        }
    });
}

//Gerado somente durante o cadastro do protocolo, depos ele não tem validade,
// valendo o codigo gerado pelo banco
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

//limpa a combobox de itens para popular com dados novos
function removeOptionsItens(selectbox) {
    for (var i = 1; i < selectbox.options.length; i++) {
        selectbox.remove(i);
    }
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
            removeOptionsItens(select);
            listItens.forEach(function (each) {
                var opt = each.nome;
                var val = each.idItem;
                var el = document.createElement("option");
                el.textContent = opt;
                el.value = val;
                select.appendChild(el);
            });
        }
    });
}

function limparTabela() {
    if (document.getElementById("bodyItemProtocolo") != null) {
        document.getElementById("bodyItemProtocolo").innerHTML = "";
    }
}
//Lista os Itens protocolo que ainda não foram Persistidos
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
//Lista os Itens protocolo que foram Persistidos
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
//Passa os ItensProtocolos cadastrados para o Recibo
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
}