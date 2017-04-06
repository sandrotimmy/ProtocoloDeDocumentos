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
function AdicionarCliente() {
    
    var cod = GerarID();
    var cliente = JSON.stringify({
        codigo: cod,
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
    alert("Cliente " + cod + " Cadastrado com Sucesso!");
    return true;
}
//Limitaçao do GerarID() -> Sempre compara com o ID do ultimo cliente. Se o ultimo cliente for excluido, o ID sera re-usado.
// Nao devemos re-usar IDs
function GerarID(){
    var ultimoCod = -1;
    if (tbClientes.length === 0){
        ultimoCod = 1;        
    }
    else {
        var ultimoCli = JSON.parse(tbClientes[tbClientes.length-1]);
        ultimoCod = ultimoCli.codigo;
        ultimoCod++;
    }
    
    return ultimoCod;
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

function ListarClientes() {
    $("#tblListarClientes").html("");
    $("#tblListarClientes").html(
            "<thead>" +
            "	<tr>" +
            "	<th>Código</th>" +
            "	<th>CNPJ</th>" +
            "	<th>Nome</th>" +
            "	<th>Cidade</th>" +
            "   <th>Ações</th>" +
            "	</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
            );
    for (var i in tbClientes) {
        var cli = JSON.parse(tbClientes[i]);
        $("#tblListarClientes tbody").append("<tr class=\"active\">");
        $("#tblListarClientes tbody").append("<td>" + cli.codigo + "</td>");
        $("#tblListarClientes tbody").append("<td>" + cli.cnpj + "</td>");
        $("#tblListarClientes tbody").append("<td>" + cli.nome + "</td>");
        $("#tblListarClientes tbody").append("<td>" + cli.cidade + "</td>");
        $("#tblListarClientes tbody").append("<td> <button type=\"button\" class=\"btn btn-primary actionModal\"><span class=\"glyphicon glyphicon-pencil\"></span></button> </button>\n\
                                             <button class=\"btn btn-primary\" onclick=\"Excluir()\" title=\"Remover\"><span class=\"glyphicon glyphicon-remove\"></span></button></td>");
       // $("#tblListarClientes tbody").append("<td><button class=\"btn btn-primary\" onclick=\"eliminar()\" title=\"Remover\"><span class=\"glyphicon glyphicon-remove\"></span></button></td");     
                               
        $("#tblListarClientes tbody").append("</tr>");
    }
}

