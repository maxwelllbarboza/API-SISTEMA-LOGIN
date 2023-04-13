
type UsuarioCreate = {
    nome: String,
    email: String,
    senha: String
} 

class UsuarioService{
    async execute(data: UsuarioCreate)
}