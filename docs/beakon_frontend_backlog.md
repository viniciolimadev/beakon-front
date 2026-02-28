# BEAKON — Product Backlog Frontend
> Versão 1.0 | 2025

---

## Legenda

| Símbolo | Significado |
|---|---|
| 🔴 Alta | Prioridade alta — bloqueante para outras histórias |
| 🟡 Média | Prioridade média — importante mas não bloqueante |
| 🟢 Baixa | Prioridade baixa — nice to have na versão atual |
| 🔵 Futuro | Planejado para versões posteriores |
| ⬜ Pendente | Não iniciado |
| 🔄 Em andamento | Em desenvolvimento |
| ✅ Concluído | Finalizado e validado |

---

## ÉPICO 1 — Setup e Infraestrutura Frontend

> Configurar o projeto Next.js com todas as dependências e estrutura de pastas.

---

### US-F01 — Inicializar projeto Next.js
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** desenvolvedor,
**quero** ter o projeto Next.js 15 criado com TypeScript e Tailwind,
**para que** eu tenha a base para desenvolver o frontend.

**Critérios de aceitação:**
- [ ] Projeto criado com `create-next-app` usando App Router
- [ ] TypeScript configurado em modo estrito
- [ ] Tailwind CSS configurado com tema customizado (paleta Beakon)
- [ ] Estrutura de pastas criada conforme documentação
- [ ] Rodando em `http://localhost:3000` via Docker

---

### US-F02 — Configurar Shadcn/ui
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** desenvolvedor,
**quero** ter o Shadcn/ui instalado e configurado com o tema do Beakon,
**para que** eu utilize componentes prontos e acessíveis.

**Critérios de aceitação:**
- [ ] Shadcn/ui inicializado com `npx shadcn@latest init`
- [ ] Dark mode configurado como padrão
- [ ] Componentes instalados: button, input, label, card, badge, dialog, sheet, tabs, toast, progress, avatar, dropdown-menu
- [ ] Cores do tema alinhadas com a paleta Beakon no `tailwind.config`

---

### US-F03 — Configurar Zustand e stores base
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** desenvolvedor,
**quero** ter as stores Zustand criadas com sua estrutura base,
**para que** o estado global esteja pronto para ser populado.

**Critérios de aceitação:**
- [ ] `authStore.ts` criado com tipagem completa
- [ ] `taskStore.ts` criado com tipagem completa
- [ ] `pomodoroStore.ts` criado com tipagem completa
- [ ] `gamificationStore.ts` criado com tipagem completa
- [ ] Todas as stores exportadas e acessíveis

---

### US-F04 — Configurar Axios com interceptors
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** desenvolvedor,
**quero** ter uma instância Axios centralizada com interceptors de JWT,
**para que** todas as chamadas à API sejam autenticadas automaticamente.

**Critérios de aceitação:**
- [ ] Arquivo `src/services/api.ts` com instância Axios
- [ ] `baseURL` lendo de variável de ambiente `NEXT_PUBLIC_API_URL`
- [ ] Interceptor de request injetando token JWT no header `Authorization`
- [ ] Interceptor de response tratando `401` redirecionando para `/login`
- [ ] Interceptor de response formatando erros `422` em objeto legível

---

### US-F05 — Configurar types globais TypeScript
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 1 ponto

**Como** desenvolvedor,
**quero** ter os tipos TypeScript das entidades da API definidos,
**para que** o projeto tenha tipagem consistente do início.

**Critérios de aceitação:**
- [ ] `types/user.ts` com interface `User`
- [ ] `types/task.ts` com interface `Task`, enums `TaskStatus` e `TaskPriority`
- [ ] `types/routine.ts` com interface `Routine`
- [ ] `types/pomodoro.ts` com interfaces `PomodoroSession` e `PomodoroConfig`
- [ ] `types/gamification.ts` com interfaces `Achievement` e `DashboardData`

---

## ÉPICO 2 — Autenticação

> Telas de login e cadastro com proteção de rotas via middleware.

---

### US-F06 — Tela de login
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 3 pontos

**Como** usuário não autenticado,
**quero** fazer login com e-mail e senha,
**para que** eu acesse o Beakon.

**Critérios de aceitação:**
- [ ] Página `/login` com layout centralizado e logo Beakon
- [ ] Campos de e-mail e senha com validação Zod via React Hook Form
- [ ] Mensagem de erro inline para credenciais inválidas
- [ ] Loading state no botão durante requisição
- [ ] Redireciona para `/dashboard` após sucesso
- [ ] Link para `/register`

