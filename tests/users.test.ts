import request from 'supertest';
import express, { Request, Response } from 'express';
import MainController from '../src/controllers/mainController';
import knex from 'knex';
import { development } from '../src/database/knexfile';

const app = express();
app.use(express.json());
app.post('/cadastrar', MainController.Cadastrar);

const db = knex(development);


afterAll(()=>{

    db.schema.dropTableIfExists('usuarios')
  .then(() => {
    
  })
  .catch((error) => {
    throw error;
  });

})

describe('MainController', () => {
    it('should return 400 when body is not provided', async () => {
        const response = await request(app).post('/cadastrar').send({});
        expect(response.status).toBe(400);
    });

    it('should return 200 when the form is submitted correctly', async () => {
        const response = await request(app).post('/cadastrar').send({
            cnpj: "24.663.455/0001-83",
            cpf: "462.133.558-80",
            nome: "Joana",
            celular: "11982913299",
            telefone: "11982913299",
            email: "MaisonDe@gmail.com",
            cep: "03927-050",
            logradouro: "Rua comunhçao da paz",
            numero: "48",
            complemento: "Casa",
            cidade: "São Paulo",
            bairro: "Anália franco",
            estado: "SP"
        });
        expect(response.status).toBe(200);
    });

});