/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var operacao = "A"; //"A"=Adição; "E"=Edição
var indice_selecionado = -1; //Índice do item selecionado na lista
var tbItens;

$(function () {

    tbItens = localStorage.getItem("tbItens");// Recupera os dados armazenados
    tbItens = JSON.parse(tbItens); // Converte string para objeto
    if (tbItens == null) // Caso não haja conteúdo, iniciamos um vetor vazio
        tbItens = [];
});
function AdicionarItem() {

    var cod = GerarIdItem();
    var item = JSON.stringify({
        codigo: cod,
        nome: $("#nomeItem").val(),
        tipo: $("#tipo").val(),
        retorno: $("#retorno").val()
    });
    tbItens.push(item);
    localStorage.setItem("tbItens", JSON.stringify(tbItens));
    alert("Item " + cod + " Cadastrado com Sucesso!");
    ListarItens();
}

//Limitaçao do GerarID() -> Sempre compara com o ID do ultimo cliente. Se o ultimo cliente for excluido, o ID sera re-usado.
// Nao devemos re-usar IDs
function GerarIdItem() {
    var ultimoCod = -1;
    if (tbItens.length == 0) {
        ultimoCod = 1;
    } else {
        var ultimoItem = JSON.parse(tbItens[tbItens.length - 1]);
        ultimoCod = ultimoItem.codigo;
        ultimoCod++;
    }
    return ultimoCod;
}

function EditarCadastrarItem() {
    if (document.getElementById("idItem").value == "") {
        AdicionarItem();
    } else {
        EditarItem(document.getElementById("idItem").value);
    }
}

function EditarItem(id) {

    for (var i in tbItens) {
        var item = JSON.parse(tbItens[i]);
        if (item.codigo.toString() == id) {
            indice_selecionado = i;
        }
    }
    tbItens[indice_selecionado] = JSON.stringify({
        codigo: $("#idItem").val(),
        nome: $("#nomeItem").val(),
        tipo: $("#tipo").val(),
        retorno: $("#retorno").val()
    });
    localStorage.setItem("tbItens", JSON.stringify(tbItens));
    alert("Informações editadas.");
    operacao = "A"; //Volta ao padrão
    ListarItens();
}

function ExcluirItem(id) {

    for (var i in tbItens) {
        var item = JSON.parse(tbItens[i]);

        if (item.codigo == id) {
            tbItens.splice(i, 1);
            localStorage.setItem("tbItens", JSON.stringify(tbItens));
            alert("Registro excluídoo.");
            ListarItens();
        }
    }
}

function ExibirItem(id) {
    for (var i in tbItens) {
        var item = JSON.parse(tbItens[i]);
        if (item.codigo == id) {
            $("#idItem").val(item.codigo);
            $("#nomeItem").val(item.nome);
            $("#tipo").val(item.tipo);
            $("#retorno").val(item.retorno);
            break;
        }
    }
}

function ListarItens() {
    $("#tblListarItens").html("");
    $("#tblListarItens").html(
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
    for (var i in tbItens) {
        var item = JSON.parse(tbItens[i]);
        $("#tblListarItens tbody").append("<tr class=\"active\">");
        $("#tblListarItens tbody").append("<td>" + item.codigo + "</td>");
        $("#tblListarItens tbody").append("<td>" + item.nome + "</td>");
        $("#tblListarItens tbody").append("<td>" + item.tipo + "</td>");
        $("#tblListarItens tbody").append("<td>" + item.retorno + "</td>");
        $("#tblListarItens tbody").append("<td> <button id=\"btn_itens_Edit\" type=\"button\" class=\"btn btn-primary\" onclick=\"ExibirItem(" + item.codigo + ")\"><span class=\"glyphicon glyphicon-pencil\"></span></button> </button>\n\
                                             <button class=\"btn btn-primary\" onclick=\"ExcluirItem(" + item.codigo + ")\" title=\"Remover\"><span class=\"glyphicon glyphicon-remove\"></span></button></td>");
        // $("#tblListarClientes tbody").append("<td><button class=\"btn btn-primary\" onclick=\"eliminar()\" title=\"Remover\"><span class=\"glyphicon glyphicon-remove\"></span></button></td");     

        $("#tblListarItens tbody").append("</tr>");
    }
}