---

### US-F07 — Tela de cadastro
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 3 pontos

**Como** novo usuário,
**quero** criar minha conta no Beakon,
**para que** eu comece a usar o sistema.

**Critérios de aceitação:**
- [ ] Página `/register` com layout centralizado e logo Beakon
- [ ] Campos: nome, e-mail, senha e confirmação de senha
- [ ] Validação Zod: nome obrigatório, e-mail válido, senha mínimo 8 chars, confirmação igual
- [ ] Erro inline para e-mail já cadastrado
- [ ] Login automático após cadastro bem-sucedido
- [ ] Link para `/login`

---

### US-F08 — Proteção de rotas com middleware
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** desenvolvedor,
**quero** que rotas autenticadas sejam protegidas pelo middleware do Next.js,
**para que** usuários não autenticados sejam redirecionados para o login.

**Critérios de aceitação:**
- [ ] `middleware.ts` na raiz do projeto verificando token JWT
- [ ] Rotas do grupo `(dashboard)` protegidas
- [ ] Rotas `/login` e `/register` redirecionam para `/dashboard` se já autenticado
- [ ] Token armazenado em cookie httpOnly (não localStorage)

---

### US-F09 — Logout
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 1 ponto

**Como** usuário autenticado,
**quero** fazer logout,
**para que** minha sessão seja encerrada com segurança.

**Critérios de aceitação:**
- [ ] Botão de logout na sidebar e no dropdown do header
- [ ] Chama `POST /api/auth/logout`
- [ ] Limpa token do cookie e store Zustand
- [ ] Redireciona para `/login`

---

## ÉPICO 3 — Layout Base

> Estrutura visual compartilhada entre todas as páginas autenticadas.

---

### US-F10 — Sidebar de navegação
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 3 pontos

**Como** usuário,
**quero** ter uma sidebar com navegação clara entre as seções,
**para que** eu me mova facilmente pelo aplicativo.

**Critérios de aceitação:**
- [ ] Links para: Dashboard, Tarefas, Rotinas, Pomodoro, Conquistas
- [ ] Ícones Lucide para cada item
- [ ] Indicador visual do item ativo
- [ ] XP total e streak exibidos no rodapé da sidebar
- [ ] Botão de logout no rodapé
- [ ] Colapsável com ícone de toggle

---

### US-F11 — Header global
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** usuário,
**quero** ter um header com meu progresso e acesso rápido ao perfil,
**para que** eu sempre saiba meu estado atual.

**Critérios de aceitação:**
- [ ] Nome da página atual exibido à esquerda
- [ ] Badge com XP total
- [ ] Ícone de chama com número do streak
- [ ] Avatar com dropdown: nome do usuário, configurações (futuro), logout
- [ ] Layout responsivo

---

### US-F12 — Quick Capture global
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 3 pontos

**Como** usuário,
**quero** capturar uma tarefa rapidamente de qualquer página,
**para que** eu nunca perca uma ideia por falta de agilidade.

**Critérios de aceitação:**
- [ ] Atalho `Ctrl+K` abre modal de captura em qualquer página
- [ ] Campo de texto com foco automático ao abrir
- [ ] `Enter` cria a tarefa e fecha o modal
- [ ] `Escape` cancela e fecha o modal
- [ ] Toast de confirmação após criação
- [ ] Tarefa criada com status `inbox` e prioridade `medium`

---

### US-F13 — Sistema de Toast notifications
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** usuário,
**quero** receber feedback visual para cada ação importante,
**para que** eu saiba que minhas ações foram processadas.

**Critérios de aceitação:**
- [ ] Toast de sucesso para: tarefa criada, tarefa concluída, rotina salva
- [ ] Toast de erro para: falha de rede, validação inválida
- [ ] Toast especial (com ícone de troféu) para conquistas desbloqueadas
- [ ] Toast de XP com valor ganho ao concluir tarefa
- [ ] Auto-fechamento em 4 segundos
- [ ] Máximo de 3 toasts simultâneos

---

### US-F14 — Skeleton loaders
**Prioridade:** 🟡 Média | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** usuário,
**quero** ver placeholders animados enquanto os dados carregam,
**para que** a interface não pareça quebrada durante o carregamento.

