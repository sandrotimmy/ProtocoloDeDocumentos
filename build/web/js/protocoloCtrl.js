

var operacao = "A"; //"A"=Adição; "E"=Edição
var indice_selecionado = -1; //Índice do protocolo selecionado na lista
var tbProtocolos;
var dadosRecibo;//recebe os dados para emissão do recibo de protocolo
var codNovoProtocolo;
var cliente;

function GeraId() {
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/protocolos/getProximoCodProtocolo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            listClientes = data;
            if (data != null) {
                codNovoProtocolo = data;
            }
        }
    });
}

function AdicionarProtocolo() {

    var dataJson = JSON.stringify({
        data: $("#dataProtocolo").val(),
        codCliente: clienteSelecionado,
        observacoes: $("#observacoes").val(),
        empresaProtocolo: empresa,
        clienteProtocolo: cliente
    });

    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/protocolos/cadastrar",
        contentType: "application/json; charset=utf-8",
        data: dataJson,
        dataType: "json",
        async: false,
        success: function (data) {
            alert("Item Cadastrado com sucesso!");
            ListarItens();
        }, error() {
            alert("Erro ao processar a requisição ");
        }
    });
    $("#idProtocolo").val(codNovoProtocolo);
    var select = document.getElementById("clienteProtocolo");
    var clienteSelecionado = select.options[select.selectedIndex].value;
    var protocolo = JSON.stringify({
        codigo: codNovoProtocolo,

    });
    tbProtocolos.push(protocolo);
    localStorage.setItem("tbProtocolos", JSON.stringify(tbProtocolos));
    alert("Protocolo " + codNovoProtocolo + " Cadastrado com Sucesso!");
    ListarProtocolos();
    enviaDadosRecibo(codNovoProtocolo);
}

function enviaDadosRecibo(codProtocolo) {

    var protocolo = passaDadosProtocolo(codProtocolo);
    var empresa = passaDadosEmpresa();
    var cliente = passaDadosCliente(protocolo.codCliente);

    var dadosRec = JSON.stringify({
        dadosProtocoloCod: protocolo.codigo,
        dadosEmpresaCnpj: empresa.cnpjEmpresa,
        dadosEmpresaNome: empresa.nomeEmpresa,
        dadosEmpresaEndereco: empresa.enderecoEmpresa,
        dadosEmpresaNumero: empresa.numeroEmpresa,
        dadosEmpresaBairro: empresa.bairroEmpresa,
        dadosEmpresaCidade: empresa.cidadeEmpresa,
        dadosClienteNome: cliente.nome,
        dadosProtocoloObservacoes: protocolo.observacoes
    });
    sessionStorage.setItem("dadosRecibo", dadosRec);
    gerarRecibo();

}

function EditarCadastrarProtocolo() {
    if (document.getElementById("idProtocolo").value == "") {
        AdicionarProtocolo();
    } else {
        EditarProtocolo(document.getElementById("idProtocolo").value);
    }
}

function EditarProtocolo(id) {
    var select = document.getElementById("clienteProtocolo");
    var clienteSelecionado = select.options[select.selectedIndex].value;

    for (var i in tbProtocolos) {
        var protocolo = JSON.parse(tbProtocolos[i]);
        if (protocolo.codigo.toString() == id) {
            indice_selecionado = i;
        }
    }
    tbProtocolos[indice_selecionado] = JSON.stringify({
        codigo: $("#idProtocolo").val(),
        data: $("#dataProtocolo").val(),
        codCliente: clienteSelecionado,
        observacoes: $("#observacoes").val()
    });
    localStorage.setItem("tbProtocolos", JSON.stringify(tbProtocolos));
    alert("Informações editadas.");
    operacao = "A"; //Volta ao padrão
    ListarProtocolos();
    enviaDadosRecibo(id);
}

function ExcluirProtocolo(id) {

    for (var i in tbProtocolos) {
        var protocolo = JSON.parse(tbProtocolos[i]);
        if (protocolo.codigo == id) {
            tbProtocolos.splice(i, 1);
            localStorage.setItem("tbProtocolos", JSON.stringify(tbProtocolos));
            ExcluirItemPorProtocolo(protocolo.codigo);
            alert("Registro excluído.");
            ListarProtocolos();
        }
    }

}

