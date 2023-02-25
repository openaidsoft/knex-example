import knex from "knex"

const db = knex({
  client: 'oracledb',
  connection: {
    host: '127.0.0.1',
    port: 1120,
    user: 'demo',
    password: 'demo',
    database: 'xe',
  },
  debug: true,
})

const users = table => {
  table.increments('id');
  table.string('user_name');
}

const accounts = table => {
  table.increments('id');
  table.string('account_name');
  table
    .integer('user_id')
    .unsigned()
    .references('users.id');
}

;(async (knex) => {
  try {
    // FK 걸려 있으므로 accounts 먼저 drop
    await knex.schema.dropTableIfExists('accounts')
    await knex.schema.dropTableIfExists('users')

    // Create a table
    // await knex.schema
    //   .createTable('users', table => {
    //     table.increments('id');
    //     table.string('user_name');
    //   })
    //   // ...and another
    //   .createTable('accounts', table => {
    //     table.increments('id');
    //     table.string('account_name');
    //     table
    //       .integer('user_id')
    //       .unsigned()
    //       .references('users.id');
    //   })
    await knex.schema
      .createTable('users', users)
      // ...and another
      .createTable('accounts', accounts)
  
    // Then query the table...
    let rs = await knex('users')
      .returning('id')
      .insert({ user_name: 'Tim' })
    // rs는 기본적으로 인서트된 로우 수 = 1
    // returning('id')를 적용하면 인서트된 로우의 'id'를 반환 = [ { id: 1 } ]
    console.log('rs:', rs) 
    // ...and using the insert id, insert into the other table.
    await knex('accounts').insert({ account_name: 'knex', user_id: rs[0].id })

    rs = await knex('users').returning('id').insert({ user_name: '헤이' })
    console.log('rs:', rs)
    await knex('accounts').insert({ account_name: 'hey', user_id: rs[0].id })
  
    // Query both of the rows.
    const selectedRows = await knex('users')
      .join('accounts', 'users.id', 'accounts.user_id')
      .select('users.user_name as user', 'accounts.account_name as account')
    console.log(selectedRows)

    // map over the results
    const enrichedRows = selectedRows.map(row => ({ ...row, active: true }))
    console.log(enrichedRows)
  
    // Finally, add a catch statement
  } catch(e) {
    console.error(e);
  } 

  knex.destroy()
})(db)
