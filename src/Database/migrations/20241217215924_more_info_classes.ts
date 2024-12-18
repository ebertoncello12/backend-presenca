import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Adicionando as novas colunas, caso ainda não existam
  const hasColumns = await knex.schema.hasColumn('classes', 'duration')
    && await knex.schema.hasColumn('classes', 'classroom')
    && await knex.schema.hasColumn('classes', 'typeClass')
    && await knex.schema.hasColumn('classes', 'startTimeClass');

  if (!hasColumns) {
    // Adiciona as colunas se não existirem
    await knex.schema.table('classes', (table) => {
      table.integer('duration').notNullable(); // Adiciona a coluna duration (duração)
      table.string('classroom').notNullable(); // Adiciona a coluna classroom (sala de aula)
      table.enum('typeClass', ['PRESENCIAL', 'ONLINE']).notNullable(); // Adiciona a coluna typeClass
      table.timestamp('startTimeClass').notNullable(); // Adiciona a coluna startTimeClass
    });
  }

  // Atualiza os dados existentes na tabela 'classes' com os IDs fornecidos
  await knex('classes').where('id', '130d4592-31e5-4421-af97-ba53e3a92cea').update({
    duration: 60, // 1 hora
    classroom: 'Room A101',
    typeClass: 'PRESENCIAL', // Aula presencial
    startTimeClass: '2024-01-10 13:30:00', // Horário entre 13h e 23h
  });

  await knex('classes').where('id', '45189d3f-aa68-4480-b0eb-5eb262014313').update({
    duration: 90, // 1 hora e meia
    classroom: 'Room B202',
    typeClass: 'ONLINE', // Aula online
    startTimeClass: '2024-01-10 15:00:00',
  });

  await knex('classes').where('id', '704e55e4-bb41-11ef-8a3a-0250b597ea3c').update({
    duration: 120, // 2 horas
    classroom: 'Room C303',
    typeClass: 'PRESENCIAL', // Aula presencial
    startTimeClass: '2024-01-10 17:30:00',
  });

  await knex('classes').where('id', '98b2e65f-bb3b-11ef-8a3a-0250b597ea3c').update({
    duration: 45, // 45 minutos
    classroom: 'Room D404',
    typeClass: 'ONLINE', // Aula online
    startTimeClass: '2024-01-10 19:00:00',
  });

  await knex('classes').where('id', 'b019fb72-bb41-11ef-8a3a-0250b597ea3c').update({
    duration: 30, // 30 minutos
    classroom: 'Room E505',
    typeClass: 'PRESENCIAL', // Aula presencial
    startTimeClass: '2024-01-10 21:15:00',
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('classes', (table) => {
    table.dropColumn('duration'); // Remove a coluna duration
    table.dropColumn('classroom'); // Remove a coluna classroom
    table.dropColumn('typeClass'); // Remove a coluna typeClass
    table.dropColumn('startTimeClass'); // Remove a coluna startTimeClass
  });
}
