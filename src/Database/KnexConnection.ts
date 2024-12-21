import knex from "knex";

import knexFile from "./KnexFile";

export const knexInstance = knex(knexFile);

export const knexTestConnection = async() => {
try {
const testeConnnection = await knexInstance.raw('SELECT * FROM dev_piu_ms_auth.aplicacao');
} catch(e) {
console.log(e, 'Error a o conectar no sql com knex');
}
}