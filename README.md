# ApiRest com node.js 
Criação de uma ApiRest de uma biblioteca com banco de dados para o processo seletivo da Poli Júnior Engenharia.

## Requesitos
A Biblioteca Poli Júnior consiste numa API REST na qual seja possível Criar, Ler, Atualizar e Deletar livros com os seguinte requisitos:
- A API deverá ser feita em Node.JS;
- O Código será entregue pelo GitHub;
- O Banco de dados utilizado será da escolha do treinee, podendo ser relacional ou não relacional.

## Base de metodos criada pelo treinee 
- GET   /books        => para mostrar todos os livros
- GET   /books/:uuid  => para mostrar o livro com id específico 
- POST  /books        => para adicionar livros
- PUT /books/:uuid    => para alterar livro procurado pelo seu id
- DELETE /books/:uuid => para deleter livros por id

Linguagem: JavaScript em server-side(node.js) com TypeScript <br />
Banco de dados: PostgreSQL <br />
Framework: Express <br />
