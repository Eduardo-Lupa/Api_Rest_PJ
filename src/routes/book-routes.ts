import { Request, Router, Response, NextFunction } from "express";

const userRoutes = Router();

// pegar todos os livros
userRoutes.get("/books", async (request: Request, result: Response, next: NextFunction) =>{
    // funcao para pegar todos os itens do banco de dados
    await result.status(200).send({ "Name" : "edu" });
});

// pegar livro por uuid
userRoutes.get("/books/:uuid", async (request: Request<{ uuid: String }>, result: Response, next: NextFunction) => {
    const uuid = request.params.uuid;
    // funcao para pegar so o livro por uuid
    await result.status(200).json({uuid: uuid}); // retornar livro
});

// add livro
userRoutes.post("/books", async (request: Request, result: Response, next: NextFunction) => {
    const { name, autor } = request.body;
    // funcao que add livro no banco de dados
    await result.status(201).send(`Adicionado livro com name: ${name} e autor: ${autor}.`);
});

// alterar livro por uuid
userRoutes.put("/books/:uuid", async (request: Request<{ uuid: String }>, result: Response, next: NextFunction) => {
    const uuid = request.params.uuid;
    const { name, autor } = request.body;
    // funcao que altera as info do livro identificado pelo uuid
    await result.status(200).send(`Livro ${uuid} foi alterado para name: ${name} e autor ${autor}.`);
});

userRoutes.delete("/books/:uuid", async (request: Request<{ uuid: String }>, result: Response, next: NextFunction) => {
    const uuid = request.params.uuid;
    //remover livro por uuid do banco de dados
    await result.status(200).send(`Livro com uuid: ${uuid} removido com sucesso.`);
});

export default userRoutes;