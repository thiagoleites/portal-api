# Simple API - Node.js, Fastify, SQLite

## Descrição

API completa para gerenciamento de usuários, categorias (com suporte a categorias pai/filho) e posts. Desenvolvida com Node.js, Fastify e SQLite, permite operações CRUD, upload de arquivos (avatar, thumb), e gerenciamento de rascunhos/publicações.

## Funcionalidades

### Usuários
- Cadastro de usuário com avatar
- Listagem, detalhamento, atualização e exclusão (soft delete)
- Campos: nome completo, usuário, senha, avatar, created_at, updated_at, deleted_at

### Categorias
- Cadastro de categorias com suporte a categorias pai/filho
- Listagem, detalhamento, atualização e exclusão
- Campos: nome (obrigatório), descrição (opcional), parent_id (categoria pai)

### Posts
- Cadastro de posts com imagem destacada (thumb)
- Slug gerado automaticamente pelo título
- Associação a categoria filha e usuário
- Conteúdo principal (pode incluir imagens)
- Publicação ou rascunho
- Listagem, detalhamento, atualização e exclusão
- Campos: título, subtítulo, slug, categoria_id, usuario_id, thumb, conteúdo, publicado, created_at, updated_at

## Instalação

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/thiagoleites/portal-api.git
   cd portal-api
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```

3. **Execute as migrações:**
   ```sh
   npm run migrate
   node src/db/migrateCategory.js
   node src/db/migratePost.js
   ```

4. **Inicie o servidor:**
   ```sh
   npm run dev
   ```
   O servidor estará disponível em `http://localhost:3000`

## Endpoints

### Usuários
- `POST /users` (multipart) - Cria usuário
- `GET /users` - Lista usuários
- `GET /users/:id` - Detalha usuário
- `PUT /users/:id` (multipart) - Atualiza usuário
- `DELETE /users/:id` - Remove usuário (soft delete)

### Categorias
- `POST /categories` - Cria categoria (parent_id opcional)
- `GET /categories` - Lista categorias
- `GET /categories/:id` - Detalha categoria
- `PUT /categories/:id` - Atualiza categoria
- `DELETE /categories/:id` - Remove categoria

### Posts
- `POST /posts` (multipart) - Cria post com thumb
- `GET /posts` - Lista posts
- `GET /posts/:id` - Detalha post
- `PUT /posts/:id` (multipart) - Atualiza post
- `DELETE /posts/:id` - Remove post

## Uploads
- Avatares: `public/avatars/`
- Thumbs dos posts: `public/thumbs/`

## Observações
- O campo `slug` dos posts é gerado automaticamente a partir do título.
- Para associar uma categoria filha ao post, utilize o `categoria_id` correspondente.
- O campo `publicado` aceita `true` (publicado) ou `false` (rascunho).

## Requisitos
- Node.js >= 18
- SQLite (instalado via dependência)

## Licença
MIT
