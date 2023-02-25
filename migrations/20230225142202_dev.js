/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    // .withSchema('demo')
    .createTable('user', function (table) {
      table.increments('id');
      table.string('name', 255).notNullable();
      table.string('addr', 255);
    })
    .createTable('product', function (table) {
      table.increments('id');
      table.string('name', 1000).notNullable();
      table.decimal('price').notNullable();
    })
    ;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    // .withSchema('demo')
    .dropTable("product")
    .dropTable("user");
};
