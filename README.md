# UniFlow Frontend - Interface Vue.js 3

Este é o frontend do **UniFlow**, uma aplicação que gerencia tarefas, e-commerce e agendamentos, consumindo uma API RESTful backend (Laravel 12). Construído com **Vue.js 3**, usa **JWT** para autenticação.

## Tecnologias

- **Vue.js 3**: Framework principal.
- **Vue Router 4**: Navegação.
- **Pinia**: Gerenciamento de estado.
- **Axios**: Requisições HTTP.
- **UIkit CSS**: Estilização.
- **JWT**: Autenticação.
- **Vite**: Build tool.

## Estrutura

```
uniflow-frontend/
├── src/
│   ├── api/            # Configuração do Axios
│   ├── layouts/        # Layouts (ex.: barra de navegação)
│   ├── router/         # Rotas
│   ├── stores/         # Stores do Pinia
│   ├── views/          # Páginas (Home, Todos, etc.)
│   ├── App.vue         # Componente raiz
│   └── main.js         # Entrada da aplicação
├── package.json        # Dependências
└── README.md
```

## Funcionalidades

- **Todo List**: Criar, listar, atualizar e deletar tarefas (em desenvolvimento).
- **E-commerce Dashboard**: Gerenciar produtos e vendas (em desenvolvimento).
- **Calendário de Reuniões**: Agendar reuniões (em desenvolvimento).
- **Mini E-commerce**: Catálogo e checkout (em desenvolvimento).

## Pré-requisitos

- Node.js 16+
- npm 7+
- Backend rodando em `http://localhost:8000`

## Como Rodar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/uniflow-frontend.git
   cd uniflow-frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o backend (Laravel):
   ```bash
   cd ~/projetos/uniflow
   php artisan serve
   ```

4. Inicie o frontend:
   ```bash
   npm run dev
   ```
   - Acesse: `http://localhost:5173`

## Autenticação com JWT

A autenticação será feita com JWT:
- Login retorna um token, armazenado no frontend.
- Token é enviado no cabeçalho `Authorization` (`Bearer <token>`).
- Rotas protegidas (ex.: `/dashboard`) exigem token.

## Autenticação

- Ao iniciar o app, você verá a tela de login/registro.
- Para testar o login, use:
  - **Email:** admin@teste.com
  - **Senha:** 123456
- O registro é simulado e não cria usuários reais.
- O botão "Sair" faz logout e retorna para a tela de login.

## Próximos Passos

- Implementar autenticação JWT.
- Desenvolver E-commerce Dashboard, Calendário e Mini E-commerce.
- Adicionar testes com Vitest.