# MRE Frontend

Sistema de gerenciamento de notícias e consulta de endereços desenvolvido com Next.js 16 e React 19.

## 📋 Índice

- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Docker](#-docker)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Funcionalidades](#-funcionalidades)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Padrões de Código](#-padrões-de-código)

## 🚀 Tecnologias

### Core
- **Next.js 16.0.8** - Framework React com App Router
- **React 19.2.1** - Biblioteca para interfaces de usuário
- **TypeScript 5** - Superset tipado do JavaScript

### Gerenciamento de Estado e Dados
- **TanStack Query 5.90** - Gerenciamento de estado assíncrono e cache
- **React Hook Form 7.68** - Gerenciamento de formulários
- **Zod 4.1** - Validação de schemas

### UI e Estilização
- **Tailwind CSS 4** - Framework CSS utility-first
- **Next Icons** - Biblioteca de ícones
- **CSS Modules** - Estilos com escopo local

### Utilitários
- **Axios 1.7** - Cliente HTTP
- **Moment.js 2.30** - Manipulação de datas
- **Lodash 4.17** - Funções utilitárias
- **Cookies Next 4.3** - Gerenciamento de cookies

### Dev Tools
- **ESLint 9** - Linter para código JavaScript/TypeScript
- **Prettier 3.7** - Formatador de código

## 📦 Pré-requisitos

- **Node.js** 20.x ou superior
- **npm** ou **yarn**
- **Docker** e **Docker Compose** (opcional)

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd mre-frontend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente** (opcional)
```bash
# Copie o arquivo de exemplo e configure
cp .env.example .env.local
```

## 🎯 Como Usar

### Modo Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000)

### Modo Produção

```bash
# Build da aplicação
npm run build

# Iniciar servidor de produção
npm start
```

## 🐳 Docker

### Configuração da API

Antes de rodar com Docker, configure a URL da API no `docker-compose.yml`:

```yaml
environment:
  - NEXT_PUBLIC_API_URL=http://host.docker.internal:8000  # Ajuste para seu backend
```

### Usando Docker Compose (Recomendado)

```bash
# Subir a aplicação
docker-compose up

# Subir em background
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar a aplicação
docker-compose down
```

A aplicação estará disponível em [http://localhost:3001](http://localhost:3001)

### Usando Docker direto

```bash
# Build da imagem
docker build -t mre-frontend .

# Rodar o container
docker run -p 3001:3001 -e PORT=3001 mre-frontend
```

📖 Veja mais detalhes em [DOCKER.md](./DOCKER.md)

## 📁 Estrutura do Projeto

```
mre-frontend/
├── src/
│   ├── app/                          # Rotas e páginas (App Router)
│   │   ├── (authenticated)/          # Rotas autenticadas
│   │   ├── (onboarding)/             # Rotas de onboarding
│   │   │   ├── address/              # Página de consulta de CEP
│   │   │   └── news/                 # Páginas de notícias
│   │   ├── layout.tsx                # Layout raiz
│   │   └── page.tsx                  # Página inicial
│   │
│   ├── common/                       # Código compartilhado
│   │   ├── actions/                  # Server Actions
│   │   ├── enums/                    # Enumerações
│   │   ├── types/                    # Types globais
│   │   └── utils/                    # Utilitários
│   │
│   ├── components/                   # Componentes reutilizáveis
│   │   ├── button/                   # Componente de botão
│   │   ├── layout/                   # Layouts
│   │   └── loading/                  # Estados de carregamento
│   │
│   ├── configs/                      # Configurações
│   │   ├── api/                      # Configuração de API (Axios)
│   │   └── styles/                   # Estilos globais
│   │
│   ├── modules/                      # Módulos da aplicação
│   │   ├── address/                  # Módulo de endereços
│   │   │   └── pages/                # Páginas do módulo
│   │   │       └── get/              # Consulta de CEP
│   │   └── news/                     # Módulo de notícias
│   │       └── pages/                # Páginas do módulo
│   │           ├── components/       # Componentes (modals)
│   │           └── list/             # Listagem de notícias
│   │
│   ├── providers/                    # Providers (Context API)
│   │   └── tanstack.provider.tsx     # Provider do TanStack Query
│   │
│   ├── services/                     # Camada de serviços
│   │   ├── client/                   # Serviços client-side
│   │   ├── domain/                   # Types de domínio
│   │   └── server/                   # Serviços server-side
│   │
│   └── storages/                     # Armazenamento local
│       ├── cookies/                  # Gerenciamento de cookies
│       └── local/                    # LocalStorage
│
├── public/                           # Arquivos estáticos
├── .dockerignore                     # Arquivos ignorados no Docker
├── .gitignore                        # Arquivos ignorados no Git
├── docker-compose.yml                # Configuração Docker Compose
├── Dockerfile                        # Configuração Docker
├── next.config.ts                    # Configuração do Next.js
├── package.json                      # Dependências e scripts
├── tsconfig.json                     # Configuração TypeScript
└── README.md                         # Este arquivo
```

## ✨ Funcionalidades

### 📰 Gerenciamento de Notícias
- ✅ Listagem de notícias com paginação
- ✅ Criar novas notícias
- ✅ Visualizar detalhes de notícias
- ✅ Editar notícias existentes
- ✅ Excluir notícias
- ✅ Filtros e ordenação
- ✅ Validação de formulários com Zod

### 📍 Consulta de Endereços
- ✅ Buscar endereço por CEP
- ✅ Validação de formato de CEP brasileiro
- ✅ Formatação automática do CEP
- ✅ Exibição completa dos dados do endereço
- ✅ Tratamento de erros

### 🎨 Interface
- ✅ Design responsivo (mobile-first)
- ✅ Loading states
- ✅ Mensagens de erro amigáveis
- ✅ Modals para ações CRUD
- ✅ Navegação intuitiva

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento

# Produção
npm run build            # Cria build de produção
npm start                # Inicia servidor de produção

# Qualidade de Código
npm run lint             # Executa o linter
npm run format           # Formata o código com Prettier
npm run format:check     # Verifica formatação do código
```

## 📐 Padrões de Código

### Estrutura de Componentes
```typescript
// Componente funcional
export function ComponentName() {
  // Hooks
  // Handlers
  // Render
  return <div>...</div>
}
```

### Nomenclatura
- **Componentes**: PascalCase (`NewsTable`, `AddressPage`)
- **Arquivos**: kebab-case para pastas, PascalCase para componentes
- **Variáveis**: camelCase com verbos auxiliares (`isLoading`, `hasError`)
- **Types/Interfaces**: PascalCase com prefixo `I` para interfaces

### Importações
```typescript
// 1. Bibliotecas externas
import { useState } from 'react'

// 2. Imports internos (absolutos)
import { NewsService } from '@/services/client/news.service'

// 3. Imports relativos
import { NewsTable } from './components/table'

// 4. Estilos
import './styles.css'
```

### Organização de Pastas por Módulo
```
module/
├── pages/                    # Páginas do módulo
│   ├── components/           # Componentes compartilhados
│   └── [page-name]/          # Página específica
│       ├── components/       # Componentes da página
│       ├── index.tsx         # Componente principal
│       ├── styles.css        # Estilos
│       └── [name].model.ts   # Lógica de negócio
```

### Validação com Zod
```typescript
export const schema = z.object({
  field: z.string().min(1, 'Campo obrigatório'),
})

export type FormData = z.infer<typeof schema>
```

### TanStack Query
```typescript
// Mutation
const mutation = useMutation({
  mutationFn: ServiceName.method,
  onSuccess: () => {
    // Revalidate
  },
})

// Query (em Server Components quando possível)
const data = await ServiceName.method()
```

## 🔐 Variáveis de Ambiente

### Desenvolvimento Local
```env
<<<<<<< Updated upstream
NEXT_PUBLIC_API_URL=http://localhost:3000

=======
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
>>>>>>> Stashed changes
```

### Docker
Configure no `docker-compose.yml`:
```yaml
environment:
  # Backend no host (Mac/Windows/Linux com Docker Desktop)
  - NEXT_PUBLIC_API_URL=http://host.docker.internal:8000
  
  # Ou backend em outro container
  # - NEXT_PUBLIC_API_URL=http://nome-do-container-backend:8000
  
  # Ou API externa
  # - NEXT_PUBLIC_API_URL=https://api.seudominio.com
```

### Variáveis Disponíveis
- `PORT` - Porta do servidor (padrão: 3000)
- `NEXT_PUBLIC_API_URL` - URL base da API backend
- `NODE_ENV` - Ambiente (development/production)
- `NEXT_TELEMETRY_DISABLED` - Desabilitar telemetria do Next.js

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e confidencial.

## 📧 Contato

Para dúvidas ou sugestões, entre em contato com a equipe de desenvolvimento.

---

Desenvolvido com ❤️ usando Next.js 16 e React 19
