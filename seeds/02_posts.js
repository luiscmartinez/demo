exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('posts').insert([
        { post_url: "https://riley.gg", user_id:1 },
        { post_url: "https://www.youtube.com/watch?v=HSwjGP19rTg", user_id:1 },
        { post_url: "https://www.youtube.com/watch?v=-W_VsLXmjJU", user_id:1 },
        { post_url: "https://www.youtube.com/watch?v=93p3LxR9xfM", user_id:1 }
      ]);
    });
};
