require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const passport = require('passport')
const logger = require('morgan')
const cookieSession = require('cookie-session')

module.exports = (server) => {
  server.use(express.json())
  server.use(
    cookieSession({ maxAge: 20000000, keys: [ process.env.COOKIE_KEY ] })
  )
  server.use(helmet())
  server.use(logger('dev'))
  server.use(passport.initialize())
  server.use(passport.session())
}
