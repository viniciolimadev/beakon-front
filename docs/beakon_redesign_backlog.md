# BEAKON — Backlog Adicional: Reformulação UI/UX
> Design System · Visual Identity · Component Redesign
> Versão 1.0 | 2025

---

## Legenda

| Símbolo | Significado |
|---|---|
| 🔴 Alta | Bloqueante — base para todos os outros componentes |
| 🟡 Média | Importante para consistência visual |
| 🟢 Baixa | Refinamento e polish final |
| ⬜ Pendente | Não iniciado |
| 🔄 Em andamento | Em desenvolvimento |
| ✅ Concluído | Finalizado e validado |

---

## ÉPICO DS-1 — Design System e Tokens

> Estabelecer a fundação visual do Beakon antes de qualquer componente.

---

### US-DS01 — Configurar tokens de cor no Tailwind
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** desenvolvedor,
**quero** ter todos os tokens de cor do Beakon configurados no Tailwind,
**para que** nenhum componente use cor hardcoded.

**Critérios de aceitação:**
- [ ] `tailwind.config.ts` com todos os tokens da paleta Beakon
- [ ] Classes disponíveis: `bg-background`, `bg-surface`, `bg-surface-elevated`
- [ ] Classes de borda: `border-border`, `border-border-accent`
- [ ] Classes de texto: `text-primary`, `text-secondary`, `text-muted`
- [ ] Classes semânticas: `text-success`, `text-warning`, `text-danger`
- [ ] Tokens de glow e gradiente disponíveis como CSS variables em `globals.css`
- [ ] Dark mode configurado como padrão via `class` strategy

---

### US-DS02 — Configurar tipografia Geist
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 1 ponto

**Como** desenvolvedor,
**quero** ter as fontes Geist e Geist Mono configuradas como padrão,
**para que** a tipografia seja consistente em toda a aplicação.

**Critérios de aceitação:**
- [ ] `next/font` configurado com `Geist` e `Geist_Mono`
- [ ] Fontes aplicadas via CSS variables no `layout.tsx` raiz
- [ ] Tailwind configurado com `fontFamily.sans` e `fontFamily.mono`
- [ ] Letter-spacing negativo (`-0.02em`) aplicado em headings via plugin ou classe

---

### US-DS03 — Criar variantes de componentes com CVA
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 3 pontos

**Como** desenvolvedor,
**quero** ter variantes tipadas com `class-variance-authority` para os componentes base,
**para que** o uso seja consistente e seguro em TypeScript.

**Critérios de aceitação:**
- [ ] `buttonVariants` com variantes: `primary`, `secondary`, `ghost`, `danger`
- [ ] `badgeVariants` com variantes: `success`, `warning`, `danger`, `muted`
- [ ] `cardVariants` com variantes: `default`, `elevated`, `interactive`
- [ ] `inputVariants` com variantes: `default`, `error`, `success`
- [ ] Todas as variantes exportadas e documentadas com comentários

---

### US-DS04 — Configurar sombras e glows customizados
**Prioridade:** 🟡 Média | **Status:** ⬜ Pendente | **Estimativa:** 1 ponto

**Como** desenvolvedor,
**quero** ter as sombras e glows do Beakon disponíveis como classes Tailwind,
**para que** a elevação seja consistente em todos os componentes.

**Critérios de aceitação:**
- [ ] `shadow-card`, `shadow-modal`, `shadow-sm` configurados no Tailwind
- [ ] `glow-primary`, `glow-success` disponíveis como utilitários
- [ ] Nenhum componente usa `shadow-md` ou `shadow-lg` padrão do Tailwind

---

### US-DS05 — Documentar o Design System em Storybook ou MDX
**Prioridade:** 🟢 Baixa | **Status:** ⬜ Pendente | **Estimativa:** 4 pontos

**Como** desenvolvedor,
**quero** ter os componentes do Beakon documentados visualmente,
**para que** seja fácil reutilizá-los sem consultar o código.

**Critérios de aceitação:**
- [ ] Paleta de cores renderizada visualmente
- [ ] Todos os componentes primitivos com suas variantes exibidas
- [ ] Estados interativos (hover, focus, disabled) demonstrados
- [ ] Snippets de uso copiáveis para cada componente

---

