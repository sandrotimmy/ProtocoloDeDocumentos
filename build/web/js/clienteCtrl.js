

var listClientes;

function AdicionarCliente() {
    var cnpjTemp = $("#cnpjClient").val();
    var cnpj = cnpjTemp.replace("/", "").replace(".", "").replace(".", "").replace("-", "");
    var dataJson = JSON.stringify({
        cnpj: cnpj,
        nome: $("#nomeClient").val(),
        endereco: $("#addressClient").val(),
        numero: $("#numberClient").val(),
        bairro: $("#districtClient").val(),
        cidade: $("#cityClient").val(),
        cep: $("#zipCodeClient").val(),
        empresaCliente: empresa
    });
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/clientes/cadastrar",
        contentType: "application/json; charset=utf-8",
        data: dataJson,
        dataType: "json",
        async: false,
        success: function (data) {
            alert("Cliente Cadastrado com sucesso!");
            ListarClientes();
        }, error() {
            alert("Erro ao processar a requisição ");
        }
    });
}

function EditarCadastrarCliente() {
    if (document.getElementById("idClient").value == "") {
        AdicionarCliente();
    } else {
        EditarCliente(document.getElementById("idClient").value);
    }
}

function EditarCliente(id) {

    listClientes.some(function (each, index) {
        if (each.idCliente == id) {
            var cnpjTemp = $("#cnpjClient").val();
            var cnpj = cnpjTemp.replace("/", "").replace(".", "").replace(".", "").replace("-", "");
            each.cnpj = cnpj;
            each.nome = $("#nomeClient").val();
            each.endereco = $("#addressClient").val();
            each.numero = $("#numberClient").val();
            each.bairro = $("#districtClient").val();
            each.cidade = $("#cityClient").val();
            each.cep = $("#zipCodeClient").val();

            var dataJson = JSON.stringify(each);

            $.ajax({
                type: "POST",
                url: "webresources/WSProtocoloRest/clientes/atualizar",
                contentType: "application/json; charset=utf-8",
                data: dataJson,
                dataType: "json",
                async: false,
                success: function (data) {
                    ListarClientes();
                    alert("Cliente Atualizado com sucesso!");
                }, error() {
                    alert("Erro ao processar a requisição!");
                }
            });
            ListarClientes();
            return;
        }
    });
}

function ExcluirCliente(id) {
    var dataJson = JSON.stringify({
        idCliente: id});
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/clientes/excluir",
        contentType: "application/json; charset=utf-8",
        data: dataJson,
        dataType: "json",
        async: false
    });
    alert("Cliente excluído com sucesso!");
    ListarClientes();
}

function ExibirCliente(id) {

    listClientes.some(function (each, index) {
        if (each.idCliente == id) {
            var cnpjTemp = each.cnpj;
            var cnpj = cnpjTemp.substr(0, 2) + "." + cnpjTemp.substr(2, 3) + "." + cnpjTemp.substr(5, 3) + "/" + cnpjTemp.substr(8, 4) + "-" + cnpjTemp.substr(12, 2);
            $("#idClient").val(each.idCliente);
            $("#cnpjClient").val(cnpj);
            $("#nomeClient").val(each.nome);
            $("#addressClient").val(each.endereco);
            $("#numberClient").val(each.numero);
            $("#districtClient").val(each.bairro);
            $("#cityClient").val(each.cidade);
            $("#zipCodeClient").val(each.cep);
            return;
        }
    });
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
                if (select.length <= 1) {
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
        }
    });
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
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/clientes/getListaCLientes/" + empresa.idEmpresa,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            listClientes = data;
            if (data != null) {
                data.forEach(function (each) {
                    var cnpjTemp = each.cnpj;
                    var cnpj = cnpjTemp.substr(0, 2) + "." + cnpjTemp.substr(2, 3) + "." + cnpjTemp.substr(5, 3) + "/" + cnpjTemp.substr(8, 4) + "-" + cnpjTemp.substr(12, 2);

                    $("#tblListarClientes tbody").append("<tr class=\"active\">");
                    $("#tblListarClientes tbody").append("<td>" + each.idCliente + "</td>");
                    $("#tblListarClientes tbody").append("<td>" + cnpj + "</td>");
                    $("#tblListarClientes tbody").append("<td>" + each.nome + "</td>");
                    $("#tblListarClientes tbody").append("<td>" + each.cidade + "</td>");
                    $("#tblListarClientes tbody").append("<td> <button id=\"btn_clientes_Edit\" type=\"button\" class=\"btn btn-primary actionModal\" onclick=\"ExibirCliente(" + each.idCliente + ")\" title=\"Editar\"><span class=\"glyphicon glyphicon-pencil\"></span>\
                                             <button class=\"btn btn-primary\" onclick=\"ExcluirCliente(" + each.idCliente + ")\" title=\"Remover\"><span class=\"glyphicon glyphicon-remove\"></span></button></td>");
                    $("#tblListarClientes tbody").append("</tr>");
                });
            } else {

            }
        }
    });
}


