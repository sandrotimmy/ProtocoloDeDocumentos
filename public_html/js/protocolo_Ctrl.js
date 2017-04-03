
function removeAddElements(component) {
    if (component === 0) {// 0 Ativa Pagina Home
        document.getElementById("dadosEmpresa").style.display = "block";
        document.getElementById("listClient").style.display = "none";
        document.getElementById("formClientes").style.display = "none";
        document.getElementById("formProtocolo").style.display = "none";
        document.getElementById("listProtocolos").style.display = "none";
        document.getElementById("formItem").style.display = "none";
        document.getElementById("listItens").style.display = "none";
    } else if (component === 1) {// 0 Ativa lista de Clientes
        document.getElementById("listClient").style.display = "block";
        document.getElementById("dadosEmpresa").style.display = "none";
        document.getElementById("formClientes").style.display = "none";
        document.getElementById("formProtocolo").style.display = "none";
        document.getElementById("listProtocolos").style.display = "none";
        document.getElementById("formItem").style.display = "none";
        document.getElementById("listItens").style.display = "none";
    } else if (component === 11) {// 01 Ativa Cadastro de Clientes
        document.getElementById("formClientes").style.display = "block";
        document.getElementById("dadosEmpresa").style.display = "none";
        document.getElementById("listClient").style.display = "none";
        document.getElementById("formProtocolo").style.display = "none";
        document.getElementById("listProtocolos").style.display = "none";
        document.getElementById("formItem").style.display = "none";
        document.getElementById("listItens").style.display = "none";
    } else if (component === 2) {// 01 Ativa lista de Itens
        document.getElementById("listItens").style.display = "block";
        document.getElementById("dadosEmpresa").style.display = "none";
        document.getElementById("formItem").style.display = "none";
        document.getElementById("formProtocolo").style.display = "none";
        document.getElementById("listProtocolos").style.display = "none";
        document.getElementById("formClientes").style.display = "none";
        document.getElementById("listClient").style.display = "none";
    } else if (component === 21) {// 01 Ativa Cadastro de Itens
        document.getElementById("formItem").style.display = "block";
        document.getElementById("dadosEmpresa").style.display = "none";
        document.getElementById("listItens").style.display = "none";
        document.getElementById("formProtocolo").style.display = "none";
        document.getElementById("listProtocolos").style.display = "none";
        document.getElementById("formClientes").style.display = "none";
        document.getElementById("listClient").style.display = "none";
    } else if (component === 3) {// 01 Ativa lista de protocolos
        document.getElementById("listProtocolos").style.display = "block";
        document.getElementById("dadosEmpresa").style.display = "none";
        document.getElementById("formProtocolo").style.display = "none";
        document.getElementById("formItem").style.display = "none";
        document.getElementById("listItens").style.display = "none";
        document.getElementById("formClientes").style.display = "none";
        document.getElementById("listClient").style.display = "none";
    } else if (component === 31) {// 01 Ativa o Cadastro de protocolos
        document.getElementById("formProtocolo").style.display = "block";
        document.getElementById("dadosEmpresa").style.display = "none";
        document.getElementById("listProtocolos").style.display = "none";
        document.getElementById("formItem").style.display = "none";
        document.getElementById("listItens").style.display = "none";
        document.getElementById("formClientes").style.display = "none";
        document.getElementById("listClient").style.display = "none";
    }
}



function isLogado() {
    var logado = sessionStorage.getItem("Logado");
    if (logado !== "true") {
        alert("Você deve logar antes!");
        window.location.replace("/ProtocoloDeDocumentos/index.html");
    }
}

