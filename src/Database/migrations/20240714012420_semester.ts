import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable('semester', (table)=>{
        
        table.uuid('id').primary();
        table.date('year').notNullable();
        table.string('period').notNullable();
        table.string('course_id').references('id').inTable('courses'); // referenciando fk course id da tabela courses

    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('semester');
}

