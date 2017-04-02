//
//function removeAddElements(component) {
//    if (component === 0) {// 0 Ativa a Tela Inicial e desativa demais
//        document.getElementById("formRegister").style.display = "none";
//    } else if (component === 1) {// 1 Ativa o cadastro de usuários e desativa demais
//        document.getElementById("initialScreen").style.display = "none";
//        document.getElementById("formRegister").style.display = "block";
//    }
//}
//

function isLogado() {
    var logado = sessionStorage.getItem("Logado");
    if (logado !== "true") {
        alert("Você deve logar antes!");
        window.location.replace("/ProtocoloDeDocumentos/index.html");
    }
}