**Critérios de aceitação:**
- [ ] Skeleton para cards de tarefa
- [ ] Skeleton para itens de rotina
- [ ] Skeleton para widgets de gamificação
- [ ] Skeleton para cards de conquista
- [ ] Animação de pulse em todos os skeletons

---

## ÉPICO 4 — Dashboard

> Página inicial com visão geral do dia.

---

### US-F15 — Cabeçalho do dia e saudação
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 1 ponto

**Como** usuário,
**quero** ver uma saudação personalizada com a data atual,
**para que** o dashboard pareça contextualizado ao meu momento.

**Critérios de aceitação:**
- [ ] Saudação dinâmica: "Bom dia, Vinicio!" / "Boa tarde..." / "Boa noite..."
- [ ] Data formatada em português: "Segunda-feira, 28 de fevereiro"
- [ ] Resumo rápido: "X tarefas para hoje · X min focados · 🔥 X dias"

---

### US-F16 — Rotina do dia no dashboard
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** usuário,
**quero** ver minha rotina do dia na página inicial,
**para que** eu saiba minha estrutura do dia logo ao abrir o app.

**Critérios de aceitação:**
- [ ] Buscar dados de `GET /api/routines/today`
- [ ] Lista ordenada por horário com título e horário de cada item
- [ ] Indicador de item atual baseado no horário do sistema
- [ ] Estado vazio com mensagem motivacional se não houver rotina

---

### US-F17 — Tarefas de hoje no dashboard
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 3 pontos

**Como** usuário,
**quero** ver e gerenciar as tarefas de hoje diretamente no dashboard,
**para que** eu não precise sair da página inicial para trabalhar.

**Critérios de aceitação:**
- [ ] Buscar tarefas com `status=today`
- [ ] Cada tarefa exibe título, badge de prioridade e tempo estimado
- [ ] Botão de concluir com animação de remoção
- [ ] Botão de iniciar Pomodoro vinculado à tarefa
- [ ] Prazo vencido destacado em vermelho
- [ ] Estado vazio motivacional

---

### US-F18 — Barra de progresso diário
**Prioridade:** 🟡 Média | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** usuário,
**quero** ver visualmente meu progresso nas tarefas do dia,
**para que** eu tenha senso de conclusão ao longo do dia.

**Critérios de aceitação:**
- [ ] Barra de progresso mostrando `concluídas / total` de tarefas de hoje
- [ ] Percentual exibido ao lado da barra
- [ ] Animação ao avançar a barra
- [ ] Mensagem especial ao atingir 100%

---

### US-F19 — Widgets de gamificação no dashboard
**Prioridade:** 🟡 Média | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** usuário,
**quero** ver meu XP, streak e última conquista no dashboard,
**para que** eu me mantenha motivado ao abrir o app.

**Critérios de aceitação:**
- [ ] Widget de XP com barra de progresso para próximo nível
- [ ] Widget de streak com ícone de chama e número de dias
- [ ] Card da última conquista desbloqueada
- [ ] Animação de XP ao ganhar pontos

---

## ÉPICO 5 — Gestão de Tarefas

> Kanban completo para organizar todas as tarefas.

---

### US-F20 — Layout Kanban com colunas
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 3 pontos

**Como** usuário,
**quero** ver minhas tarefas organizadas em colunas por status,
**para que** eu tenha uma visão clara do fluxo de trabalho.

**Critérios de aceitação:**
- [ ] 5 colunas: Inbox, Hoje, Esta Semana, Backlog, Concluídas
- [ ] Cada coluna com cabeçalho e contador de tarefas
- [ ] Scroll horizontal em telas menores
- [ ] Scroll vertical independente por coluna
- [ ] Estado vazio por coluna com mensagem contextual

---

### US-F21 — Card de tarefa
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 3 pontos

**Como** usuário,
**quero** ver as informações essenciais de cada tarefa no kanban,
**para que** eu identifique rapidamente o que precisa de atenção.

**Critérios de aceitação:**
- [ ] Título da tarefa em destaque
- [ ] Badge de prioridade com cores: verde (low), amarelo (medium), vermelho (high)
- [ ] Tempo estimado exibido com ícone de relógio
- [ ] Data de vencimento com cor vermelha se vencida
- [ ] Menu de ações: editar, mover para hoje, iniciar Pomodoro, excluir
- [ ] Hover com elevação sutil

---

