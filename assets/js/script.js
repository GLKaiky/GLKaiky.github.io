// ==========================================================
// 3. ANIMAÇÃO DE SCROLL (Intersection Observer Reversível)
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {

    const cards = document.querySelectorAll('.bento-card, .post-card');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        // O threshold agora é um array. 
        // Isso ajuda a garantir que a animação dispare de forma consistente
        // ao entrar e ao sair.
        threshold: 0.1 
    };

    // A função que será chamada
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Elemento está entrando na tela: ADICIONA a classe
                entry.target.classList.add('is-visible');
            } else {
                // Elemento está saindo da tela: REMOVE a classe
                entry.target.classList.remove('is-visible');
            }
        });
    };

    // Cria o observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Manda o observer "observar" cada card
    cards.forEach(card => {
        observer.observe(card);
    });


    let lastScrollY = window.scrollY; 
    const header = document.querySelector('.header');
    // Distância (em pixels) que o usuário precisa rolar antes do header sumir
    const scrollThreshold = 100; 

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY <= scrollThreshold) {
            // Se estivermos perto do topo, sempre mostrar o header
            header.classList.remove('is-hidden');
        } else {
            if (currentScrollY > lastScrollY) {
                // Rolando para BAIXO: esconder o header
                header.classList.add('is-hidden');
            } else {
                // Rolando para CIMA: mostrar o header
                header.classList.remove('is-hidden');
            }
        }

        // Atualiza a última posição do scroll
        lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
    });

});