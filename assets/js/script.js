document.addEventListener("DOMContentLoaded", function() {
    const senhaInput = document.getElementById('senha');
    const olho = document.getElementById('togglePassword');

    olho.addEventListener('click', function() {
        let inputTypePassword = senhaInput.type == "password";

        if (inputTypePassword) {
            showPassword();
            olho.setAttribute("name", "eye-outline");
        } else {
            hidePassword();
            olho.setAttribute("name", "eye-off-outline");
        }
    });

    function showPassword(){
        senhaInput.setAttribute("type", "text");
    }

    function hidePassword(){
        senhaInput.setAttribute("type", "password");
    }

    const dataNascimentoInput = document.getElementById('datadenascimento');

    dataNascimentoInput.addEventListener('change', function() {
        // Obtém a data de nascimento inserida pelo usuário
        let dataNascimento = new Date(dataNascimentoInput.value);
        
        // Obtém a data atual
        let dataAtual = new Date();

        // Calcula a idade da pessoa
        let idade = dataAtual.getFullYear() - dataNascimento.getFullYear();

        if (idade < 12) {
            alert("Você deve ter pelo menos 12 anos de idade.");
            dataNascimentoInput.value = ""; // Limpa o valor do campo
        }
    });


});