### US-F22 — Quick Capture na coluna Inbox
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** usuário,
**quero** criar tarefas diretamente na coluna Inbox,
**para que** a captura seja instantânea sem abrir modais.

**Critérios de aceitação:**
- [ ] Input fixo no topo da coluna Inbox
- [ ] `Enter` cria a tarefa e limpa o campo
- [ ] Animação de entrada da nova tarefa na lista
- [ ] Toast de confirmação

---

### US-F23 — Modal de criação e edição de tarefa
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 3 pontos

**Como** usuário,
**quero** criar ou editar uma tarefa com todos os detalhes,
**para que** eu tenha controle completo sobre o planejamento.

**Critérios de aceitação:**
- [ ] Modal com campos: título, descrição, status, prioridade, tempo estimado, data de vencimento
- [ ] Validação com React Hook Form + Zod
- [ ] Botão salvar com loading state
- [ ] Histórico de sessões Pomodoro da tarefa (se editando)
- [ ] Botão excluir com dialog de confirmação

---

### US-F24 — Drag and drop entre colunas
**Prioridade:** 🟡 Média | **Status:** ⬜ Pendente | **Estimativa:** 4 pontos

**Como** usuário,
**quero** mover tarefas entre colunas arrastando,
**para que** a organização seja intuitiva e rápida.

**Critérios de aceitação:**
- [ ] Arrastar card de uma coluna para outra altera o status
- [ ] Chamada `PATCH /api/tasks/{id}/status` ao soltar
- [ ] Feedback visual durante o drag (card semi-transparente)
- [ ] Coluna de destino destacada durante o drag
- [ ] Optimistic update: card move imediatamente, reverte em caso de erro

---

### US-F25 — Reordenação dentro da coluna
**Prioridade:** 🟡 Média | **Status:** ⬜ Pendente | **Estimativa:** 3 pontos

**Como** usuário,
**quero** reordenar tarefas dentro da mesma coluna arrastando,
**para que** eu priorize visualmente o que fazer primeiro.

**Critérios de aceitação:**
- [ ] Drag and drop dentro da mesma coluna atualiza a ordem
- [ ] Chamada `PATCH /api/tasks/{id}/reorder` ao soltar
- [ ] Animação suave de reposicionamento

---

### US-F26 — Filtros de tarefas
**Prioridade:** 🟡 Média | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** usuário,
**quero** filtrar tarefas por prioridade e prazo,
**para que** eu foque no que é mais urgente.

**Critérios de aceitação:**
- [ ] Filtro por prioridade (multi-select: low, medium, high)
- [ ] Filtro por prazo (hoje, esta semana, vencidas)
- [ ] Filtros aplicados em todas as colunas simultaneamente
- [ ] Badge indicando filtros ativos
- [ ] Botão para limpar filtros

---

## ÉPICO 6 — Rotinas

> Interface para gerenciar a estrutura fixa do dia.

---

### US-F27 — Listagem de rotinas
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** usuário,
**quero** ver todos os meus itens de rotina organizados,
**para que** eu tenha uma visão clara da minha estrutura diária.

**Critérios de aceitação:**
- [ ] Lista de itens com título, horário e dias da semana ativos
- [ ] Badges coloridos por dia da semana
- [ ] Toggle de ativar/desativar com optimistic update
- [ ] Botões de editar e excluir por item
- [ ] Estado vazio com CTA para criar primeira rotina

---

### US-F28 — Criar e editar rotina
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 3 pontos

**Como** usuário,
**quero** criar ou editar itens de rotina com interface amigável,
**para que** eu configure minha estrutura diária com facilidade.

**Critérios de aceitação:**
- [ ] Modal com campos: título, horário (time picker), dias da semana, ordem
- [ ] Seleção de dias da semana com checkboxes visuais (seg, ter, qua...)
- [ ] Preview em tempo real: "Este item aparecerá X vezes por semana"
- [ ] Validação com React Hook Form + Zod
- [ ] Botão salvar com loading state

---

### US-F29 — Visualização por dias da semana
**Prioridade:** 🟡 Média | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** usuário,
**quero** ver como minha rotina está distribuída pela semana,
**para que** eu identifique dias muito cheios ou vazios.

**Critérios de aceitação:**
- [ ] Grade mostrando os 7 dias com os itens de cada dia
- [ ] Dia atual destacado
- [ ] Contagem de itens por dia
- [ ] Alternância entre visualização de lista e visualização semanal

