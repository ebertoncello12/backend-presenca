import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('attendance_attempts', (table) => {
        table.string('id').notNullable(); // Cria a coluna 'id', chave primária com incremento automático
        table.string('student_id').notNullable(); // Coluna para 'student_id'
        table.string('ip').notNullable(); // Coluna para o IP
        table.timestamp('attempt_timestamp').notNullable(); // Coluna para a data e hora da tentativa
        table.json('attemptFace').notNullable(); // Coluna 'attemptFace' para armazenar qualquer tipo de dado no formato JSON
        table.timestamp('created_at').defaultTo(knex.fn.now()); // Coluna para o timestamp de criação
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('attendance_attempts'); // Remove a tabela se a migração for revertida
}
