import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable('classes', (table)=>{
        
        table.uuid('id').primary();
        table.date('date').notNullable();
        table.string('subject_id').references('id').inTable('subjects'); // referenciando fk subjects id da tabela subjects
        table.string('semester_id').references('id').inTable('semester'); // referenciando fk subjects id da tabela subjects

    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('classes');
}

