# Beakon — Frontend

Interface web do Beakon, aplicativo de produtividade para pessoas com TDAH. Construído com Next.js 15, TypeScript estrito e Tailwind CSS.

## Stack

| Tecnologia | Versão | Uso |
|---|---|---|
| Next.js | 15 (App Router) | Framework React |
| TypeScript | 5 | Tipagem estrita |
| Tailwind CSS | 3 | Estilização |
| Shadcn/ui | — | Componentes de UI |
| Zustand | — | Estado global |
| Axios | — | Chamadas à API |
| React Hook Form + Zod | — | Formulários e validação |
| Docker | — | Ambiente de desenvolvimento e produção |

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/)
- `make`

> Node.js **não é necessário** na máquina host. Todos os comandos rodam dentro do container.

## Início rápido

```bash
# 1. Clone o repositório
git clone https://github.com/viniciolimadev/beakon-front.git
cd beakon-front

# 2. Copie o arquivo de variáveis de ambiente
cp .env.example .env.local

# 3. Instale as dependências dentro do container
make install

# 4. Suba o servidor de desenvolvimento
make dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

| Variável | Padrão | Descrição |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | URL base da API Beakon |

## Comandos disponíveis

```bash
make help        # Lista todos os comandos
```

### Desenvolvimento

```bash
make install     # Instala as dependências
make dev         # Servidor de desenvolvimento com hot reload
make lint        # Executa o ESLint
make type-check  # Verifica tipagem TypeScript sem emitir arquivos
```

### Produção

```bash
make build       # Gera o build de produção
make start       # Inicia o servidor de produção (após build)
make up          # Sobe o container de produção em background
make down        # Derruba todos os containers
make logs        # Exibe logs em tempo real
```

### Utilitários

```bash
make clean       # Remove o cache .next dentro do container
```

## Estrutura de pastas

```
src/
├── app/
│   ├── (auth)/              # Rotas públicas
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/         # Rotas autenticadas
│   │   ├── dashboard/
│   │   ├── tasks/
│   │   ├── routines/
│   │   ├── pomodoro/
│   │   ├── achievements/
│   │   └── layout.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx             # Redireciona para /dashboard
├── components/
│   ├── ui/                  # Componentes Shadcn/ui
│   ├── layout/              # Sidebar, Header, QuickCapture
│   └── shared/              # Componentes reutilizáveis
├── hooks/                   # Custom hooks
├── lib/
│   └── utils.ts             # Utilitários (cn, etc.)
├── services/
│   └── api.ts               # Instância Axios centralizada
├── stores/                  # Stores Zustand
│   ├── authStore.ts
│   ├── taskStore.ts
│   ├── pomodoroStore.ts
│   └── gamificationStore.ts
└── types/                   # Interfaces e tipos globais
    ├── user.ts
    ├── task.ts
    ├── routine.ts
    ├── pomodoro.ts
    └── gamification.ts
```

## Paleta de cores

| Token | Hex | Uso |
|---|---|---|
| Primary | `#3B82F6` | Ações principais, links |
| Primary Dark | `#1E40AF` | Hover, títulos |
| Success | `#10B981` | Tarefas concluídas, streak ativo |
| Warning | `#F59E0B` | Prazos próximos, prioridade média |
| Danger | `#EF4444` | Prioridade alta, erros |
| Background | `#0F172A` | Fundo principal |
| Surface | `#1E293B` | Cards, modais, sidebar |
| Border | `#334155` | Bordas e divisores |
| Text Primary | `#F1F5F9` | Textos principais |
| Text Muted | `#94A3B8` | Textos secundários |

## Git Flow

```
main          ← releases estáveis
└── develop   ← integração
    └── feature/US-FXX-descricao  ← desenvolvimento
```

- Branches de feature partem de `develop`
- PRs são abertos de `feature/*` → `develop`
- `develop` → `main` a cada release
