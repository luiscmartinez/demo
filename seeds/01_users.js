exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate().then(function () {
    // Inserts seed entries
    return knex('users').insert([
      {
        id: 1,
        email: 'homer@gmail.com',
        display_name: 'Homer',
        username: 'user1'
      }
    ])
  })
}