function AdicionarItemProtocolo() {
    if (document.getElementById("idProtocolo").value == "") {
        adicionarItemProt(codNovoProtocolo);
    } else {
        adicionarItemProt(document.getElementById("idProtocolo").value);
    }
}

function ExcluirItensCancelar() {
    if (document.getElementById("idProtocolo").value == "") {
        ExcluirItemPorProtocolo(codNovoProtocolo);
    }
}

function SeletorCliente(codCliente) {
    var select = document.getElementById("clienteProtocolo");
    for (var i = 0; i < select.options.length; i++) {
        if (select.options[i].value == codCliente) {
            select.options[i].selected = "true";
            break;
        }
    }
}

function passaDadosProtocolo(id) {
    var protocolo;
    for (var i in tbProtocolos) {
        protocolo = JSON.parse(tbProtocolos[i]);
        if (protocolo.codigo == id) {
            return protocolo;
        }
    }
}
//Carregar os clientes na comboBox para seleção no protocolo
function ListaClientesProtocolo() {
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/clientes/getListaCLientes/" + empresa.idEmpresa,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            listClientes = data;
            var select = document.getElementById("clienteProtocolo");
            if (data != null) {
                data.forEach(function (each) {
                    var opt = each.nome;
                    var val = each.idCliente;
                    var el = document.createElement("option");
                    el.textContent = opt;
                    el.value = val;
                    select.appendChild(el);
                });
            }
        }
    });
}
//Carregar os clientes na comboBox para seleção no protocolo
function preencherComboItens() {
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/itens/getListaItens/" + empresa.idEmpresa,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            listItens = data;
            var select = document.getElementById("itemProtocolo");
            if (listItens != null) {
                listItens.forEach(function (each) {
                    var opt = each.nome;
                    var val = each.idItem;
                    var el = document.createElement("option");
                    el.textContent = opt;
                    el.value = val;
                    select.appendChild(el);
                });
            }
        }
    });
}
//exibe protocolo no modal
function ExibirProtocolo(id) {
    ListaItensProtocolo();
    ListaClientesProtocolo();
    var codProtocolo;
    for (var i in tbProtocolos) {
        var protocolo = JSON.parse(tbProtocolos[i]);
        if (protocolo.codigo == id) {
            $("#idProtocolo").val(protocolo.codigo);
            $("#dataProtocolo").val(protocolo.data);
            SeletorCliente(protocolo.codCliente);
            $("#observacoes").val(protocolo.observacoes);
            codProtocolo = protocolo.codigo;
            break;
        }
    }
    ListarItensProtocolo(codProtocolo);
}
//lista protocolos cadastrados
function ListarProtocolos() {
    $("#tblListarProtocolos").html("");
    $("#tblListarProtocolos").html(
            "<thead>" +
            "	<tr>" +
            "	<th>Código</th>" +
            "	<th>Data</th>" +
            "	<th>Cliente</th>" +
            "	<th>Observações</th>" +
            "	<th>Ações</th>" +
            "	</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
            );


    for (var i in tbProtocolos) {
        var protocolo = JSON.parse(tbProtocolos[i]);
        var nomeCliente = localizaCliente(protocolo.codCliente);
        $("#tblListarProtocolos tbody").append("<tr class=\"active\">");
        $("#tblListarProtocolos tbody").append("<td>" + protocolo.codigo + "</td>");
        $("#tblListarProtocolos tbody").append("<td>" + protocolo.data + "</td>");
        $("#tblListarProtocolos tbody").append("<td>" + nomeCliente + "</td>");
        $("#tblListarProtocolos tbody").append("<td>" + protocolo.observacoes + "</td>");
        $("#tblListarProtocolos tbody").append("<td> \n\
                                             <button class=\"btn btn-primary\" onclick=\"enviaDadosRecibo(" + protocolo.codigo + ")\" title=\"Recibo\"><span class=\"glyphicon glyphicon-search\"></span>\
                                             <button id=\"btn_protocolo_Edit\" type=\"button\" class=\"btn btn-primary\" onclick=\"ExibirProtocolo(" + protocolo.codigo + ")\"title=\"Editar\"><span class=\"glyphicon glyphicon-pencil\"></span>\
                                             <button class=\"btn btn-primary\" onclick=\"ExcluirProtocolo(" + protocolo.codigo + ")\" title=\"Remover\"><span class=\"glyphicon glyphicon-remove\"></span>\</td>");
        $("#tblListarProtocolos tbody").append("</tr>");
    }
}





