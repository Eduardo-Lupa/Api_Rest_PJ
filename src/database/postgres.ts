import { Pool } from "pg";

// configuracao da conexao do DB
const USER = "uarznscs";
const PASSWD = "4z-H3Ca2S4aPjT2TRk9bAFko3Dljsy5a";
const LOCAL = "tuffi.db.elephantsql.com";
const DefDB = "uarznscs";


 const connectionString = `postgres://${USER}:${PASSWD}@${LOCAL}/${DefDB}`;

const db = new Pool({ connectionString });

export default db;
