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

function Adicionar(e) {
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/usuarios/cadastrar/" +
                $("#txtNome").val() + "/" +
                $("#txtEmail").val() + "/" +
                $("#txtSenha").val(),
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        async: false,
        success: function (data) {
            alert("Usuário Cadastrado Com sucesso!" + data.userName);
        }, error(data) {
            alert("Erro ao processar a requisição " + data.userName);
        }
    });
}

function Logar() {
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/usuarios/logar/" +
                $("#txtUsuario").val() + "/" +
                $("#txtPassword").val(),
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        async: false,
        success: function (data) {
            if (data === true) {
                window.sessionStorage.setItem("Logado", "true");
                window.location.replace("./protocolo_menu.html");
            } else {
                alert("Usuário ou senha Incorretos!");
            }
        }
    });
}

function isLogado() {
    var logado = sessionStorage.getItem("Logado");
    if (logado != "true") {
        alert("Você deve logar antes!");
        window.location.replace("/ProtocoloDeDocumentos/index.html");
    }


}

