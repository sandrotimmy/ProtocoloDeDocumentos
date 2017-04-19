/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var operacao = "A"; //"A"=Adição; "E"=Edição
var indice_selecionado = -1; //Índice do item selecionado na lista
var tbClientes;

$(function () {

    tbClientes = localStorage.getItem("tbClientes");// Recupera os dados armazenados
    tbClientes = JSON.parse(tbClientes); // Converte string para objeto
    if (tbClientes == null) // Caso não haja conteúdo, iniciamos um vetor vazio
        tbClientes = [];
});
function AdicionarCliente() {

    var cod = GerarIdCli();
    var cliente = JSON.stringify({
        codigo: cod,
        cnpj: $("#cnpjClient").val(),
        nome: $("#nomeClient").val(),
        endereco: $("#addressClient").val(),
        numero: $("#numberClient").val(),
        bairro: $("#districtClient").val(),
        cidade: $("#cityClient").val(),
        cep: $("#zipCodeClient").val()
    });
    tbClientes.push(cliente);
    localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
    alert("Cliente " + cod + " Cadastrado com Sucesso!");
    $("#myModal").modal(".close");
    ListarClientes();
}

//Limitaçao do GerarID() -> Sempre compara com o ID do ultimo cliente. Se o ultimo cliente for excluido, o ID sera re-usado.
// Nao devemos re-usar IDs
function GerarIdCli() {
    var ultimoCod = -1;
    if (tbClientes.length == 0) {
        ultimoCod = 1;
    } else {
        var ultimoCli = JSON.parse(tbClientes[tbClientes.length - 1]);
        ultimoCod = ultimoCli.codigo;
        ultimoCod++;
    }

    return ultimoCod;
}

function EditarCadastrarCliente() {
    if (document.getElementById("idClient").value == "") {
        AdicionarCliente();
    } else {
        EditarCliente(document.getElementById("idClient").value);
    }
}

function EditarCliente(id) {

    for (var i in tbClientes) {
        var cli = JSON.parse(tbClientes[i]);
        if (cli.codigo.toString() == id) {
            indice_selecionado = i;
        }
    }
    tbClientes[indice_selecionado] = JSON.stringify({
        codigo: $("#idClient").val(),
        cnpj: $("#cnpjClient").val(),
        nome: $("#nomeClient").val(),
        endereco: $("#addressClient").val(),
        numero: $("#numberClient").val(),
        bairro: $("#districtClient").val(),
        cidade: $("#cityClient").val(),
        cep: $("#zipCodeClient").val()
    });//Altera o item selecionado na tabela
    localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
    alert("Informações editadas.");
    operacao = "A"; //Volta ao padrão
    ListarClientes();
}

function ExcluirCliente(id) {

    for (var i in tbClientes) {
        var cli = JSON.parse(tbClientes[i]);

        if (cli.codigo == id) {
            tbClientes.splice(i, 1);
            localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
            alert("Registro excluídoo.");
            ListarClientes();
        }
    }
}

function ExibirCliente(id) {
    for (var i in tbClientes) {
        var cli = JSON.parse(tbClientes[i]);

        if (cli.codigo == id) {
            $("#idClient").val(cli.codigo);
            $("#cnpjClient").val(cli.cnpj);
            $("#nomeClient").val(cli.nome);
            $("#addressClient").val(cli.endereco);
            $("#numberClient").val(cli.numero);
            $("#districtClient").val(cli.bairro);
            $("#cityClient").val(cli.cidade);
            $("#zipCodeClient").val(cli.cep);
            break;
        }
    }
}
//Carregar os clientes na comboBox para seleção no protocolo
function ListaClientesProtocolo() {
    var select = document.getElementById("clienteProtocolo");
    if (select.length <= 1) {
        for (var i = 0; i < tbClientes.length; i++) {
            var cli = JSON.parse(tbClientes[i]);
            var opt = cli.nome;
            var val = cli.codigo;
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = val;
            select.appendChild(el);
        }
    }
}

function ListarClientes() {
    $("#tblListarClientes").html("");
    $("#tblListarClientes").html(
            "<thead>" +
            "	<tr>" +
            "	<th>Código</th>" +
            "	<th>CNPJ</th>" +
            "	<th>Nome</th>" +
            "	<th>Cidade</th>" +
            "   <th>Ações</th>" +
            "	</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
            );
    for (var i in tbClientes) {
        var cli = JSON.parse(tbClientes[i]);
        $("#tblListarClientes tbody").append("<tr class=\"active\">");
        $("#tblListarClientes tbody").append("<td>" + cli.codigo + "</td>");
        $("#tblListarClientes tbody").append("<td>" + cli.cnpj + "</td>");
        $("#tblListarClientes tbody").append("<td>" + cli.nome + "</td>");
        $("#tblListarClientes tbody").append("<td>" + cli.cidade + "</td>");
        $("#tblListarClientes tbody").append("<td> <button id=\"btn_clientes_Edit\" type=\"button\" class=\"btn btn-primary actionModal\" onclick=\"ExibirCliente(" + cli.codigo + ")\"><span class=\"glyphicon glyphicon-pencil\"></span></button> </button>\n\
                                             <button class=\"btn btn-primary\" onclick=\"ExcluirCliente(" + cli.codigo + ")\" title=\"Remover\"><span class=\"glyphicon glyphicon-remove\"></span></button></td>");
        // $("#tblListarClientes tbody").append("<td><button class=\"btn btn-primary\" onclick=\"eliminar()\" title=\"Remover\"><span class=\"glyphicon glyphicon-remove\"></span></button></td");     

        $("#tblListarClientes tbody").append("</tr>");
    }
}

function localizaCliente(codCliente) {
    for (var i = 0; i < tbClientes.length; i++) {
        var clienteTemp = JSON.parse(tbClientes[i]);
        var codTemp = clienteTemp.codigo;
        if (codTemp == codCliente) {
            return clienteTemp.nome;
        }
    }
}

