require('../../secrets')

const router = require('express').Router()
const twilio = require('twilio')
const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH)

router.get('/1', async (req, res, next) => {
  try {
    client.messages
      .create({
        body: 'Hello from Node',
        to: '+8479754263', // Text this number
        from: '+9497633278' // From a valid Twilio number
      })
      .then(message => console.log(message.sid))
    res.json('done')
  } catch (error) {
    next(error)
  }
})

module.exports = router
