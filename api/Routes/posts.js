const router = require('express').Router();
const DB = require('../../dbConfig');
const urlMetadata = require('url-metadata');
// ==============================================
// this JS file includes helpers that access our
// database accordingly (for example, getUsers
// requests all the users in the users database)
// ==============================================
const postsDb = require('../helpers/postsHelper');

router.get('/posts', async (req, res) => {
  const posts = await postsDb.get();
  res.status(200).send(posts);
});

router.post('/create', (req, res, next) => {
  const {user_id, completed, categories, rating, post_url} = req.body

  db('posts').insert({
    user_id, completed, categories, rating, post_url
  })

})

router.get('/user/post', (req, res) => {
  db('post').where({user_id: req.body.user,}).then((rows) => {
    res.json({post: rows})
  })
})

router.get('/post', (req, res) => {
  urlMetadata(`${req.query.url}`).then(
    function(metadata) {
      res.json(metadata);
    },
    function(error) {
      console.log(error);
    }
  );
});

module.exports = router;
