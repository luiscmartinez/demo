const router = require('express').Router();
<<<<<<< HEAD
const urlMetadata = require('url-metadata');

=======
const DB = require('../../dbConfig');
const urlMetadata = require('url-metadata');
>>>>>>> 37f50788a14c11b9cf3430e6bb64fe499644f542
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

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 37f50788a14c11b9cf3430e6bb64fe499644f542
