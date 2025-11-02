document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================
    // 1. LÓGICA DO MENU HAMBURGER (Mobile)
    // ==========================================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleNav = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    };

    hamburger.addEventListener('click', toggleNav);

    // Fecha o menu ao clicar em um link (útil no mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleNav();
            }
        });
    });

    // ==========================================================
    // 2. LÓGICA DO HEADER (Scroll)
    // ==========================================================
    let lastScrollY = window.scrollY;
    const header = document.querySelector('.header');
    const scrollThreshold = 100; // Distância antes de esconder

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Efeito "scrolled" (blur/sombra)
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Efeito "esconder ao rolar para baixo"
        if (currentScrollY <= scrollThreshold) {
            header.classList.remove('is-hidden');
        } else {
            if (currentScrollY > lastScrollY) {
                header.classList.add('is-hidden');
            } else {
                header.classList.remove('is-hidden');
            }
        }
        lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
    });

    // ==========================================================
    // 3. ANIMAÇÃO DE SCROLL (Intersection Observer)
    // ==========================================================
    const cards = document.querySelectorAll('.bento-card, .post-card');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Gatilho com 10% de visibilidade
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Elemento está entrando na tela: ADICIONA a classe
                entry.target.classList.add('is-visible');
            } else {
                // Elemento está saindo da tela: REMOVE a classe
                entry.target.classList.remove('is-visible'); /* <-- MUDANÇA AQUI */
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    cards.forEach(card => {
        observer.observe(card);
    });

    // ==========================================================
    // 4. LÓGICA DO MODAL DE PROJETOS (Corrigida e Completa)
    // ==========================================================

    // Seleciona todos os gatilhos
    const modalTriggers = document.querySelectorAll('.modal-trigger');

    // Seleciona os elementos principais do modal
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // Seleciona os elementos DENTRO do modal que vamos preencher
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalStack = document.getElementById('modal-stack');
    const modalDetails = document.getElementById('modal-details');
    const modalGithubLink = document.getElementById('modal-github-link');
    
    // Novos seletores para Informações do Projeto
    const modalProjectType = document.getElementById('modal-project-type');
    const modalCollaboratorsContainer = document.getElementById('modal-collaborators-container');
    const modalCollaboratorsList = document.getElementById('modal-collaborators-list');

    // Função para abrir o modal
    function openModal() {
        if (modalOverlay) modalOverlay.classList.add('active');
    }

    // Função para fechar o modal
    function closeModal() {
        if (modalOverlay) modalOverlay.classList.remove('active');
    }

    // Adiciona um "ouvinte" de clique para cada card de projeto
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            
            // 1. Pega os dados do card clicado
            const img = trigger.querySelector('.card-image');
            const title = trigger.querySelector('h2').innerText;
            const subtitle = trigger.querySelector('p').innerText;
            
            // 2. Pega os dados dos 'data-attributes'
            const longDesc = trigger.dataset.longDesc;
            const stackString = trigger.dataset.stack;
            const githubLink = trigger.dataset.githubLink;
            const projectType = trigger.dataset.projectType;
            const collaboratorsString = trigger.dataset.collaborators;

            // 3. Preenche o modal com os dados
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modalTitle.innerText = title;
            modalSubtitle.innerText = subtitle;
            modalGithubLink.href = githubLink;
            modalDetails.innerHTML = longDesc; // Usando .innerHTML para o link <a> funcionar

            // 4. Limpa e cria as tags de tecnologia (CÓDIGO RESTAURADO)
            modalStack.innerHTML = ''; // Limpa tags anteriores
            if (stackString) {
                const stackArray = stackString.split(',').map(item => item.trim());
                
                stackArray.forEach(tech => {
                    const tag = document.createElement('span');
                    tag.className = 'stack-tag';
                    tag.innerText = tech;
                    modalStack.appendChild(tag);
                });
            }

            // 5. Preenche as Informações do Projeto (Tipo e Colaboradores)
            modalProjectType.innerText = projectType || 'Não especificado';
            modalCollaboratorsList.innerHTML = ''; // Limpa lista antiga
            
            if (projectType === 'Em Grupo' && collaboratorsString) {
                modalCollaboratorsContainer.style.display = 'block'; // Mostra o container

                const collaboratorsArray = collaboratorsString.split(',');

                collaboratorsArray.forEach(collab => {
                    // Remove espaços em branco antes de dividir
                    const cleanCollab = collab.trim();
                    if (!cleanCollab) return; // Pula se for um item vazio

                    const [name, link] = cleanCollab.split(':');
                    
                    if (name && link) {
                        const a = document.createElement('a');
                        a.innerText = name.trim();
                        a.href = link.trim();
                        a.target = '_blank';
                        a.rel = 'noopener noreferrer';
                        modalCollaboratorsList.appendChild(a);
                    }
                });

            } else {
                modalCollaboratorsContainer.style.display = 'none'; // Esconde se for "Solo"
            }

            // 6. Finalmente, abre o modal
            openModal();
        });
    });

    // Adiciona evento de clique para fechar o modal
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    }

}); // Fim do DOMContentLoaded