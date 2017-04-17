scr = "clienteCtrl";

function iniciarTelaClientes() {

//    removeAddElements(11); 
    ListarClientes();

}
function removeAddElements(component) {
    if (component === 0) {// 0 Ativa Pagina Home
        document.getElementById("dadosEmpresa").style.display = "block";
        document.getElementById("listClient").style.display = "none";
        document.getElementById("listProtocolos").style.display = "none";
        document.getElementById("listItens").style.display = "none";
    } else if (component === 1) {// 0 Ativa lista de Clientes
        document.getElementById("listClient").style.display = "block";
        document.getElementById("dadosEmpresa").style.display = "none";
        document.getElementById("listProtocolos").style.display = "none";
        document.getElementById("listItens").style.display = "none";
    } else if (component === 2) {// 01 Ativa lista de Itens
        document.getElementById("listItens").style.display = "block";
        document.getElementById("dadosEmpresa").style.display = "none";
        document.getElementById("listProtocolos").style.display = "none";
        document.getElementById("listClient").style.display = "none";
    } else if (component === 3) {// 01 Ativa lista de protocolos
        document.getElementById("listProtocolos").style.display = "block";
        document.getElementById("dadosEmpresa").style.display = "none";
        document.getElementById("listItens").style.display = "none";
        document.getElementById("listClient").style.display = "none";
    }
}

function closeModal(modal) {

    ("myModalClient").removeData('bs.modal');
}
function alterBehaviorModal() {
    //Abre Modal EMPRESA
    $(document.body).on("click", "#btn_empresa", function () {
        $("#myModalEmpresa").modal();
    });
    //Abre Modal CLIENTES
    $(document.body).on("click", "#btn_clientes", function () {
        $("#myModalClient").modal();
    });
    //Abre Modal CLIENTES PARA EDITAR
    $(document.body).on("click", "#btn_clientes_Edit", function () {
        $("#myModalClient").modal();
    });
    //Abre Modal ITENS
    $(document.body).on("click", "#btn_itens", function () {
        $("#myModalItens").modal();
    });
    //Abre Modal ITENS PARA EDITAR
    $(document.body).on("click", "#btn_itens_Edit", function () {
        $("#myModalItens").modal();
    });
    //Abre Modal PROTOCOLOS
    $(document.body).on("click", "#btn_protocolo", function () {
        $("#myModalProtocol").modal();
    });
    //Abre Modal PROTOCOLO PARA EDITAR
    $(document.body).on("click", "#btn_protocolo_Edit", function () {
        $("#myModalProtocol").modal();
    });
    //Fecha o modal EMPRESA zerando os campos
    $(document.body).on("click", "#btn_CadEmpresa", function () {
        $('#myModalEmpresa').modal('hide');
    });
    //Fecha o modal CLIENTES zerando os campos
    $(document.body).on("click", "#btn_CancelClient", function () {
        $('#myModalClient').modal('hide');
    });
    //Fecha o modal ITENS zerando os campos
    $(document.body).on("click", "#btn_CancelItens", function () {
        $('#myModalItens').modal('hide');
    });
    //Fecha o modal PROTOCOLOS zerando os campos
    $(document.body).on("click", "#btn_CancelProtocolo", function () {
        $('#myModalProtocol').modal('hide');
    });
}

function isLogado() {
    var logado = sessionStorage.getItem("Logado");
    if (logado !== "true") {
        alert("Você deve logar antes!");
        window.location.replace("/ProtocoloDeDocumentos/index.html");
    }
}

