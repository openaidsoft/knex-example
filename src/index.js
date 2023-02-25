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

;(async (knex) => {
  try {
    await knex.schema.dropTableIfExists('accounts')
    await knex.schema.dropTableIfExists('users')

    // Create a table
    await knex.schema
      .createTable('users', table => {
        table.increments('id');
        table.string('user_name');
      })
      // ...and another
      .createTable('accounts', table => {
        table.increments('id');
        table.string('account_name');
        table
          .integer('user_id')
          .unsigned()
          .references('users.id');
      })
  
    // Then query the table...
    const insertedRows = await knex('users').insert({ user_name: 'Tim' })
    console.log('insertedRows:', insertedRows)
  
    // ...and using the insert id, insert into the other table.
    await knex('accounts').insert({ account_name: 'knex', user_id: insertedRows })
  
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
