import express from "express";
import userRoutes  from "./routes/book-routes";

/* variaveis de configuracao */
const PORT = 8080;

/* iniciando o express */
const server = express();

/* configuracoes da aplicacao */
server.use(express.json()); // permitir que leia json

/* configuracao de rotas */
server.use(userRoutes);

/* inicializacao do servidor */
server.listen(`${PORT}`, () =>{
    console.log(`Server rodando em ${PORT}.`);
});
