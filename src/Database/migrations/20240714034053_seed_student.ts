import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
 
  await knex('courses').insert([
    { id: 'b2ff80f2-9edf-494e-97d9-72234375206b', name: 'Ciências da Computação', max_semester: 8 },
    { id: '4546fb88-e05b-40c0-bb77-4da9e9301549', name: 'Engenharia Mecânica', max_semester: 10 },
    { id: '11b0ee1f-60f3-495f-8b3c-9847a4571287', name: 'Engenharia Civil', max_semester: 9 },
  ]);
  // Inserir materias
  await knex('subjects').insert([
    { id: '0fae54ef-b2da-4b15-a84d-168b0d2e06fd', name: 'Cálculo 1', code: 'CAL101', course_id: '4546fb88-e05b-40c0-bb77-4da9e9301549' }, // Engenharias
    { id: 'b2e2e2ef-9b4f-4e10-8fcf-4207c7d57a3f', name: 'Cálculo 2', code: 'CAL102', course_id: '4546fb88-e05b-40c0-bb77-4da9e9301549' }, // Engenharias 
    { id: '4b9b620c-dff5-4e69-b8c4-5b58c89d240e', name: 'Cálculo 3', code: 'CAL103', course_id: '4546fb88-e05b-40c0-bb77-4da9e9301549' }, // Engenharias 
    { id: '4c9b621c-dff6-4e70-b8c5-5b59c90d242e', name: 'Cálculo 4', code: 'CAL104', course_id: '4546fb88-e05b-40c0-bb77-4da9e9301549' }, // Engenharias 
    { id: 'c6f40d7a-825d-4c5e-b9b0-94299d3f1a01', name: 'Algoritmos e Estruturas de Dados', code: 'ECOMP201', course_id: 'b2ff80f2-9edf-494e-97d9-72234375206b' }, // Ciências da Computação
    { id: '7b5a14e2-5a5b-475c-b438-272f7462a2b7', name: 'Arquitetura de Computadores', code: 'ECOMP202', course_id: 'b2ff80f2-9edf-494e-97d9-72234375206b' }, // Ciências da Computação
    { id: '1f09fa4b-90ec-4ba7-aa7b-4b89a2a6f71c', name: 'Redes de Computadores', code: 'ECOMP203', course_id: 'b2ff80f2-9edf-494e-97d9-72234375206b' }, // Ciências da Computação
    { id: 'c3f5b239-51a1-4a82-bb49-196d5a56c8ab', name: 'Sistemas Operacionais', code: 'ECOMP204', course_id: 'b2ff80f2-9edf-494e-97d9-72234375206b' }, // Ciências da Computação
    { id: 'e6076a8f-21c3-44a6-85d0-b1d9a20cc9e2', name: 'Engenharia de Software', code: 'ECOMP205', course_id: 'b2ff80f2-9edf-494e-97d9-72234375206b' }, // Ciências da Computação
    { id: '6e21ea3b-9a27-4ec2-9a5d-1c58c6dcb1e0', name: 'Banco de Dados', code: 'ECOMP206', course_id: 'b2ff80f2-9edf-494e-97d9-72234375206b' }, // Ciências da Computação
    { id: 'f2a3f345-c6e1-4a4c-98e4-3b18a576746f', name: 'Mecânica Geral', code: 'EMEC101', course_id: '4546fb88-e05b-40c0-bb77-4da9e9301549' }, // Engenharia Mecânica
    { id: 'e2e5f46d-34a3-4e12-9b5d-df4a4e7f9878', name: 'Termodinâmica', code: 'EMEC102', course_id: '4546fb88-e05b-40c0-bb77-4da9e9301549' }, // Engenharia Mecânica
    { id: 'dcf3e21d-0f8d-4145-8f5a-ecf845dfe0f8', name: 'Materiais de Engenharia', code: 'EMEC103', course_id: '4546fb88-e05b-40c0-bb77-4da9e9301549' }, // Engenharia Mecânica
    { id: 'c8a7b4c6-0a13-448f-b3c7-1924c8a7f4fa', name: 'Dinâmica dos Fluidos', code: 'EMEC104', course_id: '4546fb88-e05b-40c0-bb77-4da9e9301549' }, // Engenharia Mecânica
    { id: 'b9b789a3-4d7b-4c1b-9156-32d66f7d2e3e', name: 'Transferência de Calor', code: 'EMEC105', course_id: '4546fb88-e05b-40c0-bb77-4da9e9301549' }, // Engenharia Mecânica
    { id: 'd51a0916-75d0-4ee1-8ba7-1b5d1346b37c', name: 'Mecânica dos Solos', code: 'ECIV101', course_id: '11b0ee1f-60f3-495f-8b3c-9847a4571287' }, // Engenharia Civil
    { id: 'e7a3df10-0f4e-45c4-ae85-8e29c9f556e8', name: 'Estruturas de Concreto', code: 'ECIV102', course_id: '11b0ee1f-60f3-495f-8b3c-9847a4571287' }, // Engenharia Civil
    { id: '7a4cc3a7-5125-4e6e-b76f-4619f1d8d9d6', name: 'Fundações', code: 'ECIV103', course_id: '11b0ee1f-60f3-495f-8b3c-9847a4571287' }, // Engenharia Civil
    { id: '26b7a497-d148-4f8e-9d3b-2957b4c77a8a', name: 'Transportes', code: 'ECIV104', course_id: '11b0ee1f-60f3-495f-8b3c-9847a4571287' }, // Engenharia Civil
    { id: 'b4e16e3d-0c01-4174-8abf-5317ef86989a', name: 'Saneamento Básico', code: 'ECIV105', course_id: '11b0ee1f-60f3-495f-8b3c-9847a4571287' }, // Engenharia Civil
  ]);

  await knex('users').insert({
    id: 'c8c86a20-b667-4643-bb5a-e59615838e29',
    name: 'João Aluno',
    group: 'Aluno',
    email: 'enzzo.ferrari@bhut.com.br',
    password: 'admin123',
    status: 'ATIVO',

  });

  // Inserir aluno
  await knex('students').insert({
    id: '3ebcc1ab-848c-460a-aa07-e7723a748328',
    name: '1',
    user_id: 'c8c86a20-b667-4643-bb5a-e59615838e29',
    registration: '2023001',
    course_id: 'b2ff80f2-9edf-494e-97d9-72234375206b',
    idade: '21'
  });



  // Inserir semestres
  await knex('semester').insert({
    id: '6e68d0cc-466c-42ea-812e-42f0f79c23c0',
    year: new Date('2024-01-01'), // Definindo como 1º de janeiro de 2024
    period: '1',
    course_id: 'b2ff80f2-9edf-494e-97d9-72234375206b'
  });

  // Inserir aulas
  await knex('classes').insert([{
    id: '130d4592-31e5-4421-af97-ba53e3a92cea',
    date: new Date('2024-01-01'), // Definindo como 1º de janeiro de 2024
    subject_id: 'c6f40d7a-825d-4c5e-b9b0-94299d3f1a01', // associando com a primeira matéria inserida
    semester_id: '6e68d0cc-466c-42ea-812e-42f0f79c23c0'
  },
  {
    id: 'cf790e35-cc6f-4d69-a8c9-aa215901a1d2',
    date: new Date('2024-02-12'), // Definindo como 1º de janeiro de 2024
    subject_id: '7b5a14e2-5a5b-475c-b438-272f7462a2b7', // associando com a primeira matéria inserida
    semester_id: '6e68d0cc-466c-42ea-812e-42f0f79c23c0'
  }
]);


  // Inserir presença
  await knex('attendance').insert([
    {
    id: '2240a913-6b31-4bfc-a124-9052c2dd466a',
    date: new Date('2024-01-01'), // Definindo como 1º de janeiro de 2024
    student_id: '3ebcc1ab-848c-460a-aa07-e7723a748328',
    class_id: '130d4592-31e5-4421-af97-ba53e3a92cea',
    attendance: true
    },
    {
      id: '33e56d88-ca01-47b8-ab74-ffdbcf432732',
      date: new Date('2024-2-21'), // Definindo como 1º de janeiro de 2024
      student_id: '3ebcc1ab-848c-460a-aa07-e7723a748328',
      class_id: 'cf790e35-cc6f-4d69-a8c9-aa215901a1d2',
      attendance: true
      },
]);



  await knex('qrcode').insert({
    id: 'ec86ef44-ff39-4fc0-bd96-4caa56f045e3',
    code: 'ABC123',
    class_id: '130d4592-31e5-4421-af97-ba53e3a92cea',
    date_expiration: knex.fn.now(), // Utilizando o método now() do Knex para a data atual
    created_at: knex.fn.now(), // Utilizando o método now() do Knex para a data atual
    used: false
  });
}

export async function down(knex: Knex): Promise<void> {
  console.log('faz nada')
}

