import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('users', (table) => {
        // Adiciona a coluna 'email' à tabela 'users'
        table.string('student_id').nullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    // Você pode implementar o código de rollback aqui, se necessário
    console.log('faz nada');
}
