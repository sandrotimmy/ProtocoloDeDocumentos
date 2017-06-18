
//Gera o Recibo a partir do codigo do Protocolo recebido como parametro
function gerarRecibo(codProtocolo) {
    window.sessionStorage.setItem("codProtocoloRecibo", codProtocolo);
    window.open("./reciboProtocolo.html", "blank");
}
//Popula o recibo com os dados recebidos
function populaRecibo() {
    cod = window.sessionStorage.getItem("codProtocoloRecibo");
    $.ajax({
        type: "POST",
        url: "webresources/WSProtocoloRest/protocolo/getProtocolo/" + cod,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            if (data != null) {
                var cnpjTemp = data.empresaProtocolo.cnpj;
                var cnpj = cnpjTemp.substr(0, 2) + "." + cnpjTemp.substr(2, 3) + "." + cnpjTemp.substr(5, 3) + "/" + cnpjTemp.substr(8, 4) + "-" + cnpjTemp.substr(12, 2);
                $("#recNumProtocolo").html(data.idProtocolo);
                $("#recNomeEmpresa").html(data.empresaProtocolo.nome);
                $("#recEnderecoEmpresa").html(data.empresaProtocolo.endereco + " nº " +
                        data.empresaProtocolo.numero + ", " + data.empresaProtocolo.bairro);
                $("#recCnpjEmpresa").html(cnpj);
                $("#recObservacoes").html(data.observacoes);
                $("#recNomeCliente").html(data.clienteProtocolo.nome);
                passarItensProtocoloRecibo(data.idProtocolo);
            }
        }
    });
}