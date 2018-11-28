const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {User} = require('../db/models')
const {Op} = require('sequelize')

module.exports = router

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log('Google client ID / secret not found. Skipping Google OAuth.')
} else {
  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
    passReqToCallback: true
  }

  const strategy = new GoogleStrategy(
    googleConfig,
    (req, token, refreshToken, profile, done) => {
      const googleId = profile.id
      const name = profile.name
      const email = profile.emails[0].value

      if (req.user) {
        req.user
          .update({googleToken: token, googleId})
          .then(user => {
            done(null, user)
          })
          .catch(done)
      } else {
        User.findOrCreate({
          where: {
            [Op.or]: [{googleId}, {email}]
          },
          defaults: {
            firstName: name.givenName,
            lastName: name.familyName,
            email,
            googleId
          }
        })
          .then(([user]) => {
            user.update({googleToken: token, googleId, email})
            done(null, user)
          })
          .catch(done)
      }
    }
  )

  passport.use(strategy)

  router.get('/', function(req, res, next) {
    req.session.redirect = req.query.redirect
    passport.authenticate('google', {
      scope: ['email', 'https://www.googleapis.com/auth/calendar']
    })(req, res, next)
  })

  router.get('/callback', function(req, res, next) {
    passport.authenticate('google', {
      successRedirect: req.session.redirect,
      failureRedirect: '/'
    })(req, res, next)
  })
}
