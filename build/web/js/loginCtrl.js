/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var operacao = "A"; //"A"=Adição; "E"=Edição
var indice_selecionado = -1; //Índice do item selecionado na lista
var tbUsuarios;


$(function () {

    tbUsuarios = localStorage.getItem("tbUsuarios");// Recupera os dados armazenados
    tbUsuarios = JSON.parse(tbUsuarios); // Converte string para objeto
    if (tbUsuarios === null) // Caso não haja conteúdo, iniciamos um vetor vazio
        tbUsuarios = [];
});

function Adicionar() {

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/ProtocoloDeDocumentos/webresources/WSProtocoloRest",
        contentType: "application/json",
        dataType: "json",
        async: true,
        success: function (data) {
            alert(data + ", Sucesso!");
        }
    });
}
//    var usuario = JSON.stringify({
//        Nome: $("#txtNome").val(),
//        email: $("#txtEmail").val(),
//        Senha: $("#txtSenha").val()
//    }); 
//    var igual = false;
//    for (i = 0; i < tbUsuarios.length; i++){
//        var nome = $("#txtNome").val();
//        var usuarioTemp = JSON.parse(tbUsuarios[i]);
//        var nomeTemp = usuarioTemp.Nome;
//        if (nomeTemp === nome){
//            igual = true;
//            break;
//        }
//    }
//    if (igual == true) {
//        alert("Usuário ja existente, escolha outro nome!")
//        return false;
//    }else{
//        tbUsuarios.push(usuario);
//        localStorage.setItem("tbUsuarios", JSON.stringify(tbUsuarios));
//        alert("Usuário Cadastrado com Sucesso!");
//        return true;   
//    }   


function Editar() {
    tbUsuarios[indice_selecionado] = JSON.stringify({
        Codigo: $("#txtCodigo").val(),
        Nome: $("#txtNome").val(),
        Telefone: $("#txtTelefone").val(),
        Email: $("#txtEmail").val()
    });//Altera o item selecionado na tabela
    localStorage.setItem("tbUsuarios", JSON.stringify(tbUsuarios));
    alert("Informações editadas.");
    operacao = "A"; //Volta ao padrão
    return true;
}

function Excluir() {
    tbUsuarios.splice(indice_selecionado, 1);
    localStorage.setItem("tbUsuarios", JSON.stringify(tbUsuarios));
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
    for (var i in tbUsuarios) {
        var cli = JSON.parse(tbUsuarios[i]);
        $("#tblListar tbody").append("<tr>");
        $("#tblListar tbody").append("<td>" + cli.Codigo + "</td>");
        $("#tblListar tbody").append("<td>" + cli.Nome + "</td>");
        $("#tblListar tbody").append("<td>" + cli.Telefone + "</td>");
        $("#tblListar tbody").append("<td>" + cli.Email + "</td>");
        $("#tblListar tbody").append("</tr>");
    }
}

function Logar() {
    var nomeUsuario = $("#txtUsuario").val();
    var senhaUsuario = $("#txtPassword").val();
    var encontrou = false;
    for (var i = 0; i < tbUsuarios.length; i++) {
        var usuarioTemp = JSON.parse(tbUsuarios[i]);
        var nomeTemp = usuarioTemp.Nome;
        var senhaTemp = usuarioTemp.Senha;
        if (nomeTemp === nomeUsuario) {
            if (senhaTemp === senhaUsuario) {
                encontrou = true;
                break;
            }
        }
    }
    if (encontrou) {
        window.sessionStorage.setItem("Logado", "true");
        window.location.replace("./protocolo_menu.html");
        return true;
    } else {
        alert("Usuário ou senha Incorretos!");
        return false;
    }
}
function isLogado() {
    var logado = sessionStorage.getItem("Logado");
    if (logado != "true") {
        alert("Você deve logar antes!");
        window.location.replace("/ProtocoloDeDocumentos/index.html");
    }


}

