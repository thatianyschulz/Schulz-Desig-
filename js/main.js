/**
 * THATIANY SCHULZ & SCHULZ DESIGÑ — INTERACTIVE ENGINE
 * Clean Vanilla JavaScript (ES6+) for Accessibility, Modals & Persona Switching
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. HEADER SCROLL & ACTIVE SCROLLSPY
  // --------------------------------------------------------------------------
  const headerNav = document.querySelector('.header-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    const scrollY = window.pageYOffset;

    // Header background blur on scroll
    if (scrollY > 50) {
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
      navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        mobileToggle.classList.remove('open');
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.focus();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. STRATEGIC PERSONA SWITCHER (GERAL / RECRUTADOR / CLIENTE)
  // --------------------------------------------------------------------------
  const personaButtons = document.querySelectorAll('.persona-btn');
  const body = document.body;

  personaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode');

      personaButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      body.classList.remove('persona-all', 'persona-recruiter', 'persona-client');

      if (mode === 'recruiter') {
        body.classList.add('persona-recruiter');
        showToast('🎯 Modo Recrutador ativado: métricas de UX, Design Systems e CV em destaque.');
      } else if (mode === 'client') {
        body.classList.add('persona-client');
        showToast('💼 Modo Comercial ativado: serviços da Schulz Desigñ e proposta rápida destacados.');
      } else {
        body.classList.add('persona-all');
        showToast('✨ Visão geral ativada.');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 4. PROJECTS FILTER TABS
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
        if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
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
  // 5. CASE STUDY MODAL DIALOGS (ACCESSIBLE)
  // --------------------------------------------------------------------------
  const modalOverlay = document.getElementById('caseModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const caseTriggers = document.querySelectorAll('[data-open-case]');
  let lastActiveElement = null;

  // Case Data Dictionary
  const casesData = {
    'vagation': {
      tag: 'UI/UX & Mobile App • Mapa Colaborativo',
      title: 'Vagation — Otimização de Vagas Urbanas em Tempo Real',
      banner: 'assets/images/vagation-mockup.svg',
      challenge: 'Encontrar vagas de estacionamento nas grandes cidades consome tempo, gera estresse e amplia a emissão de carbono. O desafio foi criar uma experiência intuitiva que conecte motoristas em trânsito a vagas liberadas por outros usuários e estabelecimentos comerciais.',
      process: 'Utilização da abordagem de User Research com entrevistas a motoristas urbanos e donos de estacionamentos locais. Construção de personas, mapas de empatia e fluxogramas de decisão rápida. Prototipagem em baixa e alta fidelidade no Figma, estruturando um Design System completo com tokens de acessibilidade e contraste para visualização sob luz solar direta.',
      metrics: [
        { val: '-45%', label: 'Tempo médio de busca de vagas' },
        { val: '80%', label: 'Aprovação de wireframes na 1ª rodada' },
        { val: 'WCAG AA', label: 'Conformidade de contraste no mapa' }
      ],
      solution: 'Interface limpa com mapa interativo, pins codificados por disponibilidade de cores acessíveis, busca preditiva por geolocalização e sistema de reserva instantânea com confirmação de rota com 1 clique.',
      liveUrl: 'https://www.figma.com/proto/oEWsosNTJm387iGdGd3kN7/Vagation-App?page-id=0%3A1&node-id=224-741&p=f&viewport=-931%2C713%2C0.36&t=EsL6zsdcU3TJ7YIp-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=10%3A572&show-proto-sidebar=1',
      liveLabel: 'Abrir Protótipo Interativo no Figma'
    },
    'gonzaga': {
      tag: 'Double Diamond • Redesign de App Imobiliário',
      title: 'Gonzaga Imóveis — Experiência de Busca e Conversão Fluida',
      banner: 'assets/images/gonzaga-mockup.svg',
      challenge: 'O aplicativo anterior sofria com excesso de formulários, filtros confusos e alta taxa de abandono nas buscas por imóveis residenciais e comerciais em Santos/SP.',
      process: 'Aplicação da metodologia Double Diamond: imersão com compradores e corretores, definição dos gargalos de usabilidade, ideação com benchmarking do setor imobiliário global e prototipagem com testes de usabilidade iterativos no Figma.',
      metrics: [
        { val: '+60%', label: 'Eficiência nas buscas com novos filtros' },
        { val: '+25%', label: 'Leads qualificados para corretores' },
        { val: '100%', label: 'Componentização escalável no Figma' }
      ],
      solution: 'Redesign total da arquitetura de informação: visualização em lista e mapa sincronizados, card de imóvel com especificações instantâneas (área, quartos, vagas, condomínio), botão de agendamento de visita via WhatsApp e lista de favoritos.',
      liveUrl: 'https://www.figma.com/proto/T4s0XryrxKQWjKF0qE5wx5/Gonzaga-Im%C3%B3veis?page-id=0%3A1&node-id=103-77&p=f&viewport=910%2C859%2C0.09&t=PmvbCeIbRf9Ej8D8-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=104%3A140',
      liveLabel: 'Abrir Protótipo Interativo no Figma'
    },
    'flordibanho': {
      tag: 'Identidade Visual Completa • E-commerce • Mascote 3D',
      title: 'Flor di Banho — Cosméticos Artesanais & Loja Virtual',
      banner: 'assets/images/flor-di-banho-preview.jpg',
      challenge: 'A Flor di Banho precisava de uma marca com alma acolhedora e estética profissional para se posicionar com destaque no mercado de saboaria e cosméticos artesanais na Baixada Santista e em todo o Brasil.',
      process: 'Concepção do conceito de branding, paleta cromática pastel e aconchegante, tipografia personalizada, design de embalagens e rótulos com especificações técnicas para impressão, criação da mascote Flora em 3D e montagem da loja virtual completa na plataforma Nuvemshop.',
      metrics: [
        { val: '100%', label: 'Ecossistema visual unificado' },
        { val: '+35%', label: 'Aumento em vendas online no lançamento' },
        { val: 'Omnichannel', label: 'Embalagens, social media e e-commerce' }
      ],
      solution: 'Identidade visual encantadora, catálogo digital de produtos, rótulos personalizados, vídeos com a mascote Flora e integração de pagamento e frete online.',
      liveUrl: 'https://flordibanho.lojavirtualnuvem.com.br/',
      liveLabel: 'Acessar Loja Virtual Oficial'
    },
    'branding': {
      tag: 'Branding • Design Gráfico • Materiais Impressos',
      title: 'Identidades Visuais & Cartões de Visita Estratégicos',
      banner: 'assets/images/branding-mockup.svg',
      challenge: 'Profissionais autônomos e empresas de diversos segmentos (advocacia, mecânica, engenharia, cosméticos) necessitavam de posicionamento visual marcante que transmitisse credibilidade imediata no primeiro contato físico e digital.',
      process: 'Entrevistas de alinhamento de público-alvo, criação de símbolos e logotipos únicos, seleção de paletas funcionais e tipografia, preparação de mockups realistas e fechamento rigoroso de arquivos em CMYK para acabamentos especiais (hot stamping, verniz localizado, laminação fosca).',
      metrics: [
        { val: '15+', label: 'Identidades e projetos entregues' },
        { val: '95%', label: 'Satisfação dos clientes' },
        { val: '0%', label: 'Erros de fechamento gráfico' }
      ],
      solution: 'Materiais com estética refinada que diferenciam os clientes da concorrência e fortalecem o valor percebido de seus serviços.',
      liveUrl: '#contato',
      liveLabel: 'Solicitar Projeto de Identidade'
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
      const item = document.createElement('div');
      item.className = 'modal-metric-item';
      item.innerHTML = `<strong>${m.val}</strong><span>${m.label}</span>`;
      metricsContainer.appendChild(item);
    });

    // Live CTA Button
    const liveCta = document.getElementById('modalCaseLiveCta');
    liveCta.href = data.liveUrl;
    liveCta.textContent = data.liveLabel;
    if (data.liveUrl.startsWith('http')) {
      liveCta.target = '_blank';
      liveCta.rel = 'noopener noreferrer';
    } else {
      liveCta.removeAttribute('target');
      liveCta.removeAttribute('rel');
    }

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
  // 6. INTERACTIVE PROJECT BRIEFING / PROPOSAL SIMULATOR
  // --------------------------------------------------------------------------
  const quoteForm = document.getElementById('quoteSimulatorForm');

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const projectType = document.getElementById('projectType').value;
      const projectTimeline = document.getElementById('projectTimeline').value;
      const clientName = document.getElementById('clientName').value.trim() || 'Cliente';
      const projectDesc = document.getElementById('projectDesc').value.trim() || 'Sem descrição adicional.';

      const messageText = `Olá, Thatiany! Vim pelo seu site/portfólio e gostaria de solicitar uma proposta para meu projeto.

📌 *Tipo de Projeto:* ${projectType}
⏱️ *Prazo Desejado:* ${projectTimeline}
👤 *Meu Nome:* ${clientName}
📝 *Detalhes:* ${projectDesc}

Podemos conversar sobre viabilidade e próximos passos?`;

      const whatsappNumber = '5513991814547';
      const encodedMsg = encodeURIComponent(messageText);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      showToast('🚀 Redirecionando para o WhatsApp de Thatiany Schulz...');
    });
  }

  // --------------------------------------------------------------------------
  // 7. COPY TO CLIPBOARD UTILITY WITH TOAST NOTIFICATION
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

  // --------------------------------------------------------------------------
  // 8. TOAST NOTIFICATION SYSTEM
  // --------------------------------------------------------------------------
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
    }, 3800);
  }

  // --------------------------------------------------------------------------
  // 9. SUBTLE SCROLL REVEAL VIA INTERSECTION OBSERVER
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }
});
