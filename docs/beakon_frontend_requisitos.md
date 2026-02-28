# BEAKON — Levantamento de Requisitos Frontend
> Versão 1.0 | 2025

---

## Informações do Projeto

| Campo | Valor |
|---|---|
| Projeto | Beakon — Frontend |
| Versão | 1.0 |
| Data | 2025 |
| Responsável | Vinicio |
| Framework | Next.js 15 (App Router) |
| UI | Shadcn/ui + Tailwind CSS |
| Estado Global | Zustand |
| Plataforma | Web (mobile em fase posterior) |

---

## 1. Visão Geral

O frontend do Beakon é a interface visual que conecta o usuário com a API, traduzindo dados em uma experiência intuitiva, acessível e motivadora para pessoas com TDAH. O design deve reduzir fricção cognitiva, tornar o tempo visível e fornecer feedback imediato a cada ação do usuário.

### 1.1 Princípios de Design

- **Clareza acima de tudo** — menos elementos em tela, mais foco no que importa agora
- **Feedback imediato** — toda ação deve ter uma resposta visual instantânea
- **Tempo visível** — o usuário deve sempre saber quanto tempo tem e quanto passou
- **Recompensa constante** — animações e indicadores de progresso mantêm o engajamento
- **Zero fricção para captura** — criar uma tarefa deve ser possível em 1 clique

### 1.2 Paleta de Cores

| Token | Hex | Uso |
|---|---|---|
| Primary | `#3B82F6` | Ações principais, links, destaque |
| Primary Dark | `#1E40AF` | Hover, títulos |
| Success | `#10B981` | Tarefas concluídas, streak ativo |
| Warning | `#F59E0B` | Prazos próximos, prioridade média |
| Danger | `#EF4444` | Prioridade alta, erros |
| Background | `#0F172A` | Fundo principal (dark mode) |
| Surface | `#1E293B` | Cards, modais, sidebar |
| Border | `#334155` | Bordas e divisores |
| Text Primary | `#F1F5F9` | Textos principais |
| Text Muted | `#94A3B8` | Textos secundários |

> O Beakon adota **dark mode como padrão**, com opção de light mode futuramente.

---

## 2. Estrutura de Páginas

### 2.1 Mapa de Rotas

```
/                        → Redireciona para /dashboard ou /login
/login                   → Tela de login
/register                → Tela de cadastro
/dashboard               → Visão geral do dia
/tasks                   → Gestão de tarefas
/routines                → Gestão de rotinas
/pomodoro                → Timer Pomodoro
/achievements            → Conquistas e progresso
```

### 2.2 Layout Global (Autenticado)

Todas as páginas autenticadas compartilham:

- **Sidebar fixa** à esquerda com navegação principal
- **Header** superior com nome do usuário, XP atual e streak
- **Quick Capture** — botão flutuante ou atalho global (`Ctrl+K`) para captura rápida de tarefas
- **Toast notifications** para feedback de ações

---

## 3. Requisitos por Página

---

### 3.1 Página de Login — `/login`

**Objetivo:** Autenticar o usuário e redirecioná-lo ao dashboard.

**Elementos visuais:**
- Logo Beakon centralizado
- Formulário com campos: e-mail e senha
- Botão "Entrar"
- Link para página de cadastro
- Mensagem de erro inline para credenciais inválidas

**Requisitos funcionais:**
- RF-F01: Formulário validado com Zod (e-mail válido, senha obrigatória)
- RF-F02: Ao submeter, chamar `POST /api/auth/login`
- RF-F03: Token JWT salvo no Zustand + cookie httpOnly (via middleware Next.js)
- RF-F04: Redirecionar para `/dashboard` após login bem-sucedido
- RF-F05: Exibir mensagem de erro para credenciais inválidas
- RF-F06: Loading state no botão durante a requisição
- RF-F07: Usuário já autenticado é redirecionado direto ao dashboard

---

### 3.2 Página de Cadastro — `/register`

**Objetivo:** Criar uma nova conta no Beakon.

