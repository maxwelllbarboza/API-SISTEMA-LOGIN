import {Request, Response} from "express";
import { prismaClient } from "../database/client";
import bcrypt from "bcrypt";


async function consultarTodosUsuarios(req:Request, res: Response){
    try{
        const todosUsuarios = await prismaClient.usuario.findMany()    
        return res.status(200).json(todosUsuarios)

    }catch(error){
        return res.status(500).json({message:"Problema no servidor."})
    }   
}

async function consultarUmUsuarios(req:Request, res: Response){
    try{
        const { id } = req.params;
        
        const usuario = await prismaClient.usuario.findUnique({
            where:{
                id: Number(id)
            }
        })
        if(!usuario){
            return res.status(400).json({message: " Usuário não existe."})
        }
        return res.status(200).json(usuario)

    }catch(error){
        return res.status(500).json({message:"Problema no servidor."})
    }   
}

async function cadastrarUsuario(req: Request, res: Response){
    const {nome, email, senha} = req.body;

    if(!email || !senha || !nome){
        return res.status(403).json({"mensagem": "Usuário inválido(s)."})
    }
    const usuarioConsultado = await prismaClient.usuario.findUnique({where : { email }})

    if(usuarioConsultado){
        return res.status(404).json({message: "Usuário já existe."})
    }
    const senhaCripto = await bcrypt.hash(senha, 10);
    try{
        const usuarioCadastrado = await prismaClient.usuario.create({
            data: {
                nome,
                email,
                senha: senhaCripto
            },
              
        }).then(() =>{
            return res.status(201).json({message:"Usuário Cadastrado."})
        })    
    }catch (error){
        return res.status(500).json({message:"Problema no servidor."})
    }
   
};

export default {consultarTodosUsuarios, cadastrarUsuario, consultarUmUsuarios};