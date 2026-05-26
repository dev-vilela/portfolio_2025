  // Set dynamic current year in footer
        document.getElementById('current-year').innerText = new Date().getFullYear();

        // 1. SCROLL TO SECTION SMOOTH ACTIONS
        function scrollToSection(id) {
            closeMobileMenu();
            const element = document.getElementById(id);
            if (element) {
                // Calculate navbar offset
                const offset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }

        // 2. SCROLL EVENTS: HIGHLIGHT NAVBAR & SHOW SCROLL-TO-TOP BUTTON
        window.addEventListener('scroll', () => {
            const sections = ['sobre', 'formacoes', 'empresa', 'projetos', 'habilidades', 'experiencia', 'contato'];
            const scrollPos = window.scrollY + 200;

            // Update Active Link State
            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const top = element.offsetTop;
                    const height = element.offsetHeight;
                    const btn = document.querySelector(`.nav-btn[data-section="${section}"]`);
                    
                    if (scrollPos >= top && scrollPos < top + height) {
                        if (btn) {
                            document.querySelectorAll('.nav-btn').forEach(b => {
                                b.classList.remove('bg-gradient-to-r', 'from-cyan-500', 'to-blue-600', 'text-white', 'shadow-md');
                                b.classList.add('text-slate-400');
                            });
                            btn.classList.add('bg-gradient-to-r', 'from-cyan-500', 'to-blue-600', 'text-white', 'shadow-md');
                            btn.classList.remove('text-slate-400');
                        }
                    }
                }
            });

            // Toggle scroll to top button view
            const scrollBtn = document.getElementById('scroll-to-top-btn');
            if (window.scrollY > 500) {
                scrollBtn.classList.remove('hidden');
            } else {
                scrollBtn.classList.add('hidden');
            }
        });

        // 3. INTERACTIVE MOBILE NAVIGATION MENU CONTROLS
        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            const openIcon = document.getElementById('menu-icon-open');
            const closeIcon = document.getElementById('menu-icon-close');

            if (menu.classList.contains('hidden')) {
                menu.classList.remove('hidden');
                openIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            } else {
                closeMobileMenu();
            }
        }

        function closeMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            const openIcon = document.getElementById('menu-icon-open');
            const closeIcon = document.getElementById('menu-icon-close');

            menu.classList.add('hidden');
            openIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }

        // 4. PORTFOLIO FILTER MECHANISMS
        function filterProjects(category) {
            // Update filter button visuals
            const buttons = document.querySelectorAll('.proj-filter-btn');
            buttons.forEach(btn => {
                if (btn.innerText.trim() === category || (category === 'IA' && btn.innerText.includes('IA'))) {
                    btn.className = "proj-filter-btn px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all border bg-cyan-500/15 border-cyan-500/50 text-cyan-400 font-bold";
                } else {
                    btn.className = "proj-filter-btn px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all border border-white/5 bg-white/[0.02] text-slate-400 hover:text-white hover:border-white/15";
                }
            });

            // Filter cards
            const cards = document.querySelectorAll('.project-card');
            cards.forEach(card => {
                if (category === 'Todos' || card.getAttribute('data-category') === category) {
                    card.classList.remove('hidden');
                    card.classList.add('animate-fadeIn');
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('animate-fadeIn');
                }
            });
        }

        // 5. INTERACTIVE SKILLS TAB SELECTOR
        function switchSkillsTab(tabId) {
            // Update active tab buttons visual look
            const buttons = document.querySelectorAll('.skills-tab-btn');
            const tabMap = {
                'all': 'Todas as Skills',
                'front': 'Frontend & UI',
                'back': 'Backend & APIs',
                'tools': 'Ferramentas',
                'ia': 'IA & Automações'
            };

            buttons.forEach(btn => {
                if (btn.innerText.trim() === tabMap[tabId]) {
                    btn.className = "skills-tab-btn px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold";
                } else {
                    btn.className = "skills-tab-btn px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all bg-white/5 text-slate-400 hover:text-white hover:bg-white/10";
                }
            });

            // Hide/Show Card categories
            const cards = document.querySelectorAll('.skill-group-card');
            cards.forEach(card => {
                if (tabId === 'all' || card.getAttribute('data-tab') === tabId) {
                    card.classList.remove('hidden');
                    card.classList.add('animate-fadeIn');
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('animate-fadeIn');
                }
            });
        }

        // 6. PREMIUM DETAILS MODAL COMPONENT ENGINE
        const PROJECTS_DATA = {
            compras: {
                title: "Sistema de Controle de Compras Inteligente",
                category: "Fullstack",
                description: "Plataforma avançada para automação de requisições, orçamentos e aprovações de insumos. Conecta o setor operacional aos fornecedores utilizando análise de IA para previsão de custos e negociação sugerida de valores baseada no mercado atual.",
                actionUrl: "#"
            },
            leads: {
                title: "Automação de Leads com IA & n8n",
                category: "IA & Automação",
                description: "Fluxo inteligente de captação que extrai leads de formulários, analisa o perfil da empresa via IA, gera uma proposta comercial personalizada em PDF e envia via WhatsApp de forma segura e rápida para novos contatos.",
                actionUrl: "#"
            },
            dashboard: {
                title: "Dashboard Administrativo Vercel-Style",
                category: "Frontend",
                description: "Painel analítico corporativo com design minimalista premium, apresentando métricas em tempo real, controle de acessos corporativos avançados, análise de churn rate, logs operacionais e exportação automatizada.",
                actionUrl: "#"
            },
            api: {
                title: "API RESTful Enterprise & Spring Security",
                category: "Backend",
                description: "Arquitetura robusta de microsserviços para gestão de inventário e processos corporativos, implementando controle de acessos baseados em atribuições (RBAC), autenticação JWT criptografada de alta performance e Docker Compose.",
                actionUrl: "#"
            }
        };

        function openModal(projectId) {
            const data = PROJECTS_DATA[projectId];
            if (data) {
                document.getElementById('modal-project-title').innerText = data.title;
                document.getElementById('modal-project-category').innerText = data.category;
                document.getElementById('modal-project-description').innerText = data.description;
                document.getElementById('modal-action-btn').setAttribute('href', data.actionUrl);
                
                const modal = document.getElementById('project-detail-modal');
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // block viewport scroll when overlaying
            }
        }

        function closeModal() {
            const modal = document.getElementById('project-detail-modal');
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto'; // release viewport scroll
        }

        // Close Modal clicking outside container
        window.onclick = function(event) {
            const modal = document.getElementById('project-detail-modal');
            if (event.target === modal) {
                closeModal();
            }
        }

        // 7. CONTACT FORM TRANSMISSION ENGINE
        function handleContactSubmit(event) {
            event.preventDefault();
            
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const message = document.getElementById('form-message').value;
            const submitBtn = document.getElementById('form-submit-btn');
            const feedbackBanner = document.getElementById('form-feedback-banner');
            const feedbackText = document.getElementById('feedback-message');

            if (!name || !email || !message) {
                feedbackBanner.className = "p-4 rounded-xl text-xs font-mono flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400";
                feedbackText.innerText = "Por favor, preencha todos os campos obrigatórios.";
                feedbackBanner.classList.remove('hidden');
                return;
            }

            // Set loading simulation state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>`;

            setTimeout(() => {
                // Success feedback trigger
                feedbackBanner.className = "p-4 rounded-xl text-xs font-mono flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400";
                feedbackText.innerText = "Mensagem transmitida com sucesso! Retornarei o contato em até 24 horas.";
                feedbackBanner.classList.remove('hidden');

                // Clear input elements
                document.getElementById('contact-form').reset();

                // Re-enable actions buttons
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<span>Transmitir Dados do Formulário</span><i data-lucide="send" class="w-4 h-4"></i>`;
                lucide.createIcons(); // refresh rendering dynamic icons
            }, 1500);
        }

        // Initialize and setup Lucide Icons on DOM Load Event
        window.onload = function() {
            lucide.createIcons();
        };


        //MODAL FORMAÇÃO
        function openModal() {
        const modal = document.getElementById("diplomaModal");
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    }

    function closeModal() {
        const modal = document.getElementById("diplomaModal");
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    }