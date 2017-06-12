
var empresa;

function inserirDados() {
    var usuario = JSON.parse(sessionStorage.getItem("secaoUsuario"));
    var codUsuario = String(usuario.idUsuarios);
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/empresa/getEmpresa/" + codUsuario,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        async: false,
        success: function (data) {
            if (data != null) {
                var cnpjTemp = data.cnpj;
                var cnpj = cnpjTemp.substr(0, 2) + "." + cnpjTemp.substr(2, 3) + "." + cnpjTemp.substr(5, 3) + "/" + cnpjTemp.substr(8, 4) + "-" + cnpjTemp.substr(12, 2);
                document.getElementById("txtCnpjEmpresa").innerHTML = cnpj;
                document.getElementById("txtNomeEmpresa").innerHTML = data.nome;
                document.getElementById("txtEnderecoEmpresa").innerHTML = data.endereco;
                document.getElementById("txtNumeroEmpresa").innerHTML = data.numero;
                document.getElementById("txtBairroEmpresa").innerHTML = data.bairro;
                document.getElementById("txtCidadeEmpresa").innerHTML = data.cidade;
                document.getElementById("txtCepEmpresa").innerHTML = data.cep;
                empresa = data;
            } else {
                document.getElementById("txtCnpjEmpresa").innerHTML = "";
                document.getElementById("txtNomeEmpresa").innerHTML = "";
                document.getElementById("txtEnderecoEmpresa").innerHTML = "";
                document.getElementById("txtNumeroEmpresa").innerHTML = "";
                document.getElementById("txtBairroEmpresa").innerHTML = "";
                document.getElementById("txtCidadeEmpresa").innerHTML = "";
                document.getElementById("txtCepEmpresa").innerHTML = "";
                alert("Empresa não cadastrada, insira os Dados!");
            }
        }
    });
}

function AdicionarEmpresa() {

    var cnpjTemp = $("#cnpjEmpresa").val();
    var cnpj = cnpjTemp.replace("/", "").replace(".", "").replace(".", "").replace("-", "");
    var usuario = JSON.parse(sessionStorage.getItem("secaoUsuario"));

    var dataJson = JSON.stringify({
        cnpj: cnpj,
        nome: $("#nomeEmpresa").val(),
        endereco: $("#addressEmpresa").val(),
        numero: $("#numberEmpresa").val(),
        bairro: $("#districtEmpresa").val(),
        cidade: $("#cityEmpresa").val(),
        cep: $("#zipCodeEmpresa").val(),
        usuarioEmpresa: usuario
    });
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/empresa/cadastrar",
        contentType: "application/json; charset=utf-8",
        data: dataJson,
        dataType: "json",
        async: false,
        success: function (data) {
            $("#idEmpresa").val(data.codigo);
            $("#cnpjEmpresa").val(data.cnpj);
            $("#nomeEmpresa").val(data.nome);
            $("#addressEmpresa").val(data.endereco);
            $("#numberEmpresa").val(data.numero);
            $("#districtEmpresa").val(data.bairro);
            $("#cityEmpresa").val(data.cidade);
            $("#zipCodeEmpresa").val(data.cep);
            inserirDados();
            alert("Empresa Cadastrada Com sucesso!");
        }, error() {
            alert("Erro ao processar a requisição ");
        }
    });
}

function EditarCadastrarEmpresa() {
    if (empresa == null) {
        AdicionarEmpresa();
    } else {
        EditarEmpresa();
    }
}

function EditarEmpresa() {

    var cnpjTemp = $("#cnpjEmpresa").val();
    var cnpj = cnpjTemp.replace("/", "").replace(".", "").replace(".", "").replace("-", "");
    var usuario = JSON.parse(sessionStorage.getItem("secaoUsuario"));

    var dataJson = JSON.stringify({
        idEmpresa: empresa.idEmpresa,
        cnpj: cnpj,
        nome: $("#nomeEmpresa").val(),
        endereco: $("#addressEmpresa").val(),
        numero: $("#numberEmpresa").val(),
        bairro: $("#districtEmpresa").val(),
        cidade: $("#cityEmpresa").val(),
        cep: $("#zipCodeEmpresa").val(),
        usuarioEmpresa: usuario
    });
    
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/empresa/atualizar",
        contentType: "application/json; charset=utf-8",
        data: dataJson,
        dataType: "json",
        async: false,
        success: function (data) {
            $("#idEmpresa").val(data.codigo);
            $("#cnpjEmpresa").val(data.cnpj);
            $("#nomeEmpresa").val(data.nome);
            $("#addressEmpresa").val(data.endereco);
            $("#numberEmpresa").val(data.numero);
            $("#districtEmpresa").val(data.bairro);
            $("#cityEmpresa").val(data.cidade);
            $("#zipCodeEmpresa").val(data.cep);
            inserirDados();
            alert("Empresa Atualizada com sucesso!");
        }, error() {
            alert("Erro ao processar a requisição ");
        }
    });
}

function ExcluirEmpresa() {

    var dataJson = JSON.stringify({
        idEmpresa: empresa.idEmpresa
    });

    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/empresa/excluir",
        contentType: "application/json; charset=utf-8",
        data: dataJson,
        dataType: "json",
        async: false
    });
    empresa = null;
    alert("Empresa excluída com sucesso!");
    inserirDados();
}

function ExibirEmpresa() {
    if (empresa != null) {
        var cnpjTemp = empresa.cnpj;
        var cnpj = cnpjTemp.substr(0, 2) + "." + cnpjTemp.substr(2, 3) + "." + cnpjTemp.substr(5, 3) + "/" + cnpjTemp.substr(8, 4) + "-" + cnpjTemp.substr(12, 2);
        $("#cnpjEmpresa").val(cnpj);
        $("#nomeEmpresa").val(empresa.nome);
        $("#addressEmpresa").val(empresa.endereco);
        $("#numberEmpresa").val(empresa.numero);
        $("#districtEmpresa").val(empresa.bairro);
        $("#cityEmpresa").val(empresa.cidade);
        $("#zipCodeEmpresa").val(empresa.cep);
    } else {
        $("#cnpjEmpresa").val("");
        $("#nomeEmpresa").val("");
        $("#addressEmpresa").val("");
        $("#numberEmpresa").val("");
        $("#districtEmpresa").val("");
        $("#cityEmpresa").val("");
        $("#zipCodeEmpresa").val("");
    }
}

function passaDadosEmpresa() {

    if (tbEmpresa.length > 0) {
        var empresa = JSON.parse(tbEmpresa[0]);
        var dadosEmpresa = {
            nomeEmpresa: empresa.nome,
            enderecoEmpresa: empresa.endereco,
            numeroEmpresa: empresa.numero,
            bairroEmpresa: empresa.bairro,
            cidadeEmpresa: empresa.cidade,
            cnpjEmpresa: empresa.cnpj
        };
        return dadosEmpresa;
    }
}