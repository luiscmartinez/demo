const router = require('express').Router()
const passport = require('passport')
// const db = require('../../dbConfig')

router.get('/github', passport.authenticate('github'))

router.get('/github/cb', passport.authenticate('github'), (req, res) => {
  // Successful authentication, redirect home.
  console.log('from github redirect', req.user)
  res.redirect('http://localhost:8000')
})

module.exports = router
