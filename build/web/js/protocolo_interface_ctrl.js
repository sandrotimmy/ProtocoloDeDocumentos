scr = "clienteCtrl";

function iniciarTelaClientes() {

    ListarClientes();

}
//Controla o conteudo na tela
function removeAddElements(component) {
    if (component === 0) {// 0 Ativa Pagina Home
        document.getElementById("dadosEmpresa").style.display = "block";
        document.getElementById("listClient").style.display = "none";
        document.getElementById("listProtocolos").style.display = "none";
        document.getElementById("listItens").style.display = "none";
    } else if (component === 1) {// 1 Ativa lista de Clientes
        document.getElementById("listClient").style.display = "block";
        document.getElementById("dadosEmpresa").style.display = "none";
        document.getElementById("listProtocolos").style.display = "none";
        document.getElementById("listItens").style.display = "none";
    } else if (component === 2) {// 2 Ativa lista de Itens
        document.getElementById("listItens").style.display = "block";
        document.getElementById("dadosEmpresa").style.display = "none";
        document.getElementById("listProtocolos").style.display = "none";
        document.getElementById("listClient").style.display = "none";
    } else if (component === 3) {// 3 Ativa lista de protocolos
        document.getElementById("listProtocolos").style.display = "block";
        document.getElementById("dadosEmpresa").style.display = "none";
        document.getElementById("listItens").style.display = "none";
        document.getElementById("listClient").style.display = "none";
    }
}

function closeModal(modal) {
    ("myModalClient").removeData('bs.modal');
}
//Chama o modal Correspondente
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
    $(document.body).on("click", "#btnCadClient", function () {
        $('#myModalClient').modal('hide');
    });
    //Fecha o modal ITENS zerando os campos
    $(document.body).on("click", "#btn_CancelItens", function () {
        $('#myModalItens').modal('hide');
    });
    $(document.body).on("click", "#btnCadItem", function () {
        $('#myModalItens').modal('hide');
    });
    //Fecha o modal PROTOCOLOS zerando os campos
    $(document.body).on("click", "#btn_CancelProtocolo", function () {
        $('#myModalProtocol').modal('hide');
    });
    $(document.body).on("click", "#btnCadProtocol", function () {
        $('#myModalProtocol').modal('hide');
//        limparTabela();
    });
    //reseta a combobox de items quando ele for adicionado
    $(document.body).on("click", "#btn_add_item", function () {
        var select = document.getElementById("itemProtocolo");
        select.options[0].selected = "true";
    });
}



