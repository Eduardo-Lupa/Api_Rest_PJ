import { Request, Router, Response, NextFunction } from "express";

const routes = Router();

// pegar todos os livros
routes.get("/books", (request: Request, result: Response, next: NextFunction) =>{
    result.status(200).send({ "Name" : "edu" });
});

// pegar livro por uuid
routes.get("/books/:uuid", (request: Request<{ uuid: String }>, result: Response, next: NextFunction) => {
    const uuid = request.params.uuid;
    result.status(200).json({uuid: uuid});
})

// alterar livro pelo uuid
routes.post("/books/:uuid", (request: Request<{ uuid: String }>, result: Response, next: NextFunction) => {
    const uuid = request.params.uuid;
    const { name, autor } = request.body;
    // funcao que altera as info do livro identificado pelo uuid
    result.status(201).send(`Livro ${uuid} alterado com sucesso para name: ${name} autor: ${autor}.`);
})

export default routes;
