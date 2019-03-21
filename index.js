const server = require('express')()
require('./config/passport')
require('./middleware/index')(server)
require('./api/Routes')(server)
const port = process.env.PORT || 8000
const db = require('./dbConfig')
server.get('/', (req, res) => {
  console.log('FROM =>"/" ', req.user)
  res.send('localhost up & alive')
})

const newServer = server.listen(port, () => {
  console.log(`\n ==== API RUNNING === ${port}\n`)
})

const io = require('./socket').init(newServer)
// create connection
io.on('connection', (socket) => {
  // receive all incoming messages
  socket.on('posts', (msg) => {
    console.log(msg)
    // emit them right back to all the users listening to this connection
    if (msg.action === 'create') {
      db('posts')
        .insert({
          post: msg.post,
          user_id: 'dynamicUser'
        })
        .then((res) => console.log(res))
    }
    io.emit('posts', msg)
  })
})
// module.exports = io