**Elementos visuais:**
- Logo Beakon centralizado
- Formulário com campos: nome, e-mail, senha e confirmação de senha
- Botão "Criar conta"
- Link para login

**Requisitos funcionais:**
- RF-F08: Validação com Zod (nome obrigatório, e-mail válido, senha mínimo 8 chars, confirmação igual)
- RF-F09: Ao submeter, chamar `POST /api/auth/register`
- RF-F10: Login automático após cadastro bem-sucedido
- RF-F11: Exibir erro de e-mail já cadastrado inline no campo
- RF-F12: Loading state no botão durante a requisição

---

### 3.3 Dashboard — `/dashboard`

**Objetivo:** Visão geral do dia — o usuário vê o que precisa fazer agora.

**Seções da página:**

**Cabeçalho do dia:**
- Data atual formatada ("Hoje, segunda-feira 28")
- Saudação personalizada com nome do usuário
- Resumo do dia: X tarefas para hoje, X minutos focados, streak atual

**Rotina do dia:**
- Lista dos itens de rotina do dia atual (do endpoint `/api/routines/today`)
- Cada item exibe título e horário
- Visual de linha do tempo horizontal ou lista ordenada por horário

**Tarefas de hoje:**
- Lista das tarefas com status `today`
- Cada tarefa exibe: título, prioridade (cor), tempo estimado
- Botão de concluir diretamente na listagem
- Botão para iniciar Pomodoro na tarefa

**Barra de progresso diário:**
- Percentual de tarefas de hoje concluídas
- Animação ao completar tarefas

**XP e Streak (widget lateral):**
- XP total com barra de nível
- Streak em dias com ícone de chama
- Última conquista desbloqueada

**Requisitos funcionais:**
- RF-F13: Carregar dados do dashboard em paralelo (rotina + tarefas + gamificação)
- RF-F14: Atualizar contadores em tempo real ao concluir tarefas
- RF-F15: Animação de XP ao ganhar pontos
- RF-F16: Indicar visualmente tarefas com prazo vencido (cor vermelha)
- RF-F17: Estado vazio motivacional quando não há tarefas para hoje

---

### 3.4 Gestão de Tarefas — `/tasks`

**Objetivo:** Organizar, criar e mover tarefas entre os diferentes status.

**Layout:** Colunas kanban horizontais com scroll.

**Colunas:**
- 📥 Inbox
- 📅 Hoje
- 📆 Esta semana
- 🗃️ Backlog
- ✅ Concluídas

**Cada card de tarefa exibe:**
- Título
- Badge de prioridade (cor: verde/amarelo/vermelho)
- Tempo estimado (se informado)
- Data de vencimento (se informada, em vermelho se vencida)
- Botão de ações: editar, mover, excluir, iniciar Pomodoro

**Quick Capture:**
- Input fixo no topo da coluna Inbox
- Pressionar Enter cria a tarefa instantaneamente
- Campo limpa após criação com animação de confirmação

**Modal de tarefa:**
- Aberto ao clicar no card
- Campos editáveis: título, descrição, status, prioridade, tempo estimado, data de vencimento
- Histórico de sessões Pomodoro da tarefa
- Botão de excluir com confirmação

**Requisitos funcionais:**
- RF-F18: Drag and drop entre colunas para mover tarefas de status
- RF-F19: Drag and drop dentro da mesma coluna para reordenar
- RF-F20: Filtros globais por prioridade e data de vencimento
- RF-F21: Quick Capture com foco automático ao pressionar `Ctrl+K`
- RF-F22: Animação de remoção ao mover tarefa para "Concluídas"
- RF-F23: Contagem de tarefas por coluna exibida no cabeçalho
- RF-F24: Paginação ou infinite scroll na coluna "Concluídas"

---

### 3.5 Rotinas — `/routines`

**Objetivo:** Gerenciar os itens fixos da rotina diária.

**Layout:** Lista de itens com visualização por dias da semana.

