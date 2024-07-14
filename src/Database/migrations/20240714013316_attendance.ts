import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable('attendance', (table)=>{
        
        table.uuid('id').primary();
        table.date('date').notNullable();
        table.string('student_id').references('id').inTable('students'); // referenciando fk student_id da tabela students
        table.string('class_id').references('id').inTable('classes'); // referenciando fk class' id da tabela classes'
        table.boolean('attendance').notNullable();

    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('attendance');
}

