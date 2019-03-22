exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', tbl => {
    tbl.increments('id');
    tbl.string('content', 254).notNullable();
    // tbl
    //   .integer('post_id')
    //   .references('id')
    //   .inTable('posts')
    //   .onDelete('cascade')
    //   .unsigned();
    tbl.integer('post_id')
    tbl.integer('user_id')
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('comments');
};