---

## ÉPICO 7 — Pomodoro

> Timer visual de foco com ciclos configuráveis.

---

### US-F30 — Timer visual Pomodoro
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 4 pontos

**Como** usuário,
**quero** ter um timer visual circular que mostre meu progresso no ciclo,
**para que** eu veja claramente quanto tempo resta sem esforço cognitivo.

**Critérios de aceitação:**
- [ ] Círculo SVG animado com progresso do tempo
- [ ] Tempo restante em MM:SS no centro
- [ ] Cor do anel muda por modo: azul (foco), verde (pausa curta), laranja (pausa longa)
- [ ] Animação suave de transição entre estados
- [ ] Tamanho adequado para leitura fácil

---

### US-F31 — Controles do Pomodoro
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 3 pontos

**Como** usuário,
**quero** iniciar, pausar e abandonar sessões Pomodoro,
**para que** eu controle meu ciclo de foco.

**Critérios de aceitação:**
- [ ] Botão Iniciar chama `POST /api/pomodoro/start` com `task_id`
- [ ] Botão Pausar pausa o timer localmente (sem chamar API)
- [ ] Botão Abandonar chama `PATCH /api/pomodoro/{id}/finish` com `completed: false`
- [ ] Seletor de tarefa vinculada (dropdown com tarefas de hoje)
- [ ] Contador de ciclos: "🍅 2/4"
- [ ] Impede iniciar se sessão já está ativa

---

### US-F32 — Transição automática de ciclos
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 3 pontos

**Como** usuário,
**quero** que o timer avance automaticamente para a pausa ao fim do foco,
**para que** eu não precise gerenciar os ciclos manualmente.

**Critérios de aceitação:**
- [ ] Ao fim do foco: chama `finish` com `completed: true`, inicia pausa automaticamente
- [ ] A cada 4 ciclos: pausa longa ao invés de pausa curta
- [ ] Notificação sonora ao fim de cada ciclo
- [ ] Título da aba atualiza com tempo restante: "🍅 23:45 — Beakon"
- [ ] Toast notificando início de cada novo modo

---

### US-F33 — Timer persistente entre páginas
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** usuário,
**quero** que o timer continue rodando ao navegar para outras páginas,
**para que** eu possa usar o app normalmente durante o foco.

**Critérios de aceitação:**
- [ ] Estado do Pomodoro no `pomodoroStore` persiste entre rotas
- [ ] Mini-player exibido no header quando sessão ativa (tempo + tarefa)
- [ ] Clique no mini-player redireciona para `/pomodoro`
- [ ] Título da aba atualizado em qualquer página

---

### US-F34 — Configurações do Pomodoro
**Prioridade:** 🟡 Média | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** usuário,
**quero** configurar a duração dos ciclos do Pomodoro,
**para que** eu adapte a técnica ao meu ritmo.

**Critérios de aceitação:**
- [ ] Painel de configurações com inputs: foco, pausa curta, pausa longa, ciclos até pausa longa
- [ ] Valores padrão: 25, 5, 15, 4
- [ ] Configurações salvas no localStorage
- [ ] Alterações aplicadas no próximo ciclo (não interrompem o atual)

---

### US-F35 — Histórico de sessões do dia
**Prioridade:** 🟡 Média | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** usuário,
**quero** ver o histórico das sessões Pomodoro do dia,
**para que** eu acompanhe quanto tempo foquei em cada tarefa.

**Critérios de aceitação:**
- [ ] Lista de sessões do dia com: tarefa, duração, status (completa/abandonada)
- [ ] Total de minutos focados no dia
- [ ] Ícone diferente para sessões completas vs abandonadas

---

## ÉPICO 8 — Conquistas e Gamificação

> Visualização de progresso, XP, streak e conquistas.

---

### US-F36 — Barra de XP e nível
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** usuário,
**quero** ver meu XP e nível atual com barra de progresso,
**para que** eu sinta progressão contínua.

**Critérios de aceitação:**
- [ ] Nível atual calculado com base no XP (ex: nível = XP / 500)
- [ ] Barra de progresso para o próximo nível
- [ ] XP necessário para subir exibido abaixo da barra
- [ ] Animação ao ganhar XP (barra preenche suavemente)
- [ ] Toast especial ao subir de nível

---

### US-F37 — Calendário de streak
**Prioridade:** 🟡 Média | **Status:** ⬜ Pendente | **Estimativa:** 3 pontos

