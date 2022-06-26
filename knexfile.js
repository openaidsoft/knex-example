// Update with your config settings.

const oracledb = require('oracledb');
try {
  // oracledb.initOracleClient({libDir: '/Users/soriwa/Project/db/oracle-instant-client/instantclient_11_2'});
  // oracledb.initOracleClient({libDir: '/usr/local/lib'});
  oracledb.initOracleClient({libDir: '/Users/soriwa/Downloads/instantclient_19_8'});
  // oracledb.initOracleClient({libDir: '/Users/soriwa/Project/db/oracle-instant-client/instantclient_19_8'});
} catch (err) {
  console.error('Whoops!');
  console.error(err);
  process.exit(1);
}



/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  // development: {
  //   client: 'pg',
  //   connection: {
  //     host : '127.0.0.1',
  //     user : 'jlch',
  //     password : 'jlch2020',
  //     database : 'test',
  //   },
  //   // db 접근시 기본적으로 'public' 스키마로 접근하게 되는데 search_path를 이용해 탐색할 스키마의 순서를 정할 수 있음 
  //   // searchPath: [ 'test', 'public' ], 
  //   searchPath: [ 'public' ], 
  //   debug: true,  // 생성된 쿼리 출력
  // },

  // development: {
  //   client: 'better-sqlite3',
  //   connection: {
  //     filename: './dev.sqlite3'
  //   }
  // },

  development: {
    client: 'oracledb',
    connection: {
      host : '127.0.0.1',
      user : 'system',
      password : 'oracle',
      database : 'xe',
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
