const {Party, User, Guest} = require('../db/models')
const router = require('express').Router()

router.get('/:id', async (req, res, next) => {
  try {
    const party = await Party.findById(req.params.id, {
      include: [{model: User, attributes: ['firstName', 'lastName']}]
    })
    res.json(party)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newParty = await Party.create({
      title: req.body.info.title,
      description: req.body.info.description,
      location: req.body.info.location,
      date: req.body.info.date,
      userId: req.body.info.userId,
      imageUrl: req.body.info.imageUrl
    })

    //Creates guests using email and party id
    Promise.all(
      req.body.guestEmails.forEach(email => {
        const guest = Guest.create({email, partyId: newParty.id})
        //TODO need to send guest an email with guest token
      })
    )

    res.json(newParty)
  } catch (err) {
    next(err)
  }
})

router.get('/rsvp/:guestPartyToken', async (req, res, next) => {
  try {
    const {guestPartyToken} = req.params
    let guest = await Guest.findOne({where: {guestPartyToken: guestPartyToken}})
    res.json(guest.status)
  } catch (error) {
    next(error)
  }
})
router.put('/rsvp/:guestPartyToken', async (req, res, next) => {
  try {
    const {guestPartyToken} = req.params
    const {status} = req.body
    let guest = await Guest.findOne({where: {guestPartyToken: guestPartyToken}})
    if (guest) {
      await guest.update({status})
      res.json(guest.status)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
