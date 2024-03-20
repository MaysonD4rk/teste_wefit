import knex from "knex";
import { development } from "../database/knexfile";
import { Usuario } from "../models/userModel";

const db = knex(development);


class UserServices{

    async VerifyByCnpj(cnpj: string){

        try {
            const res = await db.select().where({cnpj}).table('usuarios');

            if(res.length>0){
                return { status: true }
            }else{
                return { status: false }
            }

            
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async VerifyByCpf(cpf: string){

        try {
            const res = await db.select().where({cpf}).table('usuarios');

            if(res.length>0){
                return { status: true }
            }else{
                return { status: false }
            }

            
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async Create(usuario: Usuario){

        try {
            var newForm = await db.insert({
                cnpj: usuario.cnpj,
                cpf: usuario.cpf,
                nome: usuario.nome,
                celular: usuario.celular,
                telefone: usuario.telefone,
                email: usuario.email,
                cep: usuario.cep,
                logradouro: usuario.logradouro,
                numero: usuario.numero,
                complemento: usuario.complemento,
                cidade: usuario.cidade,
                bairro: usuario.bairro,
                estado: usuario.estado
            }).table('usuarios');

            return { status: true }
        } catch (error) {
            console.log(error)
            return { status: true }
        }
    }



}


export default new UserServices();