**Visualização principal:**
- Tabela ou grade mostrando cada rotina e em quais dias está ativa
- Badge colorido por dia da semana
- Toggle para ativar/desativar sem excluir

**Modal de criação/edição:**
- Campos: título, horário, dias da semana (checkboxes), ordem
- Preview de "como vai aparecer hoje"

**Requisitos funcionais:**
- RF-F25: Toggle de ativação com feedback visual imediato (otimistic update)
- RF-F26: Seleção de dias da semana com interface de checkboxes amigável
- RF-F27: Ordenação via drag and drop
- RF-F28: Preview em tempo real da rotina do dia ao editar

---

### 3.6 Pomodoro — `/pomodoro`

**Objetivo:** Sessões de foco cronometradas com timer visual.

**Layout:** Página centralizada com timer em destaque.

**Timer visual:**
- Círculo SVG animado mostrando progresso do tempo
- Tempo restante em destaque no centro (MM:SS)
- Cor do timer muda conforme o estado: azul (focando), verde (pausa curta), laranja (pausa longa)

**Controles:**
- Botão Iniciar / Pausar / Abandonar
- Seletor de tarefa vinculada (dropdown com tarefas do dia)
- Contador de ciclos completados ("🍅 3/4")

**Configurações do Pomodoro:**
- Duração do foco (padrão: 25 min)
- Duração da pausa curta (padrão: 5 min)
- Duração da pausa longa (padrão: 15 min)
- Pausa longa a cada N ciclos (padrão: 4)

**Histórico da sessão:**
- Lista dos pomodoros do dia com tarefa vinculada e duração

**Requisitos funcionais:**
- RF-F29: Timer continua rodando ao navegar para outras páginas (estado no Zustand)
- RF-F30: Notificação sonora e visual ao fim do ciclo
- RF-F31: Título da aba do navegador atualiza com o tempo restante ("🍅 23:45 — Beakon")
- RF-F32: Ao finalizar ciclo, chamar `PATCH /api/pomodoro/{id}/finish` automaticamente
- RF-F33: Impedir iniciar nova sessão se uma já está ativa
- RF-F34: Configurações salvas no localStorage do usuário

---

### 3.7 Conquistas — `/achievements`

**Objetivo:** Exibir o progresso de gamificação do usuário.

**Layout:** Grade de cards de conquistas + barra de XP + histórico.

**Seção de XP e Nível:**
- Barra de progresso de XP com nível atual
- XP necessário para próximo nível
- Animação ao subir de nível

**Streak:**
- Calendário visual dos últimos 30 dias com dias ativos marcados
- Recorde pessoal de streak
- Streak atual em destaque

**Grade de conquistas:**
- Cards para cada conquista do catálogo
- Conquistas desbloqueadas em destaque (coloridas)
- Conquistas bloqueadas em cinza com dica do que falta para desbloquear
- Data de desbloqueio exibida nas conquistadas

**Requisitos funcionais:**
- RF-F35: Animação de desbloqueio de conquista (toast especial com confetti)
- RF-F36: Progresso parcial visível nas conquistas não desbloqueadas (ex: "47/100 pomodoros")
- RF-F37: Compartilhamento de conquista (copia link ou imagem — futuro)

---

## 4. Componentes Globais

### 4.1 Sidebar

- Logo Beakon no topo
- Links de navegação com ícones: Dashboard, Tarefas, Rotinas, Pomodoro, Conquistas
- Indicador visual da página ativa
- XP e streak resumidos no rodapé da sidebar
- Botão de logout
- Colapsável em telas menores

### 4.2 Header

- Nome da página atual
- Avatar do usuário com dropdown (perfil, configurações, logout)
- Badge de XP total
- Ícone de chama com streak atual

### 4.3 Quick Capture

- Input flutuante acessível via `Ctrl+K` em qualquer página
- Cria tarefa com título e envia para inbox
- Fecha automaticamente após criação
- Atalho visível no tooltip

### 4.4 Toast Notifications

Exibidos para todas as ações relevantes:

