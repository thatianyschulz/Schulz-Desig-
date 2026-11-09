/**
 * SCHULZ DESIGÑ — INTERACTIVE ENGINE
 * Official Clean Vanilla JavaScript (ES6+) for Canonical 4-Section Architecture
 * High Performance, Full Accessibility (WCAG 2.1) & Smooth Transitions
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. HEADER SCROLL & ACTIVE SCROLLSPY (CANONICAL 4 SECTIONS)
  // --------------------------------------------------------------------------
  const headerNav = document.querySelector('.header-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    const scrollY = window.pageYOffset;

    if (scrollY > 50) {
      headerNav.classList.add('scrolled');
    } else {
      headerNav.classList.remove('scrolled');
    }

    // Scrollspy navigation highlight
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
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

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

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
  // 3. PROJECTS FILTER TABS (CASES)
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
  // 4. CASE STUDY MODAL DIALOGS (ACCESSIBLE & FACTUAL)
  // --------------------------------------------------------------------------
  const modalOverlay = document.getElementById('caseModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const caseTriggers = document.querySelectorAll('[data-open-case]');
  let lastActiveElement = null;

  // Case Data Dictionary (Strictly truthful, no artificial metrics)
  const casesData = {
    'vagation': {
      tag: 'Conceito de UX • Mobile App • Prototipagem Figma',
      title: 'Vagation — App Colaborativo de Vagas em Tempo Real',
      banner: 'assets/images/vagation-mockup.svg',
      challenge: 'Encontrar vagas de estacionamento nas grandes cidades consome tempo e gera estresse no trânsito. O desafio conceitual foi desenhar uma interface mobile intuitiva que conecte motoristas em trânsito a vagas liberadas.',
      process: 'Pesquisa de jornada com motoristas, definição de personas e wireframing navegável. Desenvolvimento de Design System no Figma com tokens rigorosos de acessibilidade e alto contraste para visualização sob luz solar.',
      metrics: [
        { val: 'Figma', label: 'Protótipo Interativo' },
        { val: 'WCAG 2.1', label: 'Acessibilidade & Contraste' },
        { val: 'Mobile UX', label: 'Fluxos de Reserva de Vagas' }
      ],
      solution: 'Interface com mapa colaborativo em tempo real, visualização rápida de disponibilidade e fluxo simplificado de reserva com foco em usabilidade móvel.',
      liveUrl: 'https://www.figma.com/proto/oEWsosNTJm387iGdGd3kN7/Vagation-App?page-id=0%3A1&node-id=224-741&p=f&viewport=-931%2C713%2C0.36&t=EsL6zsdcU3TJ7YIp-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=10%3A572&show-proto-sidebar=1',
      liveLabel: 'Testar Protótipo Funcional no Figma'
    },
    'gonzaga': {
      tag: 'Double Diamond • Redesign de App Imobiliário',
      title: 'Gonzaga Imóveis — Redesign Imobiliário na Baixada Santista',
      banner: 'assets/images/gonzaga-mockup.svg',
      challenge: 'O aplicativo sofria com filtros complexos e jornada confusa na busca por imóveis residenciais e comerciais em Santos/SP.',
      process: 'Aplicação do método Double Diamond: imersão com compradores e corretores locais, mapeamento de gargalos, ideação com benchmarking do setor imobiliário e prototipagem navegável iterativa no Figma.',
      metrics: [
        { val: 'Double Diamond', label: 'Metodologia de UX Research' },
        { val: 'Santos/SP', label: 'Filtros Inteligentes por Bairros' },
        { val: 'Figma', label: 'Componentes & Prototipagem' }
      ],
      solution: 'Redesign completo da arquitetura de informação: filtros geográficos otimizados por bairros da Baixada Santista, cards com especificações claras e botão de contato direto via WhatsApp.',
      liveUrl: 'https://www.figma.com/proto/T4s0XryrxKQWjKF0qE5wx5/Gonzaga-Im%C3%B3veis?page-id=0%3A1&node-id=103-77&p=f&viewport=910%2C859%2C0.09&t=PmvbCeIbRf9Ej8D8-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=104%3A140',
      liveLabel: 'Testar Protótipo Funcional no Figma'
    },
    'flordibanho': {
      tag: 'Projeto Comercial Real • Identidade & Loja Virtual Nuvemshop',
      title: 'Flor di Banho — Cosméticos Artesanais & Loja Virtual',
      banner: 'assets/images/flor-di-banho-preview.jpg',
      challenge: 'A marca de cosméticos artesanais e saboaria botânica na Baixada Santista necessitava de um posicionamento acolhedor e profissional para expandir suas vendas digitais em todo o Brasil.',
      process: 'Desenvolvimento do conceito de branding, logotipo, fechamento de embalagens e rótulos com faca especial de corte, modelagem 3D da mascote Flora e implantação completa da loja virtual na plataforma Nuvemshop.',
      metrics: [
        { val: 'Nuvemshop', label: 'Loja Virtual Ativa no Ar' },
        { val: 'Branding 360°', label: 'Logo, Rótulos e Embalagens' },
        { val: 'Mascote 3D', label: 'Modelagem da Mascote Flora' }
      ],
      solution: 'Identidade visual encantadora, catálogo digital completo, rótulos prontos para produção física e loja virtual funcional com checkout integrado.',
      liveUrl: 'https://flordibanho.lojavirtualnuvem.com.br/',
      liveLabel: 'Acessar Loja Virtual Ativa'
    },
    'branding': {
      tag: 'Projetos Comerciais Reais • Design Gráfico & Papelaria',
      title: 'Identidades Visuais Corporativas & Cartões Estratégicos',
      banner: 'assets/images/branding-mockup.svg',
      challenge: 'Profissionais autônomos, escritórios de advocacia, clínicas e prestadores de serviços precisavam de uma identidade visual marcante para transmitir credibilidade imediata.',
      process: 'Alinhamento estratégico de posicionamento, criação de símbolos e logotipos únicos, seleção de paletas funcionais e tipografia, preparação de mockups e fechamento técnico de arquivos em CMYK (PDF/X-1a) para gráfica.',
      metrics: [
        { val: 'PDF / Web', label: 'Cartões Digitais Interativos' },
        { val: 'PDF/X-1a', label: 'Fechamento Gráfico para Gráfica' },
        { val: 'Multissetorial', label: 'Advocacia, Clínicas e Serviços' }
      ],
      solution: 'Peças gráficas e cartões interativos que elevam o valor percebido dos serviços dos clientes e facilitam o contato comercial.',
      liveUrl: '#contato',
      liveLabel: 'Solicitar Proposta para Identidade'
    },
    'pizzaria': {
      tag: 'Gastronomia • Cardápio Estratégico • QR Code',
      title: 'Pizzaria 4 Irmãos — Cardápio, Folder & QR Code Inteligente',
      banner: 'assets/images/branding-mockup.svg',
      challenge: 'A Pizzaria 4 Irmãos necessitava modernizar sua apresentação visual no salão e delivery, aumentando a visibilidade dos sabores nobres e viabilizando acesso instantâneo ao cardápio sem custos recorrentes de reimpressão.',
      process: 'Hierarquização visual do menu com destaque para itens nobres e bordas recheadas, criação de folder promocional para entrega residencial no bairro e configuração de QR Code inteligente para consulta direta no celular via browser leve.',
      metrics: [
        { val: 'Ticket Médio', label: 'Crescimento com destaque para opções nobres' },
        { val: 'QR Code', label: 'Acesso online instantâneo sem baixar apps' },
        { val: 'Economia', label: 'Redução contínua de custos de reimpressão' }
      ],
      solution: 'Cardápio moderno de alta conversão, folder promocional atraente e solução de QR Code digital dinâmica.',
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
  // 5. INTERACTIVE BRIEFING FORM (CONTATO)
  // --------------------------------------------------------------------------
  const quoteForm = document.getElementById('quoteSimulatorForm');

  if (quoteForm) {
    const clientNameInput = document.getElementById('clientName');
    const clientContactInput = document.getElementById('clientContact');
    const projectTypeInput = document.getElementById('projectType');
    const projectTimelineInput = document.getElementById('projectTimeline');
    const projectDescInput = document.getElementById('projectDesc');

    const clientNameError = document.getElementById('clientNameError');
    const clientContactError = document.getElementById('clientContactError');

    // Helper: validate contact (Email OR phone with at least 8 digits)
    function isValidContact(val) {
      if (!val) return false;
      const clean = val.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(clean)) return true;
      const digitsOnly = clean.replace(/\D/g, '');
      return digitsOnly.length >= 8 && digitsOnly.length <= 15;
    }

    // Live validation clearance on typing
    if (clientNameInput) {
      clientNameInput.addEventListener('input', () => {
        if (clientNameInput.value.trim().length >= 2) {
          clientNameInput.classList.remove('is-invalid');
          if (clientNameError) clientNameError.classList.remove('visible');
        }
      });
    }

    if (clientContactInput) {
      clientContactInput.addEventListener('input', () => {
        if (isValidContact(clientContactInput.value)) {
          clientContactInput.classList.remove('is-invalid');
          if (clientContactError) clientContactError.classList.remove('visible');
        }
      });
    }

    quoteForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Bot protection honeypot
      const honeyField = quoteForm.querySelector('[name="_honey"]');
      if (honeyField && honeyField.value) {
        console.warn('Bot detected by honeypot.');
        return;
      }

      let hasError = false;

      // Validate Name (minimum 2 non-whitespace characters)
      const nameVal = clientNameInput ? clientNameInput.value.trim() : '';
      if (!nameVal || nameVal.length < 2) {
        hasError = true;
        if (clientNameInput) {
          clientNameInput.classList.add('is-invalid');
          clientNameInput.focus();
        }
        if (clientNameError) clientNameError.classList.add('visible');
      } else {
        if (clientNameInput) clientNameInput.classList.remove('is-invalid');
        if (clientNameError) clientNameError.classList.remove('visible');
      }

      // Validate Contact (valid email or phone)
      const contactVal = clientContactInput ? clientContactInput.value.trim() : '';
      if (!isValidContact(contactVal)) {
        hasError = true;
        if (clientContactInput) {
          clientContactInput.classList.add('is-invalid');
          if (nameVal.length >= 2) clientContactInput.focus();
        }
        if (clientContactError) clientContactError.classList.add('visible');
      } else {
        if (clientContactInput) clientContactInput.classList.remove('is-invalid');
        if (clientContactError) clientContactError.classList.remove('visible');
      }

      if (hasError) {
        showToast('⚠️ Por favor, preencha os campos obrigatórios corretamente.');
        return;
      }

      const projectType = projectTypeInput ? projectTypeInput.value : 'Presença Vibe One — Link Bio (R$ 597)';
      const projectTimeline = projectTimelineInput ? projectTimelineInput.value : 'Padrão (15 a 30 dias)';
      const projectDesc = projectDescInput && projectDescInput.value.trim() ? projectDescInput.value.trim() : 'Sem descrição adicional.';

      const btnSubmit = document.getElementById('btnSubmitBriefing');
      const statusAlert = document.getElementById('formStatusAlert');
      const originalBtnHtml = btnSubmit ? btnSubmit.innerHTML : '<span>Enviar Briefing via WhatsApp</span>';

      // Anti-duplicate protection: disable button and show loading state
      if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<span class="btn-spinner"></span> <span>Registrando Briefing...</span>';
      }

      const messageText = `Olá, Thatiany! Vim pelo site da Schulz Desigñ e gostaria de solicitar uma proposta.

📌 *Tipo de Projeto:* ${projectType}
⏱️ *Prazo Desejado:* ${projectTimeline}
👤 *Nome / Empresa:* ${nameVal}
📱 *Contato:* ${contactVal}
📝 *Breve Resumo:* ${projectDesc}

Podemos conversar sobre viabilidade e próximos passos?`;

      const whatsappNumber = '5513991814547';
      const encodedMsg = encodeURIComponent(messageText);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

      // Open WhatsApp immediately inside user gesture to avoid popup blocker
      const win = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        const fallbackLink = document.createElement('a');
        fallbackLink.href = whatsappUrl;
        fallbackLink.target = '_blank';
        fallbackLink.rel = 'noopener noreferrer';
        fallbackLink.click();
      }

      // Show Inline Success Alert with direct WhatsApp fallback link
      if (statusAlert) {
        statusAlert.style.display = 'block';
        statusAlert.className = 'form-status-alert alert-success';
        statusAlert.innerHTML = `
          <strong>✅ Briefing registrado com sucesso!</strong><br>
          Seus dados foram enviados para Thatiany Schulz. Iniciando canal direto no WhatsApp...<br>
          <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn-fallback-wa">
            <span>Abrir Conversa no WhatsApp</span>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
        `;
      }

      showToast('🚀 Briefing enviado! Redirecionando para WhatsApp...');

      // Dispatch async lead data to FormSubmit in background
      try {
        fetch('https://formsubmit.co/ajax/thatianyschulz95@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: nameVal,
            contact: contactVal,
            projectType: projectType,
            timeline: projectTimeline,
            description: projectDesc,
            _subject: `Novo Briefing Comercial — Schulz Desigñ (${nameVal})`,
            _template: 'table'
          })
        }).catch(err => {
          console.warn('FormSubmit background notification fallback:', err);
        });
      } catch (err) {
        console.warn('Form dispatch catch:', err);
      }

      // Reset form fields
      quoteForm.reset();

      // Restore submit button after 2 seconds
      setTimeout(() => {
        if (btnSubmit) {
          btnSubmit.disabled = false;
          btnSubmit.innerHTML = originalBtnHtml;
        }
      }, 2000);
    });
  }

  // --------------------------------------------------------------------------
  // 6. COPY TO CLIPBOARD UTILITY WITH TOAST NOTIFICATION
  // --------------------------------------------------------------------------
  const copyButtons = document.querySelectorAll('[data-copy]');
  const toastNotice = document.getElementById('toastNotice');
  let toastTimeout = null;

  function showToast(message) {
    if (!toastNotice) return;
    const msgEl = toastNotice.querySelector('.toast-msg');
    if (msgEl) msgEl.textContent = message;

    toastNotice.classList.add('visible');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastNotice.classList.remove('visible');
    }, 3500);
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = textToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }

        const originalText = btn.textContent;
        btn.textContent = 'Copiado!';
        btn.classList.add('copied');
        showToast(`📋 ${textToCopy} copiado para a área de transferência!`);

        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        showToast(`Erro ao copiar. Selecione manualmente: ${textToCopy}`);
      }
    });
  });
});
