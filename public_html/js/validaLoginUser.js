//Agoritimo para desabilitar botões submit

//Faz o botão submit do cadastro de usuario e de login ficarem desabilitados no carregamento
$(document).ready(function() { 
    $('#buttonSubmitRegister').prop('disabled', true); 
    $('#buttonEnter').prop('disabled', true);
});


//Botão do cadastro de usuario
//Faz o botão submit do cadastro de usuario ficar desabilitados
$(document).keyup(function() {
    var nameUsu = $("#txtNome").val().length;
    var usuSenha = $("#txtSenha").val().length;
    if (nameUsu <= 4 || (! $("#txtEmail").val().match(/[^@]+@[^@]+\.[^@]+/)) || usuSenha <= 4){
        $(document).ready(function() {
        $('#buttonSubmitRegister').prop('disabled', true);
        });
    }else {
        $('#buttonSubmitRegister').prop('disabled', false);    
    }

    //verifica nome de usuario
    $("#txtNome").blur(function() {
        var nameUsu = $("#txtNome").val().length;
        if (nameUsu < 5) {
            $("#txtNome").css('background', '#fb4745');
            $("#alertUsu").show('fast')
            $("#alertUsu").text('O campo nome deve ter ao menos 5 caracteres');  
        }else{
            $("#txtNome").css('background', '#6ebe51'); 
            $("#alertUsu").hide('fast');
        }        
    });

//verifica email
    
    $("#txtEmail").blur(function() {
        if ($("#txtEmail").val().match(/[^@]+@[^@]+\.[^@]+/)) {
        $("#txtEmail").css('background', '#6ebe51'); 
        $("#alertEmail").hide('fast');
        }    
        else {
            $("#txtEmail").css('background', '#fb4745');
            $("#alertEmail").show('fast')
            $("#alertEmail").text('Preencha o campo com um email valido');  
        }
        
    });

//verifica senha
    $("#txtSenha").blur(function() {
        var usuSenha = $("#txtSenha").val().length;
        if (usuSenha < 5) {
            $("#txtSenha").css('background', '#fb4745');
            $("#alertSenha").show('fast')
            $("#alertSenha").text('O campo senha deve ter ao menos 5 caracteres');  
        }else {
            $("#txtSenha").css('background', '#6ebe51');
            $("#alertSenha").hide('fast');    
        }
    });  


    //Botão de Login
    //Faz o botão submit do login ficar desabilitado se os campos tiverem menos de 5 caracteres
    var campLog = $("#txtUsuario").val().length;
    var campSenha = $("#txtPassword").val().length;

    if (campLog <= 4 || campSenha <= 4){
        $(document).ready(function() {
        $('#buttonEnter').prop('disabled', true);
        });
    }else {
        $('#buttonEnter').prop('disabled', false);    
    }

//Algoritmo para avisos do campo de login
//verifica nome de usuario
    $("#txtUsuario, #txtPassword").blur(function() {
        if (campLog <= 4) {
            $("#txtUsuario").css('background', '#fb4745');
        }else {
            $("#txtUsuario").css('background', '#6ebe51'); 
        } 
        if (campSenha <= 4) {
            $("#txtPassword").css('background', '#fb4745');
        }else {
            $("#txtPassword").css('background', '#6ebe51'); 
        } 
    });
});