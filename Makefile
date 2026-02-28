.PHONY: help install dev build start lint type-check up down logs clean

# Atalhos internos
COMPOSE     = docker compose --profile dev
SERVICE     = beakon-front-dev
RUN         = $(COMPOSE) run --rm $(SERVICE)

# Default target
help:
	@echo ""
	@echo "  Beakon Frontend  (todos os comandos rodam dentro do container)"
	@echo ""
	@echo "  Desenvolvimento"
	@echo "  ---------------"
	@echo "  make install     Instala as dependências"
	@echo "  make dev         Sobe o servidor de desenvolvimento (hot reload)"
	@echo "  make build       Gera o build de produção"
	@echo "  make start       Inicia o servidor de produção (após build)"
	@echo "  make lint        Executa o ESLint"
	@echo "  make type-check  Verifica tipagem TypeScript"
	@echo ""
	@echo "  Containers"
	@echo "  ----------"
	@echo "  make up          Sobe o container de produção em background"
	@echo "  make down        Derruba todos os containers"
	@echo "  make logs        Exibe os logs em tempo real"
	@echo ""
	@echo "  Utilitários"
	@echo "  -----------"
	@echo "  make clean       Remove o volume .next dentro do container"
	@echo ""

# ─── Desenvolvimento ──────────────────────────────────────────────────────────

install:
	$(RUN) npm install

dev:
	$(COMPOSE) up $(SERVICE)

build:
	$(RUN) npm run build

start:
	$(RUN) npm run start

lint:
	$(RUN) npm run lint

type-check:
	$(RUN) npx tsc --noEmit

# ─── Containers ───────────────────────────────────────────────────────────────

up:
	docker compose up -d beakon-front

down:
	docker compose --profile dev down

logs:
	docker compose --profile dev logs -f

# ─── Utilitários ──────────────────────────────────────────────────────────────

clean:
	$(RUN) rm -rf .next
