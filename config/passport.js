require('dotenv').config()
const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy
const TwitterStrategy = require('passport-twitter').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy

const db = require('../dbConfig')

passport.serializeUser(function (email, done) {
  console.log('SERIALizing A user', email)
  done(null, email)
})

passport.deserializeUser(function (id, done) {
  console.log('deserializing USer', id)
  done(null,id)
})

passport.use(
  new GitHubStrategy(
    {
      clientID: 'da193d63c68a570de8dc',
      clientSecret: '45bbbe7838f269a89640da2081e1bf5dd5180308',
      callbackURL: process.env.CB_URL
    },
    async function findOrCreate (accessToken, refreshToken, profile, done) {
      console.log(profile.emails[0].value)
      const email = profile.emails[0].value
      console.log(profile)
      const existingUser = await db('users').where('email', email).first()
      if (existingUser) {
        done(null, existingUser)
      } else {
        const newUser = await db('users').insert({
          email: email,
          display_name: profile.displayName,
          profile_picture: profile.photos[0].value
        })
        done(null, email)
      }
    }
  )
)

// passport.use(new TwitterStrategy({}))
