const router = require('express').Router()
const User = require('../db/models/user')
const Guest = require('../db/models/guest')
const nodemailer = require('nodemailer')
const sanitizeHtml = require('sanitize-html')

module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const {firstName, lastName, email, password} = req.body

    const user = await User.create({firstName, lastName, email, password})

    await Guest.update({userId: user.id}, {where: {email: req.body.email}})

    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: '1809teamfeast@gmail.com',
        pass: process.env.GMAILPW
      }
    })
    let mailOptions = {
      to: user.email,
      from: '1809teamfeast@gmail.com',
      subject: 'Welcome to Feast!',
      text: sanitizeHtml(
        `Thanks ${
          user.firstName
        } for signing up to Feast, the World's Number 1 Dinner Party Planning Tool! Start planning your first feast @ \n\nhttp://${
          req.headers.host
        }`
      )
    }
    transporter.sendMail(mailOptions, function(err) {
      err ? next(err) : res.sendStatus(200)
    })

    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/forgotpassword', async (req, res, next) => {
  try {
    const {email} = req.body
    const user = await User.find({where: {email: email}})

    if (user) {
      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: '1809teamfeast@gmail.com',
          pass: process.env.GMAILPW
        }
      })
      let mailOptions = {
        to: email,
        from: '1809teamfeast@gmail.com',
        subject: 'Reset your Feast password',
        text: sanitizeHtml(
          `
          Hi ${user.firstName},

          We received a request to reset your password for your Feast account: ${
            user.email
          }. We're here to help! Click the following link to reset your password: \n\nhttp://${
            req.headers.host
          }/resetpassword

          \n\nIf you did not request this, please ignore this email.`
        )
      }
      transporter.sendMail(mailOptions, function(err) {
        err ? next(err) : res.status(200).send('Email sent!')
      })
    } else {
      console.log('No such user found:', email)
      res.status(401).send(`No user found at ${email}`)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
