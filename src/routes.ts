import  controladorUsuarios from "./controladores/usuario";
import express from "express";
const rotas = express();


rotas.get("/", controladorUsuarios.consultarTodosUsuarios)   
rotas.get("/:id", controladorUsuarios.consultarUmUsuarios)

rotas.post('/usuario', controladorUsuarios.cadastrarUsuario)

export default rotas;