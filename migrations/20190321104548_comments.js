exports.up = function (knex, Promise) {
  return knex.schema.createTable('comments', (tbl) => {
    tbl.increments('id')
    tbl.timestamp('created_at').defaultTo(knex.fn.now())
    tbl
      .integer('post_id')
      .references('id')
      .inTable('posts')
      .onDelete('cascade')
      .unsigned()
  })
}

exports.down = function (knex, Promise) {}
