# Food Explorer

Food Explorer é uma aplicação de menu interativo para as vendas de um restaurante. Ela permite que os usuários visualizem os pratos disponíveis, obtenham informações detalhadas sobre cada um deles e realizem seus pedidos. O administrador com acesso a recursos adicionais, como a capacidade de adicionar, editar e excluir pratos do menu, pode gerenciar os pedidos individualmente a atualizar o status em "Pendente", "Preparando" e "Entregue".

![Food Explorer](link_para_a_imagem)

## Funcionalidades
- Autenticação: Os usuários devem se autenticar para acessar a aplicação. A autenticação é feita através de um sistema de login usando JWT (JSON Web Tokens).
- Busca de Pratos: Tanto o usuário quanto o admin podem realizar buscas pelo nome do prato ou pelos ingredientes.
- Visuaçização de pedidos em tabela com opção de busca por código ou status.

### Admin

- Cadastro de Pratos: Fornecer nome, categoria, descrição, ingredientes, preço e upload de imagem.
- Gerenciar pratos: O Admin pode editar os dados e excluir cada prato.

### Usuário

- Visualização de todos os pratos cadastrados.
- Adição de pratos ao carrinho.
- Controle da quantidade de itens no carrinho.
- Exclusão de pratos do carrinho.
- Marcação de pratos como favoritos.
- Visualização do pedido, soma total e métodos de pagamento.

## Tecnologias Utilizadas

- Front-end: React.js, Tanstack React-Query, Axios, styled-components;
- Back-end: Node.js, Express, JSON Web Token (JWT), Prisma, Typescript;

## Como Executar o Projeto

1. Clone o repositório: `git clone https://github.com/seu-usuario/nome-do-repositorio.git`
2. Instale as dependências: `npm install`
3. Execute o projeto: `npm start`

## Links Úteis

- [Demonstração Online](link_da_demo)
- [Repositório do Front-end](link_do_repositorio_frontend)
- [Repositório do Back-end](link_do_repositorio_backend)