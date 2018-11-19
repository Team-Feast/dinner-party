const router = require('express').Router()
const Guest = require('../db/models/guest')
const Party = require('../db/models/party')
const User = require('../db/models/user')
const nodemailer = require('nodemailer')
const moment = require('moment')

// GET /api/guests/
router.get('/', async (req, res, next) => {
  try {
    let guests = await Guest.findAll()
    res.json(guests)
  } catch (err) {
    next(err)
  }
})

// GET /api/guests/:id
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    let guest = await Guest.findById(id)
    res.json(guest)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    let guest = await Guest.findById(req.params.id)
    let result = await guest.update(req.body)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

router.post('/', async function(req, res, next) {
  try {
    const data = await Guest.findOrCreate({
      where: {
        email: req.body.email,
        partyId: req.body.partyId
      }
    })
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.post('/:id/invite', async function(req, res, next) {
  try {
    const guest = await Guest.findById(req.params.id)

    if (!guest) {
      console.log('No guest with that email address exists.')
    } else {
      const party = await Party.findById(guest.partyId, {
        include: [{model: User, attributes: ['firstName', 'lastName']}]
      })

      const {user, title, location, date} = party

      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: '1809teamfeast@gmail.com',
          pass: process.env.GMAILPW
        }
      })
      let mailOptions = {
        to: guest.email,
        from: '1809teamfeast@gmail.com',
        subject: "You're Invited",
        text: `You are receiving this because you have been invited by ${
          user.firstName
        } ${user.lastName} to ${title} through Feast! It's on ${moment(
          date
        ).format(
          'LLLL'
        )} at ${location}. Use the attached link to accept or decline your invitation. \n\nhttp://${
          req.headers.host
        }/parties/${guest.partyId}/rsvp/${
          guest.guestPartyToken
        }\n\nIf you did not request this, please ignore this email.`
      }
      transporter.sendMail(mailOptions, function(err) {
        err ? next(err) : res.sendStatus(200)
      })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
