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
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/usuarios/cadastrar/" +
                $("#txtNome").val() + "/" +
                $("#txtEmail").val() + "/" +
                $("#txtSenha").val(),
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        async: false,
        success: function () {
            alert("Usuário Cadastrado Com sucesso!");
        }, error() {
            alert("Erro ao processar a requisição ");
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
            if (data == null) {
                alert("Usuário ou senha Incorretos!");
            }else{
            var dataJson = JSON.stringify({
                idUsuarios: data.idUsuarios,
                userName: data.userName,
                logado: true
            });
            window.sessionStorage.setItem("secaoUsuario",dataJson);
            window.location.replace("./protocolo_menu.html");
        }
        }, error() {
            alert("Usuário ou senha Incorretos!");
        }
    });
}

function isLogado() {
    var usuario = JSON.parse(sessionStorage.getItem("secaoUsuario"));
    if (usuario == null || usuario.logado != true) {
        alert("Você deve logar antes!");
        window.location.replace("/ProtocoloDeDocumentos/index.html");
    }


}

