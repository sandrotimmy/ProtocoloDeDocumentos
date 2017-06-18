//Adiciona Usuario
function Adicionar() {
    var dataJson = JSON.stringify({
        userName: $("#txtNome").val(),
        email: $("#txtEmail").val(),
        password: $("#txtSenha").val()
    });
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/usuarios/cadastrar",
        contentType: "application/json; charset=utf-8",
        data: dataJson,
        dataType: "json",
        async: false,
        success: function () {
            alert("Usuário cadastrado com sucesso!");
        }, error() {
            alert("Erro ao processar a requisição ");
        }
    });
}
//efetua o Login
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
            if (data == null) {//Caso login falhou avisa
                alert("Usuário ou senha Incorretos!");
            } else {//caso Certo encaminha para pagina da Aplicação
                var dataJson = JSON.stringify(data);
                window.sessionStorage.setItem("secaoUsuario", dataJson);
                window.location.replace("./protocolo_menu.html");
            }
        }
    });
}
//Controle de acesso, ao tentar acessar a pagina da aplicação ela verifica antes
//se o usuário está logado
function isLogado() {
    var usuario = JSON.parse(sessionStorage.getItem("secaoUsuario"));
    if (usuario == null) {
        alert("Você deve logar antes!");
        window.location.replace("/ProtocoloDeDocumentos/index.html");
    }
}

