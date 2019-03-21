exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del().then(function () {
    // Inserts seed entries
    return knex('posts').insert([
      {
        id: 1,
        post_url: 'rowValue1',
        categories: [ 'js', 'react', 'C#' ],
        rating: 5
      }
    ])
  })
}
