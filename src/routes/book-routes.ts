import { Request, Router, Response, NextFunction } from "express";
import dbController from "../controller/db-controller";

const userRoutes = Router();

// pegar todos os livros
userRoutes.get("/books", async (request: Request, result: Response, next: NextFunction) =>{
    const rowsList = await dbController.findAllBooks(); // tras uma lista das linhas{objeto/json} do DB
    result.status(200).send(rowsList); // retorna a lista com status OK 
});

// pegar livro por uuid
userRoutes.get("/books/:uuid", async (request: Request<{ uuid: string }>, result: Response, next: NextFunction) => {
    const uuid = request.params.uuid;
    const user = await dbController.findByUuid(uuid); // retorna unico obj book
    result.status(200).send(user); // retornar unico livro
});

// add livro
userRoutes.post("/books", async (request: Request, result: Response, next: NextFunction) => {
    const { name, author } = request.body;
    const uuid = await dbController.addBook(name, author); // retorna o uuid do novo livro
    result.status(201).send(`Adicionado livro com uuid: ${uuid}.`); 
});

// alterar livro por uuid
userRoutes.put("/books/:uuid", async (request: Request<{ uuid: string }>, result: Response, next: NextFunction) => {
    const uuid = request.params.uuid;
    const { name, author } = request.body;
    await dbController.updateBook(uuid, name, author); //espera terminar o update do livro
    result.status(200).send(`Livro ${uuid} foi alterado para name: ${name} e autor ${author}.`);
});

//deletar livro
userRoutes.delete("/books/:uuid", async (request: Request<{ uuid: string }>, result: Response, next: NextFunction) => {
    const uuid = request.params.uuid;
    await dbController.removeBook(uuid);
    result.status(200).send(`Livro com uuid: ${uuid} removido com sucesso.`);
});

export default userRoutes;
