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
    if (tbItens === null) // Caso não haja conteúdo, iniciamos um vetor vazio
        tbItens = [];
});
function AdicionarItem() {
    
    var cod = GerarID();
    var item = JSON.stringify({
        codigo: cod,
        nome: $("#txtNomeItem").val(),
        tipo: $("#txtTipo").val(),
        retorno: $("#txtRetorno").val()
    });
    tbItens.push(item);
    localStorage.setItem("tbItens", JSON.stringify(tbItens));
    alert("Item " + cod + " Cadastrado com Sucesso!");
    return true;
}
//Limitaçao do GerarID() -> Sempre compara com o ID do ultimo item. Se o ultimo item for excluido, o ID sera re-usado.
// Nao devemos re-usar IDs
function GerarID(){
    var ultimoCod = -1;
    if (tbItens.length === 0){
        ultimoCod = 1;        
    }
    else {
        var ultimoCli = JSON.parse(tbItens[tbItens.length-1]);
        ultimoCod = ultimoCli.codigo;
        ultimoCod++;
    }
    
    return ultimoCod;
}
function Editar() {
    tbItens[indice_selecionado] = JSON.stringify({
        cnpj: $("#txtCnpj").val(),
        nome: $("#txtNameClient").val(),
        endereco: $("#txtEndereco").val(),
        numero: $("#txtNumero").val(),
        bairro: $("#txtBairro").val(),
        cidade: $("#txtCidade").val(),
        cep: $("#txtCep").val()
    });//Altera o item selecionado na tabela
    localStorage.setItem("tbItens", JSON.stringify(tbItens));
    alert("Informações editadas.");
    operacao = "A"; //Volta ao padrão
    return true;
}

function Excluir() {
    tbItens.splice(indice_selecionado, 1);
    localStorage.setItem("tbItens", JSON.stringify(tbItens));
    alert("Registro excluído.");
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
        $("#tblListarItens tbody").append("<td><button class=\"btn btn-primary\" onclick=\"editar()\" title=\"Editar\"> <span class=\"glyphicon glyphicon-pencil\"></span> </button>\n\
                                          <button class=\"btn btn-primary\" onclick=\"eliminar()\" title=\"Remover\"><span class=\"glyphicon glyphicon-remove\"></span></button></td>");
       // $("#tblListarItens tbody").append("<td><button class=\"btn btn-primary\" onclick=\"eliminar()\" title=\"Remover\"><span class=\"glyphicon glyphicon-remove\"></span></button></td");     
                               
        $("#tblListarItens tbody").append("</tr>");
    }
}

