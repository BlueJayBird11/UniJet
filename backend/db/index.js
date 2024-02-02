// import { Pool } from 'pg';
const { Pool } = require("pg");


const pool = new Pool();
 
// export const query = (text, params) => pool.query(text, params);
module.exports = {
    query: (text, params) => pool.query(text, params),
}