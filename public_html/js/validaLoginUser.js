//Agoritimo para desabilitar botões submit

//Faz o botão submit do cadastro de usuario e de login ficarem desabilitados no carregamento
$(document).ready(function() { 
    $('#buttonSubmitRegister').prop('disabled', true); 
    $('#buttonEnter').prop('disabled', true);
});

//Botão do cadastro de usuario
//Faz o botão submit do cadastro de usuario ficar desabilitados
$(document).keyup(function() {
    if ($("#txtNome").val().length <= 4 || (! $("#txtEmail").val().match(/[^@]+@[^@]+\.[^@]+/)) || $("#txtSenha").val().length <= 4){
        $(document).ready(function() {
        $('#buttonSubmitRegister').prop('disabled', true);
        });
    }

//Habilita o botão submit do cadastro de usuario
    if ($("#txtNome").val().length > 4 && $("#txtEmail").val().match(/[^@]+@[^@]+\.[^@]+/) && $("#txtSenha").val().length > 4){
        $(document).ready(function() {
        $('#buttonSubmitRegister').prop('disabled', false);
        });   
    }   
});

//Algoritmo para avisos dos campos de preenchimento
$(document).keyup(function() {
//verifica nome de usuario
    $("#txtNome").blur(function() {
        if ($("#txtNome").val().length < 5) {
            $("#txtNome").css('background', '#fb4745');
            $("#alertUsu").show('fast')
            $("#alertUsu").text('O campo nome deve ter ao menos 5 caracteres');  

        }
        if ($("#txtNome").val().length >= 5) {
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
        if ($("#txtSenha").val().length < 5) {
            $("#txtSenha").css('background', '#fb4745');
            $("#alertSenha").show('fast')
            $("#alertSenha").text('O campo senha deve ter ao menos 5 caracteres');  

        }
        if ($("#txtSenha").val().length >= 5) {
            $("#txtSenha").css('background', '#6ebe51'); 
            $("#alertSenha").hide('fast');
        } 
    });
});

//Botão de login
//Faz o botão submit do login ficar desabilitado se os campos tiverem menos de 1 caractere
$(document).keyup(function() {
    if ($("#txtUsuario").val().length <= 4 || $("#txtPassword").val().length <= 4){
        $(document).ready(function() {
        $('#buttonEnter').prop('disabled', true);
        });
    }

//Habilita o botão submit do login se os campos tiverem mais de 1 caractere
    if ($("#txtUsuario").val().length > 4 && $("#txtPassword").val().length > 4){
        $(document).ready(function() {
        $('#buttonEnter').prop('disabled', false);
        });   
    }   
}); 

//Algoritmo para avisos do campo de login
$(document).keyup(function() {
//verifica nome de usuario
    $("#txtUsuario").blur(function() {
        if ($("#txtUsuario").val().length < 5) {
            $("#txtUsuario").css('background', '#fb4745');
        }
        if ($("#txtUsuario").val().length >= 5) {
            $("#txtUsuario").css('background', '#6ebe51'); 
        } 
    });

//verifica email
    $("#txtPassword").blur(function() {
        if ($("#txtPassword").val().length < 5) {
            $("#txtPassword").css('background', '#fb4745');  
        }
        if ($("#txtPassword").val().length >= 5) {
            $("#txtPassword").css('background', '#6ebe51'); 
        } 
    });
});