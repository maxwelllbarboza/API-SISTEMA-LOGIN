import * as dotenv from 'dotenv' 
import express from "express";
import rotas from './routes';

dotenv.config()

const app = express();

app.use(express.json());
app.use(rotas);

const port = process.env.PORT

app.listen(port, ()=> console.log(`Servidor subiu na porta ${port}`))