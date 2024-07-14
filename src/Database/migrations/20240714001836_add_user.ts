import { table } from "console";
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    
    await knex.schema.createTable('users', (table)=>{
        
        table.uuid('id').primary();
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.string('group').notNullable(); // aluno, admin, professor
        table.string('status').notNullable(); // ativo, inativo, trancado
        table.timestamp('created_at').defaultTo(knex.fn.now()); //pegando horario de agora toda vez que cria usuario
        table.timestamp('logged_at').nullable();
    })
}
    

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('users');
}

