import { Request, Router, Response, NextFunction } from "express";
import dbController from "../controller/db-controller";

const userRoutes = Router();

// pegar todos os livros
userRoutes.get("/books", async (request: Request, result: Response, next: NextFunction) =>{
    try{
        const rowsList = await dbController.findAllBooks(); // tras uma lista das linhas{objeto/json} do DB
        result.status(200).send(rowsList); // retorna a lista com status OK 
    }catch { //(error)
        result.status(500).send(`Internal Server Error, o servidor encontrou uma condição inesperada e que o impediu de atender à solicitação.`)
        // que passaria no logger(error)
    }
});

// pegar livro por uuid
userRoutes.get("/books/:uuid", async (request: Request<{ uuid: string }>, result: Response, next: NextFunction) => {
    try{
        const uuid = request.params.uuid;
        const user = await dbController.findByUuid(uuid); // retorna unico obj book
        result.status(200).send(user); // retornar unico livro
    }catch{ //(error)
        // condicional if para verificar parametros passados
        // result.status(400).send(`Bad Request, o servidor não entendeu a requisição pois está com uma sintaxe inválida.`);
        // condicional else if para verificar se usuario existe no banco de dados
        result.status(404).send(`Not Found, o servidor não conseguiu encontrar o recurso solicitado.`)
        // else
        // que passaria no logger(error)
    }
});

// add livro
userRoutes.post("/books", async (request: Request, result: Response, next: NextFunction) => {
    try{
        const { name, author } = request.body;
        const uuid = await dbController.addBook(name, author); // retorna o uuid do novo livro
        result.status(201).send(`Adicionado livro com uuid: ${uuid}.`); 
    }catch{ //(error)
        // condicional if para verificar parametros passados
        result.status(400).send("Bad Request, o servidor não entendeu a requisição pois está com uma sintaxe inválida.");
        // else
        // que passaria no logger(error)
    }
});

// alterar livro por uuid
userRoutes.put("/books/:uuid", async (request: Request<{ uuid: string }>, result: Response, next: NextFunction) => {
    try{
        const uuid = request.params.uuid;
        const { name, author } = request.body;
        await dbController.updateBook(uuid, name, author); //espera terminar o update do livro
        result.status(200).send(`Livro ${uuid} foi alterado para name: ${name} e autor ${author}.`);
    }catch{ // (error)
        // condicional if para verificar parametros passados
        result.status(400).send(`Bad Request, o servidor não entendeu a requisição pois está com uma sintaxe inválida.`);
        // condicional else if para verificar se usuario existe no banco de dados
        // result.status(404).send(`Not Found, o servidor não conseguiu encontrar o recurso solicitado.`)
        // else
        // que passaria no logger(error)
    }

});

//deletar livro
userRoutes.delete("/books/:uuid", async (request: Request<{ uuid: string }>, result: Response, next: NextFunction) => {
    try{
        const uuid = request.params.uuid;
        await dbController.removeBook(uuid);
        result.status(200).send(`Livro com uuid: ${uuid} removido com sucesso.`);
    }catch { // (error)
        // condicional if para verificar parametros passados
        // result.status(400).send(`Bad Request, o servidor não entendeu a requisição pois está com uma sintaxe inválida.`);
        // condicional else if para verificar se usuario existe no banco de dados
        result.status(404).send(`Not Found, o servidor não conseguiu encontrar o recurso solicitado.`)
        // else
        // que passaria no logger(error)
    }
});

// como melhorar a sintaxe, criar uma funcao que dentro dela terá varios if de verificacao, cada verificacao retornara um valor
// const statusCode: int = function returnStatus;
// result.status(statusCode).send(funcaoRetornaStringDeAcordoComValorPassado(statuCode))

export default userRoutes;
