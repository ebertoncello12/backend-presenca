import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('students', (table) => {
        table.string('registration_face').nullable(); // Adiciona a coluna registration_face, podendo ser nula
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('students', (table) => {
        table.dropColumn('registration_face'); // Remove a coluna registration_face
    });
}
