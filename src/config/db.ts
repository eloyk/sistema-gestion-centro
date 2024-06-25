import { Pool } from 'pg';
import config from './config' 

const pool = new Pool({
  user: config.DB.user,
  host: config.DB.host,
  database: config.DB.database,
  password: config.DB.password,
  port: 5432,
  max: 10, // número máximo de clientes en el pool
  idleTimeoutMillis: 30000, // cuánto tiempo un cliente debe permanecer inactivo antes de ser cerrado
  connectionTimeoutMillis: 2000, // tiempo de espera para una nueva conexión antes de generar un error
});

export default pool;
