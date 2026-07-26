document.addEventListener("DOMContentLoaded", () => {
    
    // ── 1. BOTÃO "VER MAIS" (PROJETOS) ──
    const botaoMais = document.querySelector(".botaomais");
    const containerProjetos = document.querySelector(".projects");

    // Verifica se os elementos existem na página antes de aplicar o evento
    if (botaoMais && containerProjetos) {
        botaoMais.addEventListener("click", () => {
            // Mostra ou oculta os projetos extras
            containerProjetos.classList.toggle("hidden");

            // Altera o texto do botão conforme o estado da seção
            if (containerProjetos.classList.contains("hidden")) {
                botaoMais.textContent = "Ver mais projetos";
            } else {
                botaoMais.textContent = "Ver menos";
            }
        });
    }


    // ── 2. MENU HAMBÚRGUER (MOBILE) ──
    const btnMenu = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('.nav');

    if (btnMenu && navMenu) {
        btnMenu.addEventListener('click', () => {
            navMenu.classList.toggle('aberto');
        });
    }


    // ── 3. LINK ATIVO NO MENU POR SEÇÃO (SCROLL) ──
    const secoes = document.querySelectorAll('section');
    const linksNav = document.querySelectorAll('.nav a');

    const observerLinks = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                // Remove a classe ativo de todos os links
                linksNav.forEach(link => link.classList.remove('ativo'));

                // Adiciona a classe ativo no link correspondente à seção atual
                const idSeacao = entrada.target.id;
                const linkAtivo = document.querySelector(`.nav a[href="#${idSeacao}"]`);
                if (linkAtivo) {
                    linkAtivo.classList.add('ativo');
                }
            }
        });
    }, {
        threshold: 0.5 // Seção precisa estar 50% visível na tela
    });

    secoes.forEach(secao => observerLinks.observe(secao));


    // ── 4. EFEITO DE REVELAÇÃO DE SEÇÕES (SCROLL REVEAL) ──
    const elementosScroll = document.querySelectorAll(".scroll-oculto");

    const observerScroll = new IntersectionObserver((entradas, observador) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("revelar");
                observador.unobserve(entrada.target); // Para de monitorar após animar uma vez
            }
        });
    }, {
        root: null,
        rootMargin: "0px 0px -15% 0px" // Dispara o efeito antes do elemento entrar totalmente
    });

    elementosScroll.forEach(el => observerScroll.observe(el));

});