## ÉPICO DS-2 — Componentes Primitivos (Shadcn Customizado)

> Estender os componentes Shadcn com a identidade visual do Beakon.

---

### US-DS06 — Redesign do componente Button
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** usuário,
**quero** botões com a identidade visual do Beakon,
**para que** as ações sejam claras e visualmente coerentes.

**Critérios de aceitação:**
- [ ] Variante `primary`: azul com glow sutil `shadow-[0_0_16px_rgba(59,130,246,0.3)]`
- [ ] Variante `secondary`: surface com border, sem glow
- [ ] Variante `ghost`: sem background, texto em primary no hover
- [ ] Variante `danger`: vermelho com glow danger no hover
- [ ] Estado `loading`: spinner inline substitui o label, botão desabilitado
- [ ] Todos os estados com transição `duration-200`
- [ ] Tamanhos: `sm` (32px), `md` (36px), `lg` (40px)

---

### US-DS07 — Redesign do componente Input
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** usuário,
**quero** campos de input com visual refinado e feedback de estado claro,
**para que** o preenchimento de formulários seja agradável.

**Critérios de aceitação:**
- [ ] Background `bg-surface`, borda `border-border` por padrão
- [ ] Focus: `border-primary` + `ring-1 ring-primary/30`
- [ ] Estado erro: `border-danger` + mensagem de erro abaixo com ícone
- [ ] Estado sucesso: `border-success` + ícone de check à direita
- [ ] Placeholder com `text-muted` (não cinza genérico)
- [ ] Suporte a ícone prefixo e sufixo via slot

---

### US-DS08 — Redesign do componente Card
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** desenvolvedor,
**quero** um componente Card com variantes adequadas ao contexto do Beakon,
**para que** a hierarquia visual de painéis seja clara.

**Critérios de aceitação:**
- [ ] Variante `default`: `bg-surface border-border rounded-xl`
- [ ] Variante `elevated`: `bg-surface-elevated` com `shadow-card`
- [ ] Variante `interactive`: hover com `border-border-accent` e `bg-surface-elevated`
- [ ] Variante `glow`: border com glow colorido (usado em conquistas)
- [ ] Padding interno padronizado: `p-4` (16px)

---

### US-DS09 — Redesign do componente Badge
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 1 ponto

**Como** usuário,
**quero** badges com semântica visual clara para prioridades e status,
**para que** eu identifique informações de relance.

**Critérios de aceitação:**
- [ ] Variante `success`: verde com background `success/10` e border `success/20`
- [ ] Variante `warning`: amarelo com background `warning/10` e border `warning/20`
- [ ] Variante `danger`: vermelho com background `danger/10` e border `danger/20`
- [ ] Variante `muted`: cinza sutil para status secundários
- [ ] Tamanho único: `px-2 py-0.5 text-xs rounded-full`
- [ ] Suporte a ícone prefixo (dot colorido)

---

### US-DS10 — Criar componente EmptyState
**Prioridade:** 🟡 Média | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** usuário,
**quero** ver estados vazios motivacionais e contextuais,
**para que** a ausência de dados não pareça um erro ou interface quebrada.

**Critérios de aceitação:**
- [ ] Componente aceita: `icon`, `title`, `description`, `action` (CTA opcional)
- [ ] Ícone com background circular sutil
- [ ] Título em `text-secondary`, descrição em `text-muted`
- [ ] CTA com botão `ghost` ou `primary` conforme contexto
- [ ] Variantes pré-configuradas: `inbox`, `today`, `routines`, `achievements`, `pomodoro`

---

### US-DS11 — Criar componente SkeletonLoader
**Prioridade:** 🟡 Média | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** usuário,
**quero** ver skeletons animados durante carregamentos,
**para que** a interface não pareça travada.

**Critérios de aceitação:**
- [ ] Componente base `Skeleton` com animação `pulse`
- [ ] Variante `SkeletonCard` simulando um TaskCard
- [ ] Variante `SkeletonRoutineItem` simulando item de rotina
- [ ] Variante `SkeletonAchievement` simulando card de conquista
- [ ] Background `bg-surface-elevated` com opacidade animada
- [ ] Border-radius herdado do componente que substitui

---

