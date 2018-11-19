const router = require('express').Router()
const Guest = require('../db/models/guest')
const nodemailer = require('nodemailer')


// GET /api/guests/
router.get('/', async (req, res, next) =>{
  try{
    let guests = await Guest.findAll()
     res.json(guests)
  }catch(err){
    next(err)
  }
})

// GET /api/guests/:id
router.get('/:id', async (req, res, next) =>{
  try{
    const id = req.params.id
    let guest = await Guest.findById(id)
    res.json(guest)
  }catch(err){
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
    console.log(data)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.post('/:id/invite', async function(req, res, next) {
  try {
    const data = await Guest.findById(req.params.id).then(guest => {
      if (!guest) {
        console.log('No guest with that email address exists.')
      } else {
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
          text: `You are receiving this because you have been invited to a dinner party through Feast! Use the attached link to accept or decline your invitation. \n\nhttp://${
            req.headers.host
          }/parties/${
            guest.partyId
          }/rsvp/${123}\n\nIf you did not request this, please ignore this email.`
        }
        transporter.sendMail(mailOptions, function(err) {
          err ? next(err) : console.log('Mail Sent')
        })
      }
    })
    data ? res.json(data) : res.sendStatus(500)
  } catch (err) {
    next(err)
  }
})

module.exports = router
