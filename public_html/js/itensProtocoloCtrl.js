/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var operacao = "A"; //"A"=Adição; "E"=Edição
var indice_selecionado = -1; //Índice do itemProtocolo selecionado na lista
var tbItensProtocolo;

$(function () {

    tbItensProtocolo = localStorage.getItem("tbItensProtocolo");// Recupera os dados armazenados
    tbItensProtocolo = JSON.parse(tbItensProtocolo); // Converte string para objeto
    if (tbItensProtocolo == null) // Caso não haja conteúdo, iniciamos um vetor vazio
        tbItensProtocolo = [];
});

function AdicionarItemProtocolo() {
    var select = document.getElementById("itemProtocolo");
    var itemSelecionado = select.options[select.selectedIndex].value;
    var item = localizaItem(itemSelecionado);
    var codItemProtocolo = GerarIdItemProtocolo();
    var codProtocolo = GerarIdProtocolo();
    var itemProtocolo = JSON.stringify({
        codigo: codItemProtocolo,
        codProtocolo: codProtocolo,
        nome: item.nome,
        tipo: item.tipo,
        retorno: item.retorno
    });
    tbItensProtocolo.push(itemProtocolo);
    localStorage.setItem("tbItensProtocolo", JSON.stringify(tbItensProtocolo));
    ListarItensProtocolo(codProtocolo);
}

//Limitaçao do GerarID() -> Sempre compara com o ID do ultimo cliente. Se o ultimo cliente for excluido, o ID sera re-usado.
// Nao devemos re-usar IDs
function GerarIdItemProtocolo() {
    var ultimoCod = -1;
    if (tbItensProtocolo.length == 0) {
        ultimoCod = 1;
    } else {
        var ultimoItemProtocolo = JSON.parse(tbItensProtocolo[tbItensProtocolo.length - 1]);
        ultimoCod = ultimoItemProtocolo.codigo;
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

        if (itemProtocolo.codigo == id) {
            tbItensProtocolo.splice(i, 1);
            localStorage.setItem("tbItensProtocolo", JSON.stringify(tbItensProtocolo));
            ListarItensProtocolo();
        }
    }
}

function ExcluirItemPorProtocolo(codProtocolo) {

    for (var i = 0; i < tbItensProtocolo.length; i++) {
        var itemProtocolo = JSON.parse(tbItensProtocolo[i]);
        if (itemProtocolo.codProtocolo == codProtocolo) {
            tbItensProtocolo.splice(i, 1);
            localStorage.setItem("tbItensProtocolo", JSON.stringify(tbItensProtocolo));
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

function ListarItensProtocolo(codProtocolo) {
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
    for (var i in tbItensProtocolo) {
        var protTemp = JSON.parse(tbItensProtocolo[i]);
        var codProtTemp = protTemp.codProtocolo;
        if (codProtTemp == codProtocolo) {
            var itemProtocolo = JSON.parse(tbItensProtocolo[i]);
            $("#tblListarItensProtocolo tbody").append("<tr class=\"active\">");
            $("#tblListarItensProtocolo tbody").append("<td>" + itemProtocolo.codigo + "</td>");
            $("#tblListarItensProtocolo tbody").append("<td>" + itemProtocolo.nome + "</td>");
            $("#tblListarItensProtocolo tbody").append("<td>" + itemProtocolo.tipo + "</td>");
            $("#tblListarItensProtocolo tbody").append("<td>" + itemProtocolo.retorno + "</td>");
            $("#tblListarItensProtocolo tbody").append("<td> </button> </button>\n\<button class=\"btn btn-primary\" onclick=\"ExcluirItemProtocolo(" + itemProtocolo.codigo + ")\" title=\"Remover\"><span class=\"glyphicon glyphicon-remove\"></span></button></td>");
            $("#tblListarItensProtocolo tbody").append("</tr>");
        }
    }
}

function passarItensProtocoloRecibo(codProtocolo) {
    $("#tblListarItensRecibo").html("");
    $("#tblListarItensRecibo").html(
            "<thead>" +
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
            $("#tblListarItensRecibo tbody").append("<td>" + itemProtocolo.codigo + "</td>");
            $("#tblListarItensRecibo tbody").append("<td>" + itemProtocolo.nome + "</td>");
            $("#tblListarItensRecibo tbody").append("<td>" + itemProtocolo.tipo + "</td>");
            $("#tblListarItensRecibo tbody").append("<td>" + itemProtocolo.retorno + "</td>");
            $("#tblListarItensRecibo tbody").append("</tr>");
        }
    }
}