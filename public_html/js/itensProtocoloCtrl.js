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

    var cod = GerarIdItemProtocolo();
    var itemProtocolo = JSON.stringify({
        codigo: cod,
        codProtocolo: $("#idProtocolo").val(),
        nome: $("#nomeItem").val(),
        tipo: $("#tipo").val(),
        retorno: $("#retorno").val()
    });
    tbItensProtocolo.push(itemProtocolo);
    localStorage.setItem("tbItensProtocolo", JSON.stringify(tbItensProtocolo));
    alert("ItemProtocolo " + cod + " Cadastrado com Sucesso!");
    ListarItensProtocolo();
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

function EditarItemProtocolo(id) {

    for (var i in tbItensProtocolo) {
        var itemProtocolo = JSON.parse(tbItensProtocolo[i]);
        if (itemProtocolo.codigo.toString() == id) {
            indice_selecionado = i;
        }
    }
    tbItensProtocolo[indice_selecionado] = JSON.stringify({
        codigo: $("#idItem").val(),
        nome: $("#nomeItem").val(),
        tipo: $("#tipo").val(),
        retorno: $("#retorno").val()
    });
    localStorage.setItemProtocolo("tbItensProtocolo", JSON.stringify(tbItensProtocolo));
    alert("Informações editadas.");
    operacao = "A"; //Volta ao padrão
    ListarItensProtocolo();
}

function ExcluirItemProtocolo(id) {

    for (var i in tbItensProtocolo) {
        var itemProtocolo = JSON.parse(tbItensProtocolo[i]);

        if (itemProtocolo.codigo == id) {
            tbItensProtocolo.splice(i, 1);
            localStorage.setItem("tbItensProtocolo", JSON.stringify(tbItensProtocolo));
            alert("Registro excluídoo.");
            ListarItensProtocolo();
        }
    }
}

function ExibirItemProtocolo(id) {
    for (var i in tbItensProtocolo) {
        var itemProtocolo = JSON.parse(tbItensProtocolo[i]);
        if (itemProtocolo.codigo == id) {
            $("#idItem").val(itemProtocolo.codigo);
            $("#nomeItem").val(itemProtocolo.nome);
            $("#tipo").val(item.tipo);
            $("#retorno").val(itemProtocolo.retorno);
            break;
        }
    }
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
            "<tbody>" +
            "</tbody>"
            );
    for (var i in tbItensProtocolo) {
        var itemProtocolo = JSON.parse(tbItensProtocolo[i]);
        $("#tblListarItensProtocolo tbody").append("<tr class=\"active\">");
        $("#tblListarItensProtocolo tbody").append("<td>" + itemProtocolo.codigo + "</td>");
        $("#tblListarItensProtocolo tbody").append("<td>" + itemProtocolo.nome + "</td>");
        $("#tblListarItensProtocolo tbody").append("<td>" + itemProtocolo.tipo + "</td>");
        $("#tblListarItensProtocolo tbody").append("<td>" + itemProtocolo.retorno + "</td>");
        $("#tblListarItensProtocolo tbody").append("<td> <button id=\"btn_itensProtocolo_Edit\" type=\"button\" class=\"btn btn-primary\" onclick=\"ExibirItemProtocolo(" + itemProtocolo.codigo + ")\"><span class=\"glyphicon glyphicon-pencil\"></span></button> </button>\n\
                                             <button class=\"btn btn-primary\" onclick=\"ExcluirItemProtocolo(" + itemProtocolo.codigo + ")\" title=\"Remover\"><span class=\"glyphicon glyphicon-remove\"></span></button></td>");
        // $("#tblListarClientes tbody").append("<td><button class=\"btn btn-primary\" onclick=\"eliminar()\" title=\"Remover\"><span class=\"glyphicon glyphicon-remove\"></span></button></td");     

        $("#tblListarItensProtocolo tbody").append("</tr>");
    }
}

