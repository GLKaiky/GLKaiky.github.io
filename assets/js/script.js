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

    // LÓGICA SIMPLIFICADA: Apenas fecha o menu ao clicar em um link.
    // A rolagem suave agora é controlada pelo CSS.
    document.querySelectorAll(".nav-link, .dropdown-menu a").forEach(link => {
        link.addEventListener("click", () => {
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
    if (header) { // Boa prática verificar se o header existe
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
    // ===================================
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(event) {
            // Previne que o link '#' do toggle cause um salto na página
            event.preventDefault();
            dropdownMenu.classList.toggle('show');
        });
    }

    // Fecha o dropdown se o usuário clicar fora dele
    window.addEventListener('click', function(event) {
        if (dropdownMenu && dropdownMenu.classList.contains('show') && !event.target.closest('.dropdown')) {
            dropdownMenu.classList.remove('show');
        }
    });
});