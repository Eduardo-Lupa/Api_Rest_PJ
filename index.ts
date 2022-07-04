import express from "express";

// variaveis de configuracao
var PORT = 8080;

// iniciando o express
var server = express();


server.listen(`${PORT}`, () =>{
    console.log("Server rodando em " + PORT + ".")
});
