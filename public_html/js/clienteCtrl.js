/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var operacao = "A"; //"A"=Adição; "E"=Edição
var indice_selecionado = -1; //Índice do item selecionado na lista
var tbClientes;

$(function () {

    tbClientes = localStorage.getItem("tbClientes");// Recupera os dados armazenados
    tbClientes = JSON.parse(tbClientes); // Converte string para objeto
    if (tbClientes === null) // Caso não haja conteúdo, iniciamos um vetor vazio
        tbClientes = [];
});
function Adicionar() {
    var cliente = JSON.stringify({
        cnpj: $("#txtCnpj").val(),
        nome: $("#txtNameClient").val(),
        endereco: $("#txtEndereco").val(),
        numero: $("#txtNumero").val(),
        bairro: $("#txtBairro").val(),
        cidade: $("#txtCidade").val(),
        cep: $("#txtCep").val()
    });
    tbClientes.push(cliente);
    localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
    alert("Cliente Cadastrado com Sucesso!");
    return true;
}
function Editar() {
    tbClientes[indice_selecionado] = JSON.stringify({
        cnpj: $("#txtCnpj").val(),
        nome: $("#txtNameClient").val(),
        endereco: $("#txtEndereco").val(),
        numero: $("#txtNumero").val(),
        bairro: $("#txtBairro").val(),
        cidade: $("#txtCidade").val(),
        cep: $("#txtCep").val()
    });//Altera o item selecionado na tabela
    localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
    alert("Informações editadas.");
    operacao = "A"; //Volta ao padrão
    return true;
}

function Excluir() {
    tbClientes.splice(indice_selecionado, 1);
    localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
    alert("Registro excluído.");
}

function Listar() {
    $("#tblListar").html("");
    $("#tblListar").html(
            "<thead>" +
            "	<tr>" +
            "	<th></th>" +
            "	<th>Código</th>" +
            "	<th>Nome</th>" +
            "	<th>Telefone</th>" +
            "	<th>Email</th>" +
            "	</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
            );
    for (var i in tbClientes) {
        var cli = JSON.parse(tbClientes[i]);
        $("#tblListar tbody").append("<tr>");
        $("#tblListar tbody").append("<td>" + cli.i + "</td>");
        $("#tblListar tbody").append("<td>" + cli.Nome + "</td>");
        $("#tblListar tbody").append("<td>" + cli.Telefone + "</td>");
        $("#tblListar tbody").append("<td>" + cli.Email + "</td>");
        $("#tblListar tbody").append("</tr>");
    }
}

