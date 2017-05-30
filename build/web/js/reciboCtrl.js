

function gerarRecibo() {
    window.open("./reciboProtocolo.html", "blank");
}

function populaRecibo (){
    var dadosRecibo = JSON.parse(sessionStorage.getItem("dadosRecibo"));
    
    $("#recNumProtocolo").html(dadosRecibo.dadosProtocoloCod);
    $("#recNomeEmpresa").html(dadosRecibo.dadosEmpresaNome);
    $("#recEnderecoEmpresa").html(dadosRecibo.dadosEmpresaEndereco +" nº " +
            dadosRecibo.dadosEmpresaNumero +", "+ dadosRecibo.dadosEmpresaBairro);
    $("#recCnpjEmpresa").html(dadosRecibo.dadosEmpresaCnpj);
    $("#recObservacoes").html(dadosRecibo.dadosProtocoloObservacoes);
    $("#recNomeCliente").html(dadosRecibo.dadosClienteNome);
        passarItensProtocoloRecibo(dadosRecibo.dadosProtocoloCod);
    
}