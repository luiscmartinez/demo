require('dotenv').config()
const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy
const TwitterStrategy = require('passport-twitter').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const db = require('../dbConfig')
console.log('client.id =>', process.env.CLIENT_ID)
console.log('client secret =>', process.env.CLIENT_SECRET)

passport.serializeUser(function (user, done) {
  console.log('SERIALizing A user', user)
  done(null, user.email)
})

passport.deserializeUser(function (id, done) {
  console.log('deserializing USer', id)
})

passport.use(
  new GitHubStrategy(
    {
      clientID: `${process.env.CLIENT_ID}`,
      clientSecret: `${process.env.CLIENT_SECRET}`,
      callbackURL: 'http://localhost:8000/auth/github/cb'
    },
    async function findOrCreate (accessToken, refreshToken, profile, done) {
      console.log(profile.emails[0].value)
      const email = profile.emails[0].value
      const existingUser = await db('users').where('email', email).first()
      if (existingUser) {
        console.log('in done exisiting')
        done(null, existingUser)
      } else {
        const newUser = await db('users').insert({
          email: email,
          name: profile.displayName,
          profile_picture: profile.photos[0].value
        })
        console.log('in done new user')
        done(null, newUser)
      }
    }
  )
)

// passport.use(new TwitterStrategy({}))
