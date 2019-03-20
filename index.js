const server = require('express')()
require('./config/passport')
require('./middleware/index')(server)
require('./api/Routes')(server)

server.get('/', (req, res) => {
  res.send('localhost up & alive')
})

server.listen(8000, () => {
  console.log('\n=== API RUNNING... ===\n')
})
