const {Party, User, Guest, Item} = require('../db/models')
const router = require('express').Router()

router.get('/:id', async (req, res, next) => {
  try {
    let partyId = req.params.id
    const party = await Party.findById(partyId, {
      include: [
        {model: User, attributes: ['firstName', 'lastName']},
        {
          model: Guest,
          attributes: ['id', 'status', 'email'],
          order: [['status', 'ASC']]
        },
        {
          model: Item,
          include: [{model: Guest, attributes: ['email']}],
          attributes: ['id', 'title', 'description']
        }
      ]
    })
    res.json(party)
  } catch (err) {
    next(err)
  }
})

// POST /api/parties/addParty
router.post('/', async (req, res, next) => {
  try {
    console.log(req.body)
    // const newParty = await Party.create({
    //   title: req.body.title,
    //   description: req.body.description,
    //   location: req.body.location,
    //   date: req.body.date,
    //   userId: req.body.userId
    // })
    // res.json(newParty)
  } catch (err) {
    next(err)
  }
})

// GET /api/parties/user/:userId
// Return an array of parties that this user is hosting
router.get('/user/:userId', async (req, res, next) => {
  try {
    const parties = await Party.findAll({where: {userId: req.params.userId}})
    res.json(parties)
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
