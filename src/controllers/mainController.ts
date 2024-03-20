import express, { Request, Response } from "express";
import { Usuario } from "../models/userModel";
import { emailIsValid, validarCPF } from "../methods/validation";
import knex from "knex";
import UserServices from "../services/userServices";





class MainController{


    async Cadastrar(req: Request, res: Response){
        try {
            const body = req.body as Usuario | null;
        
            if (!body) {
              return res.status(400).send("Body não encontrado");
            }
        
        
        
            if (body.cpf && !validarCPF(body.cpf)) {
              return res.status(400).send("CPF inválido");
            }
        
            if (!body.email || !emailIsValid(body.email)) {
              return res.status(400).send("Email inválido");
            }

            
            const cpf = body.cpf;
            const cnpj = body.cnpj;
            if (typeof cpf === 'string' && typeof cnpj === "string") {
                try{
                    const cpfExists = await UserServices.VerifyByCpf(cpf);
                    if(cpfExists && cpfExists.status){
                        return res.status(400).send("CPF já está sendo utilizado");
                    }

                    try{
                        const cnpjExists = await UserServices.VerifyByCnpj(cnpj);
                        if(cnpjExists && cnpjExists.status){
                            return res.status(400).send("CNPJ já está sendo utilizado");
                        }
                    }catch(e){
                        return res.status(400).send(e);
                    }

                }catch(e){
                    return res.status(400).send(e);
                }
                
            }
            
            try {
                const response = await UserServices.Create(body);
            
                if (response && response.status) {
                    res.status(200)
                    res.json({ successMsg: "Cadastrado com sucesso!" });
                } else {
                    res.status(400)
                    res.json({ errorMsg: "Não foi possível realizar cadastro" });
                }
            } catch (e) {
                return res.status(400).send(e);
            }
        
          } catch (error) {
            return res.status(500).send("Erro interno do servidor");
          }
    }

}

export default new MainController();