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
  done(null, id)
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
      console.log(profile)
      const display_name = profile.username || profile.displayName
      const profile_picture = profile.photos[0].value || null
      // const email = profile.emails[0].value === typeof('string') ? profile.emails[0].value : display_name
      const existingUser = await db('users')
        .where('display_name', display_name)
        .first()
      if (existingUser) {
        console.log('this is existing user obj', existingUser)
        done(null, existingUser.id)
      } else {
        const email = profile.emails[0].value || null
        if (email) {
          const newUser = await db('users').insert({
            email: email,
            display_name: profile.username,
            profile_picture: profile_picture
          })
          done(null, display_name)
        } else {
          const newUser = await db('users').insert({
            display_name: profile.username,
            profile_picture: profile_picture
          })
          done(null, display_name)
        }
      }
    }
  )
)

// passport.use(new TwitterStrategy({}))
