import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    
  // Limpar as tabelas na ordem correta para evitar violações de chave estrangeira
  await knex('presencas').del();
  await knex('qrcodes').del();
  await knex('aulas').del();
  await knex('semestres').del();
  await knex('alunos').del();
  await knex('usuarios').del();
  await knex('courses').del();
  await knex('materias').del();

  // Inserir materias
  await knex('subjects').insert([
    { id: '0fae54ef-b2da-4b15-a84d-168b0d2e06fd', name: 'Cálculo 1', code: 'CAL101' },//todas engenharias + adm
    { id: 'b2e2e2ef-9b4f-4e10-8fcf-4207c7d57a3f', name: 'Cálculo 2', code: 'CAL102' },//todas engenharias
    { id: '4b9b620c-dff5-4e69-b8c4-5b58c89d240e', name: 'Cálculo 3', code: 'CAL103' },//todas engenharias
    { id: '4c9b621c-dff6-4e70-b8c5-5b59c90d242e', name: 'Cálculo 4', code: 'CAL104' },//todas engenharias
    { id: 'c6f40d7a-825d-4c5e-b9b0-94299d3f1a01', name: 'Algoritmos e Estruturas de Dados', code: 'ECOMP201' },//COMPUTAÇÂO
    { id: '7b5a14e2-5a5b-475c-b438-272f7462a2b7', name: 'Arquitetura de Computadores', code: 'ECOMP202' },//COMPUTAÇÂO
    { id: '1f09fa4b-90ec-4ba7-aa7b-4b89a2a6f71c', name: 'Redes de Computadores', code: 'ECOMP203' },//COMPUTAÇÂO
    { id: 'c3f5b239-51a1-4a82-bb49-196d5a56c8ab', name: 'Sistemas Operacionais', code: 'ECOMP204' },//COMPUTAÇÂO
    { id: 'e6076a8f-21c3-44a6-85d0-b1d9a20cc9e2', name: 'Engenharia de Software', code: 'ECOMP205' },//COMPUTAÇÂO
    { id: '6e21ea3b-9a27-4ec2-9a5d-1c58c6dcb1e0', name: 'Banco de Dados', code: 'ECOMP206' },//COMPUTAÇÂO
    { id: 'b7151546-c1e8-4e42-9c3c-59dbd2c91b8e', name: 'Inteligência Artificial', code: 'ECOMP301' },//COMPUTAÇÂO
    { id: '7a6f5cde-4b4f-4482-bca7-ecf5b1a8d021', name: 'Compiladores', code: 'ECOMP302' },//COMPUTAÇÂO
    { id: 'b1238d18-11a3-4e6f-8f13-4a00f27a6d9e', name: 'Segurança de Dados', code: 'ECOMP303' },//COMPUTAÇÂO
    { id: 'aebe7f05-3d53-4a5e-87a3-2c5d33b57e3c', name: 'Computação Gráfica', code: 'ECOMP304' },//COMPUTAÇÂO
    { id: 'f2a3f345-c6e1-4a4c-98e4-3b18a576746f', name: 'Mecânica Geral', code: 'EMEC101' },//MECANICA
    { id: 'e2e5f46d-34a3-4e12-9b5d-df4a4e7f9878', name: 'Termodinâmica', code: 'EMEC102' },//MECANICA
    { id: 'dcf3e21d-0f8d-4145-8f5a-ecf845dfe0f8', name: 'Materiais de Engenharia', code: 'EMEC103' },//MECANICA
    { id: 'c8a7b4c6-0a13-448f-b3c7-1924c8a7f4fa', name: 'Dinâmica dos Fluidos', code: 'EMEC104' },//MECANICA
    { id: 'b9b789a3-4d7b-4c1b-9156-32d66f7d2e3e', name: 'Transferência de Calor', code: 'EMEC105' },//MECANICA
    { id: 'a6e9fde6-ef23-4c9a-9160-9e5543a2e6c9', name: 'Máquinas Térmicas', code: 'EMEC201' },//MECANICA
    { id: '9c5d9f9f-1e01-4a9c-b6f8-2654f1b1b34e', name: 'Elementos de Máquinas', code: 'EMEC202' },//MECANICA
    { id: '8c5c76b8-0121-4eb5-84df-dfe8a22e7c70', name: 'Automação Industrial', code: 'EMEC203' },//MECANICA
    { id: '7a1f3b0d-dc21-47e7-9d84-ba0a746b44f0', name: 'Projeto Mecânico', code: 'EMEC204' },//MECANICA
    { id: '6b392ea2-1e4e-4c69-918a-93f18fae1d3e', name: 'Engenharia de Controle e Instrumentação', code: 'EMEC205' },//MECANICA
    { id: 'd51a0916-75d0-4ee1-8ba7-1b5d1346b37c', name: 'Mecânica dos Solos', code: 'ECIV101' },//CIVIL
    { id: 'e7a3df10-0f4e-45c4-ae85-8e29c9f556e8', name: 'Estruturas de Concreto', code: 'ECIV102' },//CIVIL
    { id: '7a4cc3a7-5125-4e6e-b76f-4619f1d8d9d6', name: 'Fundações', code: 'ECIV103' },//CIVIL
    { id: '26b7a497-d148-4f8e-9d3b-2957b4c77a8a', name: 'Transportes', code: 'ECIV104' },//CIVIL
    { id: 'b4e16e3d-0c01-4174-8abf-5317ef86989a', name: 'Saneamento Básico', code: 'ECIV105' },//CIVIL
    { id: '2e60271d-b9e1-47b0-a7ae-01f9e0e5b4e5', name: 'Geotecnia', code: 'ECIV201' },//CIVIL
    { id: '0e72cfa5-7e4a-40fb-8f11-7397b92b1c8f', name: 'Estruturas Metálicas', code: 'ECIV202' },//CIVIL
    { id: 'dfc6368b-1d17-4b10-975a-2d47e4a1c58c', name: 'Planejamento Urbano', code: 'ECIV203' },//CIVIL
    { id: '74f0b2a3-19c5-4ab5-8b8a-b929a0408f3c', name: 'Hidrologia', code: 'ECIV204' },//CIVIL
    { id: '30bde9d6-8de1-487d-9b95-7830c526a25f', name: 'Gestão de Projetos', code: 'ECIV205' },//CIVIL
    { id: 'd51a0916-75d0-4ee1-8ba7-1b5d1346b37c', name: 'Química Geral', code: 'EQMC101' },//QUIMICA
    { id: 'e7a3df10-0f4e-45c4-ae85-8e29c9f556e8', name: 'Termodinâmica Aplicada', code: 'EQMC102' },//QUIMICA
    { id: '7a4cc3a7-5125-4e6e-b76f-4619f1d8d9d6', name: 'Processos Químicos Industriais', code: 'EQMC103' },//QUIMICA
    { id: '26b7a497-d148-4f8e-9d3b-2957b4c77a8a', name: 'Fenômenos de Transporte', code: 'EQMC104' },//QUIMICA
    { id: 'b4e16e3d-0c01-4174-8abf-5317ef86989a', name: 'Engenharia de Reatores', code: 'EQMC105' },//QUIMICA
    { id: '2e60271d-b9e1-47b0-a7ae-01f9e0e5b4e5', name: 'Bioprocessos', code: 'EQMC201' },//QUIMICA
    { id: '0e72cfa5-7e4a-40fb-8f11-7397b92b1c8f', name: 'Controle de Processos Químicos', code: 'EQMC202' },//QUIMICA
    { id: 'dfc6368b-1d17-4b10-975a-2d47e4a1c58c', name: 'Segurança e Meio Ambiente', code: 'EQMC203' },//QUIMICA
    { id: '74f0b2a3-19c5-4ab5-8b8a-b929a0408f3c', name: 'Engenharia de Polímeros', code: 'EQMC204' },//QUIMICA
    { id: '30bde9d6-8de1-487d-9b95-7830c526a25f', name: 'Simulação de Processos Químicos', code: 'EQMC205' },//QUIMICA
    { id: 'd51a0916-75d0-4ee1-8ba7-1b5d1346b37c', name: 'Anatomia Humana', code: 'MED101' },//MED
    { id: 'e7a3df10-0f4e-45c4-ae85-8e29c9f556e8', name: 'Fisiologia', code: 'MED102' },//MED
    { id: '7a4cc3a7-5125-4e6e-b76f-4619f1d8d9d6', name: 'Patologia Geral', code: 'MED103' },//MED
    { id: '26b7a497-d148-4f8e-9d3b-2957b4c77a8a', name: 'Farmacologia', code: 'MED104' },//MED
    { id: 'b4e16e3d-0c01-4174-8abf-5317ef86989a', name: 'Bioquímica Médica', code: 'MED105' },//MED
    { id: '2e60271d-b9e1-47b0-a7ae-01f9e0e5b4e5', name: 'Clínica Médica', code: 'MED201' },//MED
    { id: '0e72cfa5-7e4a-40fb-8f11-7397b92b1c8f', name: 'Cirurgia Geral', code: 'MED202' },//MED
    { id: 'dfc6368b-1d17-4b10-975a-2d47e4a1c58c', name: 'Pediatria', code: 'MED203' },//MED
    { id: '74f0b2a3-19c5-4ab5-8b8a-b929a0408f3c', name: 'Ginecologia e Obstetrícia', code: 'MED204' },//MED
    { id: '30bde9d6-8de1-487d-9b95-7830c526a25f', name: 'Psiquiatria', code: 'MED205' },//MED
    { id: 'd51a0916-75d0-4ee1-8ba7-1b5d1346b37c', name: 'Psicologia Geral', code: 'PSIC101' },//PSIC
    { id: 'e7a3df10-0f4e-45c4-ae85-8e29c9f556e8', name: 'Psicologia do Desenvolvimento', code: 'PSIC102' },//PSIC
    { id: '7a4cc3a7-5125-4e6e-b76f-4619f1d8d9d6', name: 'Psicopatologia', code: 'PSIC103' },//PSIC
    { id: '26b7a497-d148-4f8e-9d3b-2957b4c77a8a', name: 'Neuropsicologia', code: 'PSIC104' },//PSIC
    { id: 'b4e16e3d-0c01-4174-8abf-5317ef86989a', name: 'Psicologia Clínica', code: 'PSIC105' },//PSIC
    { id: '2e60271d-b9e1-47b0-a7ae-01f9e0e5b4e5', name: 'Psicologia Organizacional', code: 'PSIC201' },//PSIC
    { id: '0e72cfa5-7e4a-40fb-8f11-7397b92b1c8f', name: 'Psicologia Escolar', code: 'PSIC202' },//PSIC
    { id: 'dfc6368b-1d17-4b10-975a-2d47e4a1c58c', name: 'Psicologia Social', code: 'PSIC203' },//PSIC
    { id: '74f0b2a3-19c5-4ab5-8b8a-b929a0408f3c', name: 'Psicologia Forense', code: 'PSIC204' },//PSIC
    { id: '30bde9d6-8de1-487d-9b95-7830c526a25f', name: 'Psicologia da Saúde', code: 'PSIC205' },//PSIC
    { id: 'd51a0916-75d0-4ee1-8ba7-1b5d1346b37c', name: 'Administração Geral', code: 'ADM101' },//ADM
    { id: 'e7a3df10-0f4e-45c4-ae85-8e29c9f556e8', name: 'Gestão de Pessoas', code: 'ADM102' },//ADM
    { id: '7a4cc3a7-5125-4e6e-b76f-4619f1d8d9d6', name: 'Marketing', code: 'ADM103' },//ADM
    { id: '26b7a497-d148-4f8e-9d3b-2957b4c77a8a', name: 'Finanças Corporativas', code: 'ADM104' },//ADM
    { id: 'b4e16e3d-0c01-4174-8abf-5317ef86989a', name: 'Estratégia Empresarial', code: 'ADM105' },//ADM
    { id: '2e60271d-b9e1-47b0-a7ae-01f9e0e5b4e5', name: 'Logística Empresarial', code: 'ADM201' },//ADM
    { id: '0e72cfa5-7e4a-40fb-8f11-7397b92b1c8f', name: 'Empreendedorismo', code: 'ADM202' },//ADM
    { id: 'dfc6368b-1d17-4b10-975a-2d47e4a1c58c', name: 'Direito Empresarial', code: 'ADM203' },//ADM
    { id: '74f0b2a3-19c5-4ab5-8b8a-b929a0408f3c', name: 'Gestão da Qualidade', code: 'ADM204' },//ADM
    { id: '30bde9d6-8de1-487d-9b95-7830c526a25f', name: 'Economia', code: 'ADM205' }//ADM
  ]);

  // Inserir curso
  await knex('courses').insert({
    id: '1',
    name: 'Ciências da Computação',
    subject_id: '1', // associando com a primeira matéria inserida
    max_semester: 8
  });

  // Inserir usuário (aluno)
  await knex('usuarios').insert({
    id: '1',
    nome: 'João Aluno',
    tipo: 'aluno'
  });

  // Inserir aluno
  await knex('alunos').insert({
    id: '1',
    usuario_id: '1',
    nome: 'João Aluno',
    matricula: '2023001',
    curso_id: '1'
  });

  // Inserir semestres
  await knex('semestres').insert({
    id: '1',
    ano: 2024,
    periodo: '1',
    curso_id: '1'
  });

  // Inserir aulas
  await knex('aulas').insert({
    id: '1',
    data: '2024-07-15',
    materia_id: '1', // associando com a primeira matéria inserida
    semestre_id: '1'
  });

  // Inserir presença
  await knex('presencas').insert({
    id: '1',
    aluno_id: '1',
    aula_id: '1',
    presente: true
  });

  // Inserir QR code
  await knex('qrcodes').insert({
    id: '1',
    codigo: 'ABC123',
    aluno_id: '1',
    aula_id: '1',
    data_criacao: new Date(),
    data_expiracao: new Date('2024-07-16'),
    usado: false
  });
}


export async function down(knex: Knex): Promise<void> {
}

