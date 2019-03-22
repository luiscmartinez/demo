require('dotenv').config();
const server = require('express')();
require('./config/passport');
require('./middleware/index')(server);
require('./api/Routes')(server);
const db = require('./dbConfig')

const port = process.env.PORT || 8000;

server.get('/', (req, res) => {
  res.send('localhost up & alive');
});

const myServer = server.listen(port, () => {
  console.log(`\n ==== API RUNNING === ${port}\n`);
});

const io = require('socket.io')(myServer)

// create connection
io.on('connection', (socket) => {
  // receive all incoming messages
  socket.on('posts', (msg) => {
    console.log(msg)
    // console.log('response',msg.action)
    // emit them right back to all the users listening to this connection
    if (msg.action === 'create') {
      db('comments')
        .insert({
          content:msg.content,
          user_id: msg.user_id,
          post_id: msg.post_id
        })
        .then((res) => console.log(res))
    }
    io.emit('posts', msg)
  })
})