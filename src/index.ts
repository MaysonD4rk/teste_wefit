import express, { Request, Response } from "express";
import knex from "knex";
import dotenv from "dotenv";
import { Usuario } from "./models/userModel";
import {development}  from "./database/knexfile";
import { createUsersTable } from "./database/migrations/create_users_table";
import { emailIsValid, validarCPF } from "./methods/validation";

dotenv.config();


const db = knex(development);


createUsersTable(db)
  .then(() => {
    console.log('Tabela criada');
  })
  .catch((error) => {
    console.error('Erro:', error);
  });

const app = express();
app.use(express.json());

const port = process.env.PORT || 4568;



app.get("/ping", (req, res) => {
  return res.send("pong");
});

app.post("/cadastrar", async (req: Request, res: Response) => {

  console.log("tentando entrar");

  try {
    const body = req.body as Usuario | null;

    if (!body) {
      return res.status(400).send("Body não encontrado");
    }

    

    const {
      cnpj,
      cpf,
      nome,
      celular,
      telefone,
      email,
      cep,
      logradouro,
      numero,
      complemento,
      cidade,
      bairro,
      estado
    } = body;


    if (cpf && !validarCPF(cpf)) {
      return res.status(400).send("CPF inválido");
    }

    if (!email || !emailIsValid(email)) {
      return res.status(400).send("Email inválido");
    }

    

    await db("usuarios").insert({
      cnpj,
      cpf,
      nome,
      celular,
      telefone,
      email,
      cep,
      logradouro,
      numero,
      complemento,
      cidade,
      bairro,
      estado
    });

    console.log("passou 1");

    return res.status(201).send("Usuário cadastrado");
  } catch (error) {
    return res.status(500).send("Erro interno do servidor");
  }
});

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