### US-DS12 — Criar componente Toast customizado
**Prioridade:** 🟡 Média | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** usuário,
**quero** notificações toast com visual alinhado ao Beakon,
**para que** o feedback de ações seja bonito e coerente.

**Critérios de aceitação:**
- [ ] Variante `success`: borda esquerda verde + ícone check
- [ ] Variante `error`: borda esquerda vermelha + ícone alerta
- [ ] Variante `xp`: ícone de estrela + valor de XP ganho em destaque
- [ ] Variante `achievement`: ícone de troféu + nome da conquista + confetti
- [ ] Background `bg-surface-elevated` com `shadow-modal`
- [ ] Animação de entrada: slide-in da direita
- [ ] Auto-close em 4 segundos com barra de progresso sutil

---

## ÉPICO DS-3 — Reformulação do Layout Global

> Redesenhar sidebar, header e shell para máxima clareza e usabilidade.

---

### US-DS13 — Redesign da Sidebar
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 3 pontos

**Como** usuário,
**quero** uma sidebar elegante com identidade visual Beakon,
**para que** a navegação seja clara e agradável.

**Critérios de aceitação:**
- [ ] Background `bg-surface` com border direita `border-border`
- [ ] Logo Beakon no topo com tipografia customizada
- [ ] Links de navegação com ícone Lucide + label
- [ ] Item ativo: background `bg-primary/10`, texto `text-primary`, border esquerda `border-primary`
- [ ] Item hover: `bg-surface-elevated` com transição suave
- [ ] Seção inferior: XP com barra de progresso mini + streak com chama
- [ ] Botão collapse com ícone animado (chevron rotaciona)
- [ ] Largura colapsada: apenas ícones com tooltip ao hover

---

### US-DS14 — Redesign do Header
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** usuário,
**quero** um header limpo com meu progresso sempre visível,
**para que** eu me mantenha motivado ao usar o app.

**Critérios de aceitação:**
- [ ] Background `bg-background/80` com `backdrop-blur-sm` (efeito glass)
- [ ] Border inferior `border-border` com `border-b`
- [ ] Nome da página atual em destaque à esquerda
- [ ] Badge de XP total com ícone de raio (Lucide `Zap`)
- [ ] Streak com ícone de chama laranja e número em `font-mono`
- [ ] Avatar com dropdown: nome, configurações (futuro), logout
- [ ] Posição `sticky top-0 z-40`

---

### US-DS15 — Redesign do Quick Capture
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 3 pontos

**Como** usuário,
**quero** um modal de captura rápida sofisticado e instantâneo,
**para que** registrar uma ideia seja a ação mais fácil do app.

**Critérios de aceitação:**
- [ ] Modal centralizado com backdrop blur `bg-background/60 backdrop-blur-md`
- [ ] Input grande (18-20px), sem borda visível, foco automático
- [ ] Placeholder: "Capturar ideia... (Enter para salvar)"
- [ ] Rodapé do modal: hint de atalhos `↵ salvar` · `esc fechar`
- [ ] Animação de abertura: scale de 0.95 para 1 + fade in (`duration-150`)
- [ ] Animação de confirmação: input pulsa em verde + fecha automaticamente
- [ ] Acessível via `Ctrl+K` em qualquer página

---

## ÉPICO DS-4 — Reformulação das Páginas

> Aplicar o novo design system em cada página da aplicação.

---

### US-DS16 — Redesign da página de Login/Register
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 3 pontos

**Como** novo usuário,
**quero** uma tela de entrada visualmente impactante,
**para que** minha primeira impressão do Beakon seja memorável.

**Critérios de aceitação:**
- [ ] Layout dividido: lado esquerdo com branding, lado direito com formulário (desktop)
- [ ] Lado esquerdo: gradiente radial azul profundo + logo grande + tagline
- [ ] Lado direito: fundo `bg-surface` com formulário centralizado
- [ ] Mobile: apenas formulário com logo pequeno no topo
- [ ] Animação de entrada dos campos com stagger (Framer Motion)
- [ ] Efeito de partículas ou noise texture sutil no background esquerdo

---

### US-DS17 — Redesign do Dashboard
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 4 pontos

**Como** usuário,
**quero** um dashboard visualmente rico e funcional,
**para que** abrir o Beakon me oriente imediatamente para o que fazer.

