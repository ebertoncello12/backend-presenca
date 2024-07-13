import knex from "knex";

import knexFile from "./KnexFile";

export const knexInstance = knex(knexFile);

export const knexTestConnection = async() => {
try {
const teste = await knexInstance.raw('SELECT * FROM presenca.usuario');
console.log(teste, 'deu certo')
} catch(e) {
    console.log(e, 'Error a o conectar no sql com knex');
}
}