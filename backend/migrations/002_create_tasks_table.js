/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('tasks', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.string('title').notNullable();
    table.text('description');
    table.enu('status', ['not-started', 'in-progress', 'pending', 'completed']).defaultTo('not-started');
    table.integer('priority').defaultTo(1);
    table.timestamp('due_date');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    
    // Índices para performance
    table.index('user_id');
    table.index('status');
    table.index('created_at');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('tasks');
};