| Ação | Mensagem | Tipo |
|---|---|---|
| Tarefa criada | "Tarefa adicionada à inbox" | Info |
| Tarefa concluída | "+25 XP — Tarefa concluída!" | Sucesso |
| Conquista desbloqueada | "🏆 Conquista: Primeira Luz!" | Especial |
| Streak incrementado | "🔥 7 dias seguidos!" | Sucesso |
| Erro de rede | "Erro ao conectar com o servidor" | Erro |

---

## 5. Requisitos Não Funcionais

| Código | Categoria | Descrição |
|---|---|---|
| RNF-F01 | Performance | First Contentful Paint abaixo de 1.5s |
| RNF-F02 | Performance | Lazy loading em rotas e componentes pesados |
| RNF-F03 | UX | Skeleton loaders em todos os carregamentos de dados |
| RNF-F04 | UX | Optimistic updates nas ações principais (concluir tarefa, toggle rotina) |
| RNF-F05 | UX | Estados vazios com mensagens motivacionais |
| RNF-F06 | Acessibilidade | Navegação completa por teclado |
| RNF-F07 | Acessibilidade | Contraste mínimo WCAG AA em todos os textos |
| RNF-F08 | Responsividade | Layout adaptado para tablets (768px+) |
| RNF-F09 | Segurança | Token JWT nunca exposto no localStorage |
| RNF-F10 | Segurança | Rotas autenticadas protegidas por middleware Next.js |
| RNF-F11 | DX | Tipagem TypeScript estrita em todos os componentes |
| RNF-F12 | DX | Variáveis de ambiente via `.env.local` |

---

## 6. Gerenciamento de Estado (Zustand)

### Stores planejadas

**authStore**
```ts
{
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email, password) => Promise<void>
  logout: () => void
}
```

**taskStore**
```ts
{
  tasks: Task[]
  isLoading: boolean
  fetchTasks: (filters?) => Promise<void>
  createTask: (data) => Promise<void>
  updateTask: (id, data) => Promise<void>
  moveTask: (id, status) => Promise<void>
  completeTask: (id) => Promise<void>
  deleteTask: (id) => Promise<void>
}
```

**pomodoroStore**
```ts
{
  session: PomodoroSession | null
  isRunning: boolean
  timeRemaining: number
  cyclesCompleted: number
  mode: 'focus' | 'short_break' | 'long_break'
  config: PomodoroConfig
  start: (taskId) => Promise<void>
  pause: () => void
  finish: (completed) => Promise<void>
  tick: () => void
}
```

**gamificationStore**
```ts
{
  xp: number
  streakDays: number
  achievements: Achievement[]
  dashboard: DashboardData | null
  fetchDashboard: () => Promise<void>
  addXP: (amount) => void
}
```

---

## 7. Integrações com a API

Todas as chamadas passam por uma instância Axios centralizada com:
- `baseURL` apontando para a API Symfony
- Interceptor de request: injeta token JWT no header `Authorization`
- Interceptor de response: trata `401` redirecionando para login e `422` formatando erros de validação

---

## 8. Fases de Desenvolvimento Frontend

| Fase | Nome | Entregas | Status |
|---|---|---|---|
| 1 | Setup | Next.js, Shadcn, Zustand, Axios, estrutura de pastas | Pendente |
| 2 | Autenticação | Login, registro, proteção de rotas, authStore | Pendente |
| 3 | Layout Base | Sidebar, Header, Quick Capture, Toast | Pendente |
| 4 | Dashboard | Visão do dia, rotina, tarefas de hoje, widgets | Pendente |
| 5 | Tarefas | Kanban, drag and drop, modal, quick capture | Pendente |
| 6 | Rotinas | Listagem, criação, toggle, dias da semana | Pendente |
| 7 | Pomodoro | Timer visual, ciclos, histórico, notificações | Pendente |
| 8 | Conquistas | XP, streak, grade de conquistas, animações | Pendente |
| 9 | Polimento | Responsividade, acessibilidade, performance | Pendente |

---

*Beakon Frontend v1.0 — Documento de Levantamento de Requisitos*
