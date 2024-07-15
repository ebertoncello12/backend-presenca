import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable('courses', (table)=>{
        
        table.uuid('id').primary();
        table.string('name').notNullable();
        table.string('max_semester').notNullable(); // adicionando id como FK da tabela users
    })
    

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

    await knex.schema.createTable('subjects', (table)=>{
        
        table.uuid('id').primary();
        table.string('name').notNullable();
        table.string('code').notNullable();
        table.string('course_id').references('id').inTable('courses'); // matricula do aluno

    })

  
    await knex.schema.createTable('students', (table)=>{
        
        table.uuid('id').primary();
        table.string('name').notNullable();
        table.string('registration').unique().notNullable(); // matricula do aluno
        table.string('user_id').references('id').inTable('users'); // adicionando id como FK da tabela users
        table.string('course_id').references('id').inTable('courses');// adicionando id como FK da tabela courses
        table.string('idade').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('students');
}

//DROP TABLE presenca.students
//DROP TABLE presenca.users
//DROP TABLE presenca.subjects
//DROP TABLE presenca.courses

//DELETE FROM presenca.knex_migrations
//WHERE id IN (1, 2);


