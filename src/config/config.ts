export default {
  DB: {
      user: process.env.PG_USER || 'postgres',
      host: process.env.PG_HOST || 'localhost',
      database: process.env.PG_DB || 'centro-edu',
      password: process.env.PG_PASS || '123456',
      port: process.env.PG_PORT || 5432,
    },
  KEYCLOAK:
  {
    KEYCLOAK_GRANT_TYPE: process.env.KEYCLOAK_GRANT_TYPE || 'password',
    // KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID || 'mono-erp-backend',
    KEYCLOAK_PUBLIC_KEY: process.env.KEYCLOAK_PUBLIC_KEY ,
    KEYCLOAK_URL: process.env.KEYCLOAK_URL 
  }
};
