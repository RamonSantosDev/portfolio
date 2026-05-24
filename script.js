// Seleciona o botão da página
const botao = document.querySelector(".botaomais");

// Seleciona a seção de projetos
const menu = document.querySelector(".projects");

// Executa quando o botão for clicado
botao.addEventListener("click", () => {

  // Mostra ou oculta os projetos
  menu.classList.toggle("hidden");

  // Altera o texto do botão conforme o estado da seção
  if (menu.classList.contains("hidden")) {
    botao.textContent = "Ver mais projetos";
  } else {
    botao.textContent = "Ver menos";
  }
});

    // ── Menu hambúrguer ──
    const btn = document.querySelector('.menu-btn');
    const nav = document.querySelector('.nav');

    btn.addEventListener('click', () => {
        nav.classList.toggle('aberto');
    });

    // ── Link ativo por seção ──
    const secoes = document.querySelectorAll('section'); // pega todas as sections
    const links = document.querySelectorAll('.nav a');

    const observer = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                // Remove .ativo de todos
                links.forEach(link => link.classList.remove('ativo'));

                // Adiciona .ativo no link correspondente
                const id = entrada.target.id;
                const linkAtivo = document.querySelector(`.nav a[href="#${id}"]`);
                if (linkAtivo) linkAtivo.classList.add('ativo');
            }
        });
    }, {
        threshold: 0.5 // seção precisa estar 50% visível para ativar
    });

    secoes.forEach(secao => observer.observe(secao));


