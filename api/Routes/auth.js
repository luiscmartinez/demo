const router = require('express').Router()
const passport = require('passport')
const db = require('../../dbConfig')

router.get('/github', passport.authenticate('github'))

router.get('/github/cb', passport.authenticate('github'), function (req, res) {
  // Successful authentication, redirect home.
  console.log('here', req)
  console.log('IS USER A??? ??', req.isAuthenticated())
  res.redirect('https://learnedadev.netlify.com/feed')
})

router.get('/login', (req, res,next)=> {
  const credentials = req.body
  db('users').where('email', credentials.email).then((insertedUser)=> {
    console.log(insertedUser)
    if (insertedUser === null) return Error('wrong credentials')
  })
})

module.exports = router
