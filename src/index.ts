import express, { Request, Response } from "express";
import knex from "knex";
import dotenv from "dotenv";
import { Usuario } from "./models/userModel";
import {development}  from "./database/knexfile";
import { createUsersTable } from "./database/migrations/create_users_table";
import { emailIsValid, validarCPF } from "./methods/validation";
import router from "./routes/router";

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

app.use(router);

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
