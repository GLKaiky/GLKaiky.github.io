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
    document.querySelectorAll(".nav-link:not(.dropdown-toggle), .dropdown-menu a").forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu && navMenu.classList.contains("active")) { // Verifica se navMenu existe antes de usar
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
    // ===================================
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdownContainer = document.querySelector('.nav-item.dropdown');

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation(); 
            dropdownMenu.classList.toggle('show');
        });
    }

    window.addEventListener('click', function(event) {
        if (dropdownMenu && dropdownMenu.classList.contains('show') && dropdownContainer && !dropdownContainer.contains(event.target)) { // Adicionado verificação para dropdownContainer
            dropdownMenu.classList.remove('show');
        }
    });

    // ===================================
    // LÓGICA DO MODO CLARO/ESCURO
    // ===================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme'); // Pega o tema salvo

    // Função para aplicar o tema
    function applyTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-theme');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>'; // Ícone de sol
            themeToggleBtn.setAttribute('aria-label', 'Alternar para tema escuro');
        } else {
            body.classList.remove('light-theme');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>'; // Ícone de lua
            themeToggleBtn.setAttribute('aria-label', 'Alternar para tema claro');
        }
    }

    // Aplica o tema salvo ao carregar a página
    if (currentTheme) {
        applyTheme(currentTheme);
    } else {
        // Se não houver tema salvo, verifica a preferência do sistema
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyTheme('dark'); // Padrão se o sistema preferir escuro
        } else {
            applyTheme('light'); // Padrão se o sistema preferir claro ou nenhum
        }
    }

    // Event Listener para o botão de alternância
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (body.classList.contains('light-theme')) {
                applyTheme('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                applyTheme('light');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});
