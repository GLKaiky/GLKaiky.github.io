document.addEventListener('DOMContentLoaded', function() {

    // ===================================
    // LÓGICA PARA O MENU HAMBURGER
    // ===================================
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            document.body.classList.toggle("nav-open");
        });
    }

    // ===================================
    // LÓGICA PARA FECHAR O MENU AO CLICAR EM UM LINK
    // ===================================
    // <<< ALTERAÇÃO CHAVE AQUI >>>
    // Selecionamos todos os links que devem fechar o menu.
    // Usamos ":not(.dropdown-toggle)" para EXCLUIR o link "Projetos" desta lógica.
    // Assim, apenas os links "finais" fecharão o menu mobile.
    document.querySelectorAll(".nav-link:not(.dropdown-toggle), .dropdown-menu a").forEach(link => {
        link.addEventListener("click", () => {
            // Se o menu mobile estiver ativo, fecha ele.
            if (navMenu.classList.contains("active")) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.classList.remove("nav-open");
            }
        });
    });
    
    // ===================================
    // LÓGICA PARA O EFEITO DE SCROLL NA NAVBAR
    // ===================================
    const header = document.querySelector(".header");
    if (header) {
        window.addEventListener("scroll", function() {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    // ===================================
    // LÓGICA PARA O DROPDOWN DE PROJETOS
    // (Esta parte já estava correta)
    // ===================================
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdownContainer = document.querySelector('.nav-item.dropdown');

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(event) {
            // Previne que o link '#' do toggle cause um salto na página
            event.preventDefault();
            // Impede que o evento de clique "borbulhe" para o window,
            // o que fecharia o menu imediatamente.
            event.stopPropagation(); 
            dropdownMenu.classList.toggle('show');
        });
    }

    // Fecha o dropdown se o usuário clicar fora dele
    window.addEventListener('click', function(event) {
        // Verifica se o dropdown está aberto e se o clique não foi dentro do container do dropdown
        if (dropdownMenu && dropdownMenu.classList.contains('show') && !dropdownContainer.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
});