**Critérios de aceitação:**
- [ ] Saudação com gradiente de texto (`bg-clip-text text-transparent`)
- [ ] Grid responsivo: 2 colunas em desktop, 1 em mobile
- [ ] Card de tarefas de hoje com animação de stagger na listagem
- [ ] Card de rotina com linha do tempo vertical estilizada
- [ ] Barra de progresso diário com gradiente `--xp-gradient` animado
- [ ] Widget de XP com nível em destaque e barra shimmer
- [ ] Widget de streak com chama animada (Lottie ou CSS animation)
- [ ] Transição de página com Framer Motion `AnimatePresence`

---

### US-DS18 — Redesign do Kanban de Tarefas
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 5 pontos

**Como** usuário,
**quero** um kanban visualmente sofisticado com drag and drop fluido,
**para que** organizar tarefas seja intuitivo e satisfatório.

**Critérios de aceitação:**
- [ ] Cabeçalho de coluna estilo label: `INBOX · 4` em uppercase muted
- [ ] Cards com hover lift (translateY(-2px) + shadow elevada)
- [ ] Card arrastando: `opacity-60 scale-105 shadow-modal cursor-grabbing`
- [ ] Coluna de destino durante drag: `border-primary bg-primary/5`
- [ ] Badge de prioridade com dot colorido à esquerda do título
- [ ] Animação de entrada dos cards com stagger por coluna
- [ ] Modal de tarefa com backdrop blur e animação scale
- [ ] Botão de concluir: check circle que anima ao clicar (scale + green flash)

---

### US-DS19 — Redesign da página de Rotinas
**Prioridade:** 🟡 Média | **Status:** ⬜ Pendente | **Estimativa:** 3 pontos

**Como** usuário,
**quero** uma página de rotinas visualmente organizada e fácil de editar,
**para que** configurar minha estrutura diária seja rápido.

**Critérios de aceitação:**
- [ ] Lista de itens com linha do tempo vertical decorativa à esquerda
- [ ] Horário em `font-mono text-muted` à esquerda de cada item
- [ ] Badges de dias da semana com cores distintas por dia
- [ ] Toggle de ativar/desativar com animação de switch customizada
- [ ] Visualização semanal em grade: dias como colunas, itens como chips
- [ ] Dia atual destacado com borda `border-primary`
- [ ] Modal de criação com seletor de dias visual (botões toggle por dia)

---

### US-DS20 — Redesign do Timer Pomodoro
**Prioridade:** 🔴 Alta | **Status:** ⬜ Pendente | **Estimativa:** 4 pontos

**Como** usuário,
**quero** um timer Pomodoro visualmente impactante e sem distração,
**para que** o estado de foco seja reforçado pela interface.

**Critérios de aceitação:**
- [ ] Círculo SVG de 280px com stroke animado via `stroke-dashoffset`
- [ ] Gradiente no anel: rotaciona suavemente durante a sessão
- [ ] Tempo em `font-mono text-6xl` no centro do círculo
- [ ] Transição de cor do anel entre modos via CSS transition (1s ease)
- [ ] Background da página: gradiente radial sutil com a cor do modo atual
- [ ] Modo foco: partículas sutis ou noise animado no background
- [ ] Mini player no header quando sessão ativa (anel mini + tempo)
- [ ] Animação de celebração ao completar ciclo (scale + flash verde)
- [ ] Configurações em painel lateral deslizante (Sheet do Shadcn)

---

### US-DS21 — Redesign da página de Conquistas
**Prioridade:** 🟡 Média | **Status:** ⬜ Pendente | **Estimativa:** 4 pontos

**Como** usuário,
**quero** uma página de conquistas visualmente celebrativa e motivadora,
**para que** ver meu progresso seja uma experiência satisfatória.

**Critérios de aceitação:**
- [ ] Barra de XP com gradiente animado e efeito shimmer
- [ ] Nível atual em destaque com badge especial
- [ ] Calendário de streak estilo heatmap (30 dias) com gradiente de intensidade
- [ ] Cards de conquistas desbloqueadas: glow colorido + brilho sutil
- [ ] Cards bloqueadas: `grayscale brightness-50` + blur leve no ícone
- [ ] Progresso parcial: mini barra de progresso em cada card bloqueado
- [ ] Animação de desbloqueio: card flipa, confetti, toast especial
- [ ] Seção "Próximas conquistas" destacando as 3 mais próximas de desbloquear

