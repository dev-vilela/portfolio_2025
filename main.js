  // Mobile Menu Toggle
        const mobileBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');

        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if(mobileMenu.classList.contains('hidden')) {
                menuIcon.className = 'fa-solid fa-bars text-xl';
            } else {
                menuIcon.className = 'fa-solid fa-xmark text-xl';
            }
        });

        // Close mobile drawer on item click
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.className = 'fa-solid fa-bars text-xl';
            });
        });

        // Skill Category Filter
        function filterSkills(category) {
            const cards = document.querySelectorAll('.skill-card');
            const btns = document.querySelectorAll('.skill-filter-btn');

            btns.forEach(btn => {
                if(btn.getAttribute('data-cat') === category) {
                    btn.className = 'skill-filter-btn px-4 py-2 rounded-xl text-xs font-semibold bg-brand-accent text-white transition-all';
                } else {
                    btn.className = 'skill-filter-btn px-4 py-2 rounded-xl text-xs font-semibold bg-brand-card text-brand-muted hover:text-white border border-brand-border transition-all';
                }
            });

            cards.forEach(card => {
                if(category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Project Modal Logic
        const modalData = {
            techflow: {
                title: 'Tech Flow+',
                category: 'Backend & API QA Validation',
                tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Postman'],
                description: 'API REST desenvolvida para gerenciamento de fluxo técnico com rigorosa validação dos endpoints CRUD através de suítes no Postman.',
                activities: [
                    'Mapeamento e testes funcionais de 100% dos endpoints REST.',
                    'Validação de respostas HTTP (200 OK, 201 Created, 400 Bad Request, 404 Not Found).',
                    'Verificação de consistência na persistência de dados no PostgreSQL.',
                    'Testes de integração garantindo integridade referencial.'
                ],
                sampleCode: `// Exemplo de teste de validação de Schema/Status no Postman
pm.test("Status code é 200 OK", function () {
    pm.response.to.have.status(200);
});
pm.test("Resposta contém ID do objeto", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.id).to.not.equal(null);
});`
            },
            academy: {
                title: 'Academy Tech',
                category: 'System & Business Rules QA',
                tech: ['Testes Funcionais', 'Regras de Negócio', 'Autenticação'],
                description: 'Sistema completo de gestão de alunos com testes focados em integridade de dados e controle de acessos.',
                activities: [
                    'Levantamento de cenários de teste para fluxo de matrícula e notas.',
                    'Validação de restrições em formulários de cadastro.',
                    'Testes de segurança básica para bloqueio de acessos não autorizados.',
                    'Reteste e acompanhamento de bugs identificados.'
                ],
                sampleCode: `// Matriz de Teste - Validação de Cadastro
Scenario 01: Cadastro de aluno com dados válidos -> Status: Aprovado
Scenario 02: Tentativa de cadastro com CPF duplicado -> Retorno: 409 Conflict
Scenario 03: Inclusão de notas fora da escala [0-10] -> Retorno: Validation Exception`
            },
            apiauto: {
                title: 'Automação de Testes de API',
                category: 'API Automation & BDD Framework',
                tech: ['Ruby', 'Cucumber', 'HTTParty', 'Gherkin'],
                description: 'Framework de testes automatizados para APIs REST utilizando Ruby e Cucumber com cenários escritos em Gherkin.',
                activities: [
                    'Estruturação de suíte de testes reutilizável com HTTParty.',
                    'Criação de cenários BDD limpos e legíveis para a equipe de negócios.',
                    'Validação de contratos JSON e códigos de resposta HTTP.',
                    'Testes parametrizados para múltiplos cenários de entrada.'
                ],
                sampleCode: `@api_users
Funcionalidade: Gestão de Usuários da API
  Cenário: Buscar usuário por ID com sucesso
    Dado que envio uma requisição GET para a rota "/users/1"
    Entao o código de resposta HTTP deve ser 200
    E a resposta deve conter a chave "username"`
            },
            webdojo: {
                title: 'WebDojo - E2E Web Testing',
                category: 'Cypress E2E Automation',
                tech: ['Cypress', 'JavaScript', 'Custom Commands', 'Assertions'],
                description: 'Automação de testes End-to-End para garantia de usabilidade e integridade em formulários e fluxos web.',
                activities: [
                    'Automação completa do fluxo de autenticação e recuperação de senha.',
                    'Implementação de validação automatizada de algoritmos de CPF e CNPJ.',
                    'Criação de seletores resilientes baseados em data-cy.',
                    'Verificação de mensagens de erro em campos obrigatórios.'
                ],
                sampleCode: `describe('Suíte de Testes - Formulário WebDojo', () => {
  it('Deve validar mensagem de erro para CPF inválido', () => {
    cy.visit('/cadastro');
    cy.get('[data-cy=input-cpf]').type('123.456.789-00');
    cy.get('[data-cy=btn-submit]').click();
    cy.get('.error-message').should('contain', 'CPF Inválido');
  });
});`
            }
        };

        function openProjectModal(key) {
            const item = modalData[key];
            if(!item) return;

            const modalContent = document.getElementById('modal-content');
            modalContent.innerHTML = `
                <div class="space-y-4">
                    <div class="flex items-center justify-between border-b border-brand-border pb-3">
                        <div>
                            <span class="text-xs font-mono text-brand-accent">${item.category}</span>
                            <h3 class="text-2xl font-bold text-brand-text">${item.title}</h3>
                        </div>
                    </div>

                    <p class="text-sm text-brand-muted">${item.description}</p>

                    <div class="space-y-2">
                        <h4 class="text-xs font-bold text-brand-text uppercase tracking-wider font-mono">Atividades de QA Realizadas:</h4>
                        <ul class="text-xs text-brand-muted space-y-1.5 list-disc pl-5">
                            ${item.activities.map(act => `<li>${act}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="space-y-2 pt-2">
                        <h4 class="text-xs font-bold text-brand-text uppercase tracking-wider font-mono">Trecho / Cenário de Teste:</h4>
                        <pre class="bg-brand-bg p-3 rounded-lg text-xs font-mono text-brand-light overflow-x-auto border border-brand-border"><code>${item.sampleCode}</code></pre>
                    </div>

                    <div class="pt-4 border-t border-brand-border flex items-center justify-between">
                        <div class="flex flex-wrap gap-1.5">
                            ${item.tech.map(t => `<span class="px-2 py-0.5 rounded bg-brand-sec text-[10px] font-mono text-brand-muted">${t}</span>`).join('')}
                        </div>
                        <a href="https://github.com/paulofurtado320" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-lg bg-brand-accent hover:bg-blue-600 text-white font-semibold text-xs transition-colors flex items-center gap-1.5">
                            <i class="fa-brands fa-github"></i> Ver no GitHub
                        </a>
                    </div>
                </div>
            `;

            document.getElementById('project-modal').classList.remove('hidden');
        }

        function closeProjectModal() {
            document.getElementById('project-modal').classList.add('hidden');
        }

        // Close modal when clicking backdrop
        document.getElementById('project-modal').addEventListener('click', (e) => {
            if(e.target === document.getElementById('project-modal')) {
                closeProjectModal();
            }
        });

        // Trigger Interactive QA Simulation in Hero section
        function triggerTestAnimation() {
            const btn = document.getElementById('run-test-btn');
            const screen = document.getElementById('terminal-screen');
            const passedCount = document.getElementById('passed-count');
            
            btn.innerHTML = `<i class="fa-solid fa-spinner animate-spin text-[10px]"></i> Executando...`;
            btn.disabled = true;

            const time = new Date().toLocaleTimeString();
            
            setTimeout(() => {
                const newLog = document.createElement('div');
                newLog.className = 'flex items-start justify-between text-brand-success font-mono text-xs animate-pulse';
                newLog.innerHTML = `<span>✔ [LIVE-TEST] Automated Sanity Check OK (${time})</span><span class="text-brand-muted text-[10px]">14ms</span>`;
                screen.appendChild(newLog);
                screen.scrollTop = screen.scrollHeight;
                
                passedCount.innerText = parseInt(passedCount.innerText) + 1;
                
                btn.innerHTML = `<i class="fa-solid fa-play text-[10px]"></i> Simular Suíte`;
                btn.disabled = false;
                showToast("Suíte de testes executada com sucesso!");
            }, 800);
        }

        // Form Submission Handler
        function handleFormSubmit(event) {
            event.preventDefault();
            showToast("Mensagem enviada com sucesso! Paulo entrará em contato em breve.");
            event.target.reset();
        }

        // Helper: Copy Text to Clipboard
        function copyText(text, message) {
            if(navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text);
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
            }
            showToast(message);
        }

        // Helper: Show Toast Notification
        function showToast(msg) {
            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toast-message');
            toastMsg.innerText = msg;
            toast.classList.remove('hidden');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 3500);
        }