import dotenv from 'dotenv';
dotenv.config();


export const development = {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: 3307,
      user: 'root',
      password: process.env.MYSQLDB_PASSWORD || '',
      database: process.env.MYSQLDB_DATABASE || '',
    },
  };