**Como** usuário,
**quero** ver um calendário dos últimos 30 dias com meus dias ativos,
**para que** eu visualize minha consistência ao longo do tempo.

**Critérios de aceitação:**
- [ ] Grade de 30 dias com dias ativos marcados em verde
- [ ] Dias inativos em cinza
- [ ] Streak atual em destaque com ícone de chama
- [ ] Recorde pessoal exibido abaixo do calendário

---

### US-F38 — Grade de conquistas
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 3 pontos

**Como** usuário,
**quero** ver todas as conquistas disponíveis e meu progresso em cada uma,
**para que** eu saiba o que conquistei e o que ainda posso alcançar.

**Critérios de aceitação:**
- [ ] Grade de cards para cada conquista do catálogo
- [ ] Conquistas desbloqueadas: coloridas com data de desbloqueio
- [ ] Conquistas bloqueadas: cinza com dica do que falta
- [ ] Progresso parcial visível (ex: "47/100 pomodoros")
- [ ] Filtro: todas / desbloqueadas / bloqueadas

---

### US-F39 — Animação de desbloqueio de conquista
**Prioridade:** 🟡 Média | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** usuário,
**quero** uma animação especial ao desbloquear uma conquista,
**para que** o momento seja celebrado e memorável.

**Critérios de aceitação:**
- [ ] Toast especial com ícone de troféu e nome da conquista
- [ ] Efeito de confetti na tela por 2 segundos
- [ ] XP bônus exibido no toast
- [ ] Som de celebração (opcional, respeitando preferência do usuário)

---

## ÉPICO 9 — Polimento e Qualidade

> Responsividade, acessibilidade e otimizações finais.

---

### US-F40 — Responsividade para tablets
**Prioridade:** 🟡 Média | **Status:** ⬜ Pendente | **Estimativa:** 3 pontos

**Como** usuário em tablet,
**quero** que o layout se adapte adequadamente,
**para que** eu use o Beakon em diferentes dispositivos.

**Critérios de aceitação:**
- [ ] Sidebar colapsada por padrão em telas abaixo de 1024px
- [ ] Kanban com scroll horizontal fluido em tablets
- [ ] Timer Pomodoro centralizado e legível em 768px
- [ ] Modais adaptados para telas menores

---

### US-F41 — Estados vazios motivacionais
**Prioridade:** 🟡 Média | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** usuário sem dados,
**quero** ver mensagens motivacionais nos estados vazios,
**para que** a ausência de dados não pareça um erro.

**Critérios de aceitação:**
- [ ] Estado vazio na inbox: "Tudo organizado! Capture sua próxima ideia."
- [ ] Estado vazio em hoje: "Nenhuma tarefa para hoje. Que tal planejar agora?"
- [ ] Estado vazio em conquistas: "Sua jornada começa com a primeira tarefa."
- [ ] Ilustração ou ícone contextual em cada estado vazio

---

### US-F42 — Acessibilidade por teclado
**Prioridade:** 🟡 Média | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** usuário que usa teclado,
**quero** navegar pelo app sem precisar do mouse,
**para que** o Beakon seja acessível a todos.

**Critérios de aceitação:**
- [ ] Todos os botões e links acessíveis via Tab
- [ ] Modais fecham com Escape
- [ ] `Ctrl+K` abre o Quick Capture
- [ ] Focus ring visível em todos os elementos interativos
- [ ] Ordem lógica de Tab em formulários

---

## Resumo do Backlog Frontend

| Épico | Histórias | Pontos | Status |
|---|---|---|---|
| 1 — Setup | 5 | 9 pts | ⬜ Pendente |
| 2 — Autenticação | 4 | 9 pts | ⬜ Pendente |
| 3 — Layout Base | 5 | 12 pts | ⬜ Pendente |
| 4 — Dashboard | 5 | 10 pts | ⬜ Pendente |
| 5 — Tarefas | 7 | 20 pts | ⬜ Pendente |
| 6 — Rotinas | 3 | 7 pts | ⬜ Pendente |
| 7 — Pomodoro | 6 | 16 pts | ⬜ Pendente |
| 8 — Conquistas | 4 | 10 pts | ⬜ Pendente |
| 9 — Polimento | 3 | 7 pts | ⬜ Pendente |
| **Total** | **42** | **100 pts** | |

---

*Beakon Frontend v1.0 — Product Backlog*
