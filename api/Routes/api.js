const router = require('express').Router()
const db = require('../../dbConfig')
const io = require('../../socket')

router.get('/create', (req, res) => {
  io.getIO().emit('posts', { action: 'create', post: 'new Post' })

  res.send('got it')
})

module.exports = router
