import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable('qrcode', (table)=>{
        
        table.uuid('id').primary();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('date_expiration').notNullable();
        table.string('student_id').references('id').inTable('students'); // referenciando fk student_id da tabela students
        table.string('class_id').references('id').inTable('classes'); // referenciando fk class' id da tabela classes'
        table.boolean('used').notNullable();
        table.string('code').notNullable();
        
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('qrcode');
}