---

## ÉPICO DS-5 — Micro-interações e Animações Globais

> Camada final de polish que torna o Beakon memorável.

---

### US-DS22 — Animação de ganho de XP
**Prioridade:** 🟡 Média | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** usuário,
**quero** uma animação satisfatória ao ganhar XP,
**para que** completar tarefas seja recompensador visualmente.

**Critérios de aceitação:**
- [ ] Número de XP ganho flutua para cima e desaparece (`+25 XP`)
- [ ] Barra de XP na sidebar preenche com animação suave
- [ ] Se subir de nível: flash de tela + toast especial + som (opcional)
- [ ] Animação não bloqueia o fluxo do usuário

---

### US-DS23 — Animação de conclusão de tarefa
**Prioridade:** 🟡 Média | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** usuário,
**quero** uma animação satisfatória ao concluir uma tarefa,
**para que** o ato de concluir seja celebrado.

**Critérios de aceitação:**
- [ ] Checkbox anima com check mark desenhado (SVG path animation)
- [ ] Título da tarefa risca com `line-through` progressivo
- [ ] Card desliza para fora da lista com `opacity-0 scale-95` + altura colapsa
- [ ] Toast de XP aparece simultaneamente

---

### US-DS24 — Transições entre páginas
**Prioridade:** 🟢 Baixa | **Status:** ⬜ Pendente | **Estimativa:** 2 pontos

**Como** usuário,
**quero** transições suaves ao navegar entre páginas,
**para que** a navegação pareça fluida e polida.

**Critérios de aceitação:**
- [ ] `AnimatePresence` do Framer Motion envolvendo o layout de páginas
- [ ] Transição padrão: fade + slide leve (y: 8 → 0, opacity: 0 → 1)
- [ ] Duração: 200ms com ease-out
- [ ] Não interfere com a performance de carregamento de dados

---

### US-DS25 — Modo de foco (Focus Mode)
**Prioridade:** 🟢 Baixa | **Status:** ⬜ Pendente | **Estimativa:** 3 pontos

**Como** usuário com TDAH,
**quero** um modo de foco que minimize distrações na interface,
**para que** eu me concentre apenas na tarefa e no timer.

**Critérios de aceitação:**
- [ ] Ativado automaticamente ao iniciar sessão Pomodoro
- [ ] Sidebar recolhe automaticamente
- [ ] Header simplificado: apenas timer mini + botão de sair do foco
- [ ] Background escurece levemente (overlay sutil)
- [ ] Atalho `Esc` ou botão para sair do modo foco
- [ ] Preferência salva: usuário pode desativar o modo automático

---

## Resumo do Backlog de Reformulação

| Épico | Histórias | Pontos | Descrição |
|---|---|---|---|
| DS-1 — Design System | 5 | 11 pts | Tokens, tipografia, CVA, sombras |
| DS-2 — Componentes Primitivos | 7 | 13 pts | Button, Input, Card, Badge, Empty, Skeleton, Toast |
| DS-3 — Layout Global | 3 | 8 pts | Sidebar, Header, Quick Capture |
| DS-4 — Páginas | 6 | 23 pts | Login, Dashboard, Kanban, Rotinas, Pomodoro, Conquistas |
| DS-5 — Micro-interações | 4 | 9 pts | XP, conclusão, transições, modo foco |
| **Total** | **25** | **64 pts** | |

---

## Ordem de Execução Recomendada

```
Fase 1 — Fundação (DS-1 completo + DS-2 completo)
  Sem o design system e os primitivos, nada mais faz sentido.

Fase 2 — Layout (DS-3 completo)
  Sidebar e header são vistos em todas as páginas.

Fase 3 — Páginas críticas (DS-16, DS-17, DS-18, DS-20)
  Login, Dashboard, Tarefas e Pomodoro são os fluxos principais.

Fase 4 — Páginas secundárias (DS-19, DS-21)
  Rotinas e Conquistas completam a experiência.

Fase 5 — Polish (DS-5 completo)
  Micro-interações e animações são a cereja do bolo.
```

---

*Beakon UI/UX Redesign v1.0 — Backlog Adicional*
