// Update with your config settings.

require('dotenv').config();
module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DB_LOCAL_URL
<<<<<<< HEAD
  },

  staging: {
    client: 'postgresql',
    connection: 'postgresql://localhost',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
=======
>>>>>>> 37f50788a14c11b9cf3430e6bb64fe499644f542
  },

  production: {
    client: 'pg',
    connection: process.env.DB_PROD_URL,
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'dbmigrations',
      directory: './migrations'
    },
    seeds: { directory: './seeds' }
  }
};
