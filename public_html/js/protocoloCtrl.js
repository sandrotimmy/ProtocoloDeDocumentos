/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var operacao = "A"; //"A"=Adição; "E"=Edição
var indice_selecionado = -1; //Índice do protocolo selecionado na lista
var tbProtocolos;

$(function () {

    tbProtocolos = localStorage.getProtocolo("tbProtocolos");// Recupera os dados armazenados
    tbProtocolos = JSON.parse(tbProtocolos); // Converte string para objeto
    if (tbProtocolos == null) // Caso não haja conteúdo, iniciamos um vetor vazio
        tbProtocolos = [];
});
function AdicionarProtocolo() {

    var cod = GerarIdProtocolo();
    var protocolo = JSON.stringify({
        codigo: cod,
        nome: $("#nomeProtocolo").val(),
        tipo: $("#tipo").val(),
        retorno: $("#retorno").val()
    });
    tbProtocolos.push(protocolo);
    localStorage.setProtocolo("tbProtocolos", JSON.stringify(tbProtocolos));
    alert("Protocolo " + cod + " Cadastrado com Sucesso!");
    ListarProtocolos();
}

//Limitaçao do GerarID() -> Sempre compara com o ID do ultimo cliente. Se o ultimo cliente for excluido, o ID sera re-usado.
// Nao devemos re-usar IDs
function GerarIdProtocolo() {
    var ultimoCod = -1;
    if (tbProtocolos.length == 0) {
        ultimoCod = 1;
    } else {
        var ultimoProtocolo = JSON.parse(tbProtocolos[tbProtocolos.length - 1]);
        ultimoCod = ultimoProtocolo.codigo;
        ultimoCod++;
    }
    return ultimoCod;
}

function EditarCadastrarProtocolo() {
    if (document.getElementById("idProtocolo").value == "") {
        AdicionarProtocolo();
    } else {
        EditarProtocolo(document.getElementById("idProtocolo").value);
    }
}

function EditarProtocolo(id) {

    for (var i in tbProtocolos) {
        var protocolo = JSON.parse(tbProtocolos[i]);
        if (protocolo.codigo.toString() == id) {
            indice_selecionado = i;
        }
    }
    tbProtocolos[indice_selecionado] = JSON.stringify({
        codigo: $("#idProtocolo").val(),
        nome: $("#nomeProtocolo").val(),
        tipo: $("#tipo").val(),
        retorno: $("#retorno").val()
    });
    localStorage.setProtocolo("tbProtocolos", JSON.stringify(tbProtocolos));
    alert("Informações editadas.");
    operacao = "A"; //Volta ao padrão
    ListarProtocolos();
}

function ExcluirProtocolo(id) {

    for (var i in tbProtocolos) {
        var protocolo = JSON.parse(tbProtocolos[i]);

        if (protocolo.codigo == id) {
            tbProtocolos.splice(i, 1);
            localStorage.setProtocolo("tbProtocolos", JSON.stringify(tbProtocolos));
            alert("Registro excluídoo.");
            ListarProtocolos();
        }
    }
}

function ExibirProtocolo(id) {
    for (var i in tbProtocolos) {
        var protocolo = JSON.parse(tbProtocolos[i]);
        if (protocolo.codigo == id) {
            $("#idProtocolo").val(protocolo.codigo);
            $("#nomeProtocolo").val(protocolo.nome);
            $("#tipo").val(protocolo.tipo);
            $("#retorno").val(protocolo.retorno);
            break;
        }
    }
}

function ListarProtocolos() {
    $("#tblListarProtocolos").html("");
    $("#tblListarProtocolos").html(
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
    for (var i in tbProtocolos) {
        var protocolo = JSON.parse(tbProtocolos[i]);
        $("#tblListarProtocolos tbody").append("<tr class=\"active\">");
        $("#tblListarProtocolos tbody").append("<td>" + protocolo.codigo + "</td>");
        $("#tblListarProtocolos tbody").append("<td>" + protocolo.nome + "</td>");
        $("#tblListarProtocolos tbody").append("<td>" + protocolo.tipo + "</td>");
        $("#tblListarProtocolos tbody").append("<td>" + protocolo.retorno + "</td>");
        $("#tblListarProtocolos tbody").append("<td> <button id=\"btn_protocolo_Edit\" type=\"button\" class=\"btn btn-primary\" onclick=\"ExibirProtocolo(" + protocolo.codigo + ")\"><span class=\"glyphicon glyphicon-pencil\"></span></button> </button>\n\
                                             <button class=\"btn btn-primary\" onclick=\"ExcluirProtocolo(" + protocolo.codigo + ")\" title=\"Remover\"><span class=\"glyphicon glyphicon-remove\"></span></button></td>");
        // $("#tblListarClientes tbody").append("<td><button class=\"btn btn-primary\" onclick=\"eliminar()\" title=\"Remover\"><span class=\"glyphicon glyphicon-remove\"></span></button></td");     

        $("#tblListarProtocolos tbody").append("</tr>");
    }
}

