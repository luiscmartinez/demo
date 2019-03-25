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
      // console.log(profile.emails[0].value)
      console.log(profile)
      const display_name = profile.displayName
      const email = profile.emails[0].value === typeof('string') ? profile.emails[0].value : display_name
      const existingUser = await db('users').where('display_name', email).first()
      if (existingUser) {
        console.log('this is existing user obj', existingUser)
        done(null, existingUser.id)
      } else {
        if (profile.emails[0].value) {
          console.log('is true')
          const newUser = await db('users').insert({
            email: profile.emails[0].value,
            display_name: profile.displayName,
            profile_picture: profile.photos[0].value
          })
          done(null, display_name)
        } else {
          console.log("IS NOT TRUE TO EMAIL")
          const newUser = await db('users').insert({
            display_name: profile.displayName,
            profile_picture: profile.photos[0].value
          })
          done(null, display_name)
        }
     }
    }
  )
)

// passport.use(new TwitterStrategy({}))
