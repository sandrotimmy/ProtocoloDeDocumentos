/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var operacao = "A"; //"A"=Adição; "E"=Edição
var indice_selecionado = -1; //Índice do item selecionado na lista
var tbUsuarios;
$(function () {

    tbUsuarios = localStorage.getItem("tbUsuarios"); // Recupera os dados armazenados
    tbUsuarios = JSON.parse(tbUsuarios); // Converte string para objeto
    if (tbUsuarios === null) // Caso não haja conteúdo, iniciamos um vetor vazio
        tbUsuarios = [];
});
function Adicionar(e) {
    var dataJson = JSON.stringify({
        userName: $("#txtNome").val(),
        email: $("#txtEmail").val(),
        password: $("#txtSenha").val()
    });
    $.ajax({
        type: "POST",
//        url: "webresources/WSProtocoloRest/usuarios/cadastrar/" +
//                $("#txtNome").val() + "/" +
//                $("#txtEmail").val() + "/" +
//                $("#txtSenha").val(),
        url: "webresources/WSProtocoloRest/usuarios/cadastrar",
        contentType: "application/json; charset=utf-8",
        data: dataJson,
        dataType: "json",
        async: false,
        success: function () {
            alert("Usuário Cadastrado Com sucesso!");
        }, error() {
            alert("Erro ao processar a requisição ");
        }
    });
}

function Logar() {
    var dataJson = JSON.stringify({
        userName: $("#txtUsuario").val(),
        password: $("#txtPassword").val()
    });
    $.ajax({

        type: "POST",
        url: "webresources/WSProtocoloRest/usuarios/logar",
        contentType: "application/json; charset=utf-8",
        data: dataJson,
        dataType: "json",
        async: false,
        success: function (data) {
            if (data == null) {
                alert("Usuário ou senha Incorretos!");
            } else {
//                usuarioGlobal = data;
                var dataJson = JSON.stringify(data);
                window.sessionStorage.setItem("secaoUsuario", dataJson);
                window.location.replace("./protocolo_menu.html");
            }
        }, error() {
            alert("Usuário ou senha Incorretos!");
        }
    });
}

function isLogado() {
    var usuario = JSON.parse(sessionStorage.getItem("secaoUsuario"));
    if (usuario.idUsuarios == null) {
        alert("Você deve logar antes!");
        window.location.replace("/ProtocoloDeDocumentos/index.html");
    }


}

