import { Knex } from 'knex';

export const createUsersTable = async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('usuarios', function (table) {
    table.increments('id').primary();
    table.string('cnpj').unique();
    table.string('cpf').unique();
    table.string('nome').notNullable();
    table.string('celular');
    table.string('telefone');
    table.string('email').unique();
    table.string('cep');
    table.string('logradouro');
    table.string('numero');
    table.string('complemento');
    table.string('cidade');
    table.string('bairro');
    table.string('estado', 2);
  });
}
