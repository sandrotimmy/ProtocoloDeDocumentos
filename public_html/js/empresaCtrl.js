/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var operacao = "A"; //"A"=Adição; "E"=Edição
var indice_selecionado = -1; //Índice do item selecionado na lista
var tbEmpresa;
$(function () {

    tbEmpresa = localStorage.getItem("tbEmpresa"); // Recupera os dados armazenados
    tbEmpresa = JSON.parse(tbEmpresa); // Converte string para objeto
    if (tbEmpresa == null) // Caso não haja conteúdo, iniciamos um vetor vazio
        tbEmpresa = [];
});
function inserirDados() {
    var usuario = JSON.parse(sessionStorage.getItem("secaoUsuario"));
    var codUsuario = String(usuario.idUsuarios);
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/empresa/getEmpresa/"+codUsuario,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        async: false,
        success: function (data) {
            document.getElementById("txtCnpjEmpresa").innerHTML = data.cnpj;
            document.getElementById("txtNomeEmpresa").innerHTML = data.nome;
            document.getElementById("txtEnderecoEmpresa").innerHTML = data.endereco;
            document.getElementById("txtNumeroEmpresa").innerHTML = data.numero;
            document.getElementById("txtBairroEmpresa").innerHTML = data.bairro;
            document.getElementById("txtCidadeEmpresa").innerHTML = data.cidade;
            document.getElementById("txtCepEmpresa").innerHTML = data.cep;

        }, error() {
            document.getElementById("txtCnpjEmpresa").innerHTML = "";
            document.getElementById("txtNomeEmpresa").innerHTML = "";
            document.getElementById("txtEnderecoEmpresa").innerHTML = "";
            document.getElementById("txtNumeroEmpresa").innerHTML = "";
            document.getElementById("txtBairroEmpresa").innerHTML = "";
            document.getElementById("txtCidadeEmpresa").innerHTML = "";
            document.getElementById("txtCepEmpresa").innerHTML = "";
            alert("Erro ao processar a requisição ");
        }
    });



}

function AdicionarEmpresa() {
    var cnpjTemp = $("#cnpjEmpresa").val();
    var cnpj = cnpjTemp.replace("/", "");
    var usuario = JSON.parse(sessionStorage.getItem("secaoUsuario"));
    var codUsuario = String(usuario.idUsuarios);
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/empresa/cadastrar/" +
                cnpj + "/" +
                $("#nomeEmpresa").val() + "/" +
                $("#addressEmpresa").val() + "/" +
                $("#numberEmpresa").val() + "/" +
                $("#districtEmpresa").val() + "/" +
                $("#cityEmpresa").val() + "/" +
                $("#zipCodeEmpresa").val() + "/" +
                codUsuario,

        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
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

            alert("Empresa Cadastrada Com sucesso!");

        }, error() {
            alert("Erro ao processar a requisição ");
        }
    });
}

function EditarCadastrarEmpresa() {
    if (tbEmpresa.length == 0) {
        AdicionarEmpresa();
    } else {
        ExibirEmpresa();
    }
}

function EditarEmpresa() {

    tbEmpresa[0] = JSON.stringify({
        codigo: 1,
        cnpj: $("#cnpjEmpresa").val(),
        nome: $("#nomeEmpresa").val(),
        endereco: $("#addressEmpresa").val(),
        numero: $("#numberEmpresa").val(),
        bairro: $("#districtEmpresa").val(),
        cidade: $("#cityEmpresa").val(),
        cep: $("#zipCodeEmpresa").val()
    }); //Altera o item selecionado na tabela
    localStorage.setItem("tbEmpresa", JSON.stringify(tbEmpresa));
    alert("Informações editadas.");
    operacao = "A"; //Volta ao padrão
    inserirDados();
}

function ExcluirEmpresa() {
    tbEmpresa.splice(0, 1);
    localStorage.setItem("tbEmpresa", JSON.stringify(tbEmpresa));
    alert("Registro excluídoo.");
    inserirDados();
}

function ExibirEmpresa() {
    if (tbEmpresa.length > 0) {
        var empresa = JSON.parse(tbEmpresa[0]);
        $("#idEmpresa").val(empresa.codigo);
        $("#cnpjEmpresa").val(empresa.cnpj);
        $("#nomeEmpresa").val(empresa.nome);
        $("#addressEmpresa").val(empresa.endereco);
        $("#numberEmpresa").val(empresa.numero);
        $("#districtEmpresa").val(empresa.bairro);
        $("#cityEmpresa").val(empresa.cidade);
        $("#zipCodeEmpresa").val(empresa.cep);
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