

var listItens;//Recebe a lista de itens persistidos no banco

function AdicionarItem() {
    var dataJson = JSON.stringify({
        nome: $("#nomeItem").val(),
        tipo: $("#tipo").val(),
        retorno: $("#retorno").val(),
        empresaItem: empresa
    });
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/itens/cadastrar",
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
}
//Verifica se o item será cadastrado ou alterado com base na existencia do ID
function EditarCadastrarItem() {
    if (document.getElementById("idItem").value == "") {
        AdicionarItem();
    } else {
        EditarItem(document.getElementById("idItem").value);
    }
}

function EditarItem(id) {

    listItens.some(function (each, index) {
        if (each.idItem == id) {
            each.nome = $("#nomeItem").val();
            each.tipo = $("#tipo").val();
            each.retorno = $("#retorno").val();

            var dataJson = JSON.stringify(each);

            $.ajax({
                type: "POST",
                url: "webresources/WSProtocoloRest/itens/atualizar",
                contentType: "application/json; charset=utf-8",
                data: dataJson,
                dataType: "json",
                async: false,
                success: function () {
                    ListarItens();
                    alert("Item atualizado com sucesso!");
                }, error() {
                    alert("Erro ao processar a requisição!");
                }
            });
            return;
        }
    });
}

function ExcluirItem(id) {
    var dataJson = JSON.stringify({
        idItem: id});
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/itens/excluir",
        contentType: "application/json; charset=utf-8",
        data: dataJson,
        dataType: "json",
        async: false
    });
    ListarItens();
    alert("Item excluído com sucesso!");
}
//exibe o item selecionado no modal
function ExibirItem(id) {
    listItens.some(function (each) {
        if (each.idItem == id) {
            $("#idItem").val(each.idItem);
            $("#nomeItem").val(each.nome);
            $("#tipo").val(each.tipo);
            $("#retorno").val(each.retorno);
            return;
        }
    });
}
//Exibe os itens na tabela de listagem
function ListarItens() {
    $("#tblListarItens").html("");
    $("#tblListarItens").html(
            "<thead>" +
            "	<tr>" +
            "	<th>Código</th>" +
            "	<th>Nome</th>" +
            "	<th>Tipo</th>" +
            "	<th>Retornar?</th>" +
            "   <th>Ações</th>" +
            "	</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
            );
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/itens/getListaItens/" + empresa.idEmpresa,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            listItens = data;
            if (data != null) {
                data.forEach(function (each) {
                    $("#tblListarItens tbody").append("<tr class=\"active\">");
                    $("#tblListarItens tbody").append("<td>" + each.idItem + "</td>");
                    $("#tblListarItens tbody").append("<td>" + each.nome + "</td>");
                    $("#tblListarItens tbody").append("<td>" + each.tipo + "</td>");
                    $("#tblListarItens tbody").append("<td>" + each.retorno + "</td>");
                    $("#tblListarItens tbody").append("<td> <button id=\"btn_itens_Edit\" type=\"button\" class=\"btn btn-primary\" onclick=\"ExibirItem(" + each.idItem + ")\" title=\"Editar\"><span class=\"glyphicon glyphicon-pencil\"></span>\
                                             <button class=\"btn btn-primary\" onclick=\"ExcluirItem(" + each.idItem + ")\" title=\"Remover\"><span class=\"glyphicon glyphicon-remove\"></span></button></td>");
                    $("#tblListarItens tbody").append("</tr>");
                });
            }
        }
    });
}



