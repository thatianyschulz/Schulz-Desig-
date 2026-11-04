/**
 * SCHULZ DESIGÑ — INTERACTIVE ENGINE
 * Estúdio de Design & Presença Digital | Thatiany Schulz
 * Clean Vanilla JavaScript (ES6+) for Accessibility, Modals, Filter & Lenis Scroll
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 0. LENIS SMOOTH SCROLL (FÍSICA TÁTIL EDITORIAL)
  // --------------------------------------------------------------------------
  let lenisInstance = null;
  if (typeof Lenis !== 'undefined') {
    lenisInstance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Navegação suave com Lenis ao clicar em links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenisInstance.scrollTo(targetEl, { offset: -70 });
          }
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 1. HEADER SCROLL & SCROLLSPY
  // --------------------------------------------------------------------------
  const headerNav = document.querySelector('.header-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    const scrollY = window.pageYOffset;

    // Header background blur on scroll
    if (scrollY > 40) {
      headerNav.classList.add('scrolled');
    } else {
      headerNav.classList.remove('scrolled');
    }

    // Scrollspy navigation highlight
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --------------------------------------------------------------------------
  // 2. MOBILE NAVIGATION MENU
  // --------------------------------------------------------------------------
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileToggle.classList.toggle('open');
      navMenu.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        mobileToggle.classList.remove('open');
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.focus();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. PROJECTS FILTER TABS
  // --------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || (category && category.includes(filterValue))) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 4. ACCESSIBLE CASE STUDY MODAL
  // --------------------------------------------------------------------------
  const modalOverlay = document.getElementById('caseModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const caseTriggers = document.querySelectorAll('[data-open-case]');
  let lastActiveElement = null;

  // Case Data Dictionary
  const casesData = {
    'flordibanho': {
      tag: 'Identidade Visual • E-commerce • Embalagens',
      title: 'Flor di Banho — Saboaria Artesanal & Loja Virtual',
      banner: 'assets/images/flor-di-banho-preview.jpg',
      challenge: 'A Flor di Banho necessitava de um posicionamento de marca acolhedor e visualmente refinado para se destacar no segmento de cosméticos naturais na Baixada Santista e em todo o Brasil.',
      process: 'Concepção do conceito de branding, paleta cromática pastel e aconchegante, tipografia personalizada, design de embalagens e rótulos técnicos para impressão, criação da mascote Flora em 3D e estruturação da loja virtual na Nuvemshop.',
      metrics: [
        { val: '+35%', label: 'Crescimento em vendas online diretas' },
        { val: '100%', label: 'Ecossistema visual padronizado' },
        { val: 'Omnichannel', label: 'Embalagens físicas e e-commerce' }
      ],
      solution: 'Identidade visual encantadora, catálogo digital completo, rótulos personalizados e integração de frete e pagamento online com checkout simplificado.',
      liveUrl: 'https://flordibanho.lojavirtualnuvem.com.br/',
      liveLabel: 'Acessar Loja Virtual Oficial'
    },
    'vagation': {
      tag: 'UI/UX Design • Design System • Mobilidade Urbana',
      title: 'Vagation — Otimização de Vagas Urbanas em Tempo Real',
      banner: 'assets/images/vagation-mockup.svg',
      challenge: 'Encontrar vagas nas cidades consome tempo, gera estresse e amplia a emissão de carbono. O desafio foi criar uma experiência intuitiva que conecte motoristas a vagas disponíveis em tempo real.',
      process: 'Pesquisa com motoristas e comerciantes locais. Prototipagem navegável em baixa e alta fidelidade no Figma, estruturando um Design System completo com conformidade de contraste WCAG AA para visualização sob luz solar direta.',
      metrics: [
        { val: '-45%', label: 'Tempo médio de busca de vagas' },
        { val: '80%', label: 'Aprovação de wireframes na 1ª rodada' },
        { val: 'WCAG AA', label: 'Conformidade de acessibilidade' }
      ],
      solution: 'Interface com mapa dinâmico, pins codificados por disponibilidade de cores acessíveis, busca preditiva e sistema de reserva rápida.',
      liveUrl: 'https://www.figma.com/proto/oEWsosNTJm387iGdGd3kN7/Vagation-App?page-id=0%3A1&node-id=224-741&p=f&viewport=-931%2C713%2C0.36&t=EsL6zsdcU3TJ7YIp-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=10%3A572&show-proto-sidebar=1',
      liveLabel: 'Abrir Protótipo Interativo no Figma'
    },
    'gonzaga': {
      tag: 'Double Diamond • Redesign de Portal Imobiliário',
      title: 'Gonzaga Imóveis — Busca Fluida e Agendamento em Santos',
      banner: 'assets/images/gonzaga-mockup.svg',
      challenge: 'O portal anterior sofria com excesso de campos, filtros desordenados e abandono de visitantes na busca por imóveis na Baixada Santista.',
      process: 'Aplicação da metodologia Double Diamond: imersão com compradores e corretores, redesenho da arquitetura de informação e prototipagem com testes de usabilidade no Figma.',
      metrics: [
        { val: '+60%', label: 'Eficiência de busca com novos filtros' },
        { val: '+25%', label: 'Leads qualificados para os corretores' },
        { val: '100%', label: 'Design System componentizado no Figma' }
      ],
      solution: 'Redesenho total da busca: listagem e mapa sincronizados, card com especificações instantâneas e botão de agendamento de visita direto pelo WhatsApp.',
      liveUrl: 'https://www.figma.com/proto/T4s0XryrxKQWjKF0qE5wx5/Gonzaga-Im%C3%B3veis?page-id=0%3A1&node-id=103-77&p=f&viewport=910%2C859%2C0.09&t=PmvbCeIbRf9Ej8D8-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=104%3A140',
      liveLabel: 'Abrir Protótipo Interativo no Figma'
    },
    'branding': {
      tag: 'Identidade Visual • Tipografia • Papelaria Nobre',
      title: 'Identidades Visuais para Negócios & Cartões Estratégicos',
      banner: 'assets/images/branding-mockup.svg',
      challenge: 'Profissionais autônomos e empresas de diversos segmentos necessitavam de posicionamento visual marcante para transmitir credibilidade imediata.',
      process: 'Alinhamento de público-alvo, desenho de símbolos e tipografia personalizada, seleção cromática funcional e preparação técnica de arquivos para acabamentos gráficos especiais.',
      metrics: [
        { val: '15+', label: 'Projetos autorais entregues' },
        { val: '95%', label: 'Satisfação comprovada' },
        { val: '0%', label: 'Erros em fechamento de arquivos' }
      ],
      solution: 'Marcas memoráveis e papelarias institucionais que posicionam o negócio com autoridade imediata frente à concorrência.',
      liveUrl: 'cartoes.html',
      liveLabel: 'Ver Galeria de Cartões e Marcas'
    },
    'pizzaria': {
      tag: 'Gastronomia • Cardápio Estratégico • QR Code',
      title: 'Pizzaria 4 Irmãos — Cardápio, Folder & Acesso Online',
      banner: 'assets/images/branding-mockup.svg',
      challenge: 'A Pizzaria 4 Irmãos necessitava modernizar seu atendimento físico e delivery, destacando produtos de maior margem e facilitando o acesso ao cardápio sem custos repetitivos de reimpressão.',
      process: 'Hierarquização visual de itens e sabores especiais, elaboração de folder promocional para entrega no bairro e geração de QR Code inteligente para acesso instantâneo ao cardápio digital via celular.',
      metrics: [
        { val: '+20%', label: 'Aumento no ticket médio dos pedidos' },
        { val: '100%', label: 'Acesso instantâneo via QR Code' },
        { val: '0', label: 'Necessidade de baixar apps pesados' }
      ],
      solution: 'Cardápio moderno, folder promocional de alta conversão e QR Code configurado para celular.',
      liveUrl: '#contato',
      liveLabel: 'Solicitar Projeto Gastronômico'
    }
  };

  const openCaseModal = (caseId) => {
    const data = casesData[caseId];
    if (!data) return;

    lastActiveElement = document.activeElement;

    document.getElementById('modalCaseTag').textContent = data.tag;
    document.getElementById('modalCaseTitle').textContent = data.title;
    document.getElementById('modalCaseBanner').src = data.banner;
    document.getElementById('modalCaseBanner').alt = data.title;
    document.getElementById('modalCaseChallenge').textContent = data.challenge;
    document.getElementById('modalCaseProcess').textContent = data.process;
    document.getElementById('modalCaseSolution').textContent = data.solution;

    // Metrics container
    const metricsContainer = document.getElementById('modalCaseMetrics');
    metricsContainer.innerHTML = '';

    data.metrics.forEach(m => {
      const card = document.createElement('div');
      card.className = 'modal-metric-card';
      card.innerHTML = `
        <div class="modal-metric-val">${m.val}</div>
        <div class="modal-metric-label">${m.label}</div>
      `;
      metricsContainer.appendChild(card);
    });

    const liveBtn = document.getElementById('modalCaseLiveBtn');
    liveBtn.href = data.liveUrl;
    liveBtn.textContent = `${data.liveLabel} ↗`;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    modalCloseBtn.focus();
  };

  const closeCaseModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  };

  caseTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const caseId = btn.getAttribute('data-open-case');
      openCaseModal(caseId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeCaseModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeCaseModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeCaseModal();
    }
  });

  // --------------------------------------------------------------------------
  // 5. CLIPBOARD COPY UTILITY & TOAST NOTIFICATION
  // --------------------------------------------------------------------------
  const copyButtons = document.querySelectorAll('[data-copy]');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`📋 Copiado: ${textToCopy}`);
        }).catch(() => {
          fallbackCopyText(textToCopy);
        });
      } else {
        fallbackCopyText(textToCopy);
      }
    });
  });

  function fallbackCopyText(text) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    tempInput.style.position = 'fixed';
    tempInput.style.left = '-9999px';
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast(`📋 Copiado: ${text}`);
    } catch (err) {
      showToast('Não foi possível copiar automaticamente.');
    }
    document.body.removeChild(tempInput);
  }

  // Toast System
  let toastTimeout = null;
  const toastElement = document.getElementById('toastNotice');

  function showToast(message) {
    if (!toastElement) return;

    toastElement.querySelector('.toast-msg').textContent = message;
    toastElement.classList.add('show');

    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    toastTimeout = setTimeout(() => {
      toastElement.classList.remove('show');
    }, 3500);
  }
});
