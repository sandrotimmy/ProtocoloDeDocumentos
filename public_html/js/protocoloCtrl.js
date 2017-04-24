/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var operacao = "A"; //"A"=Adição; "E"=Edição
var indice_selecionado = -1; //Índice do protocolo selecionado na lista
var tbProtocolos;
var dadosRecibo;//recebe os dados para emissão do recibo de protocolo

$(function () {

    tbProtocolos = localStorage.getItem("tbProtocolos");// Recupera os dados armazenados
    dadosRecibo = sessionStorage.getItem("dadosRecibo");// Recupera os dados armazenados
    tbProtocolos = JSON.parse(tbProtocolos); // Converte string para objeto
    dadosRecibo = JSON.parse(dadosRecibo); // Converte string para objeto
    if (tbProtocolos == null) // Caso não haja conteúdo, iniciamos um vetor vazio
        tbProtocolos = [];
});
function AdicionarProtocolo() {

    var cod = GerarIdProtocolo();
    $("#idProtocolo").val(cod);
    var select = document.getElementById("clienteProtocolo");
    var clienteSelecionado = select.options[select.selectedIndex].value;
    var protocolo = JSON.stringify({
        codigo: cod,
        data: $("#dataProtocolo").val(),
        codCliente: clienteSelecionado,
        observacoes: $("#observacoes").val()
    });
    tbProtocolos.push(protocolo);
    localStorage.setItem("tbProtocolos", JSON.stringify(tbProtocolos));
    alert("Protocolo " + cod + " Cadastrado com Sucesso!");
    ListarProtocolos();
    enviaDadosRecibo(cod);
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

//Limitaçao do GerarID() -> Sempre compara com o ID do ultimo cliente. Se o ultimo cliente for excluido, o ID sera re-usado.
// Nao devemos re-usar IDs
function GerarIdProtocolo() {
    var ultimoCod = -1;
    if (tbProtocolos.length == 0) {
        ultimoCod = 1;
    } else {
        var ultimoProtocolo = JSON.parse(tbProtocolos[tbProtocolos.length - 1]);
        ultimoCod = ultimoProtocolo.codigo;
        ultimoCod++;
    }
    return ultimoCod;
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
                                             <button class=\"btn btn-primary\" onclick=\"enviaDadosRecibo(" + protocolo.codigo + ")\" title=\"Recibo\"><span class=\"glyphicon glyphicon-search\"></span></button>\n\
                                             <button id=\"btn_protocolo_Edit\" type=\"button\" class=\"btn btn-primary\" onclick=\"ExibirProtocolo(" + protocolo.codigo + ")\"title=\"Editar\"><span class=\"glyphicon glyphicon-pencil\"></span></button> </button>\n\
                                             <button class=\"btn btn-primary\" onclick=\"ExcluirProtocolo(" + protocolo.codigo + ")\" title=\"Remover\"><span class=\"glyphicon glyphicon-remove\"></span></button>\n\</td>");
        $("#tblListarProtocolos tbody").append("</tr>");
    }
}

