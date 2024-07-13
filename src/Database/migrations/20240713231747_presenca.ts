import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
   
    await knex("usuario").insert([
        { id: 10, nome: 'Alice', idade: 30 },
        { id: 12, nome: 'Bob', idade: 25 },
        { id: 13, nome: 'Charlie', idade: 28 }
    ]);
}

export async function down(knex: Knex): Promise<void> {
}
