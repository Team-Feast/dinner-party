const {Party, User, Guest, Item} = require('../db/models')
const router = require('express').Router()

router.get('/:id', async (req, res, next) => {
  try {
    let partyId = req.params.id
    const party = await Party.findById(partyId, {
      include: [
        {model: User, attributes: ['firstName', 'lastName']},
        {model: Guest, attributes: ['id', 'status', 'email']},
        {model: Item, attributes: ['id', 'title', 'description', 'guestId']}
      ]
    })
    res.json(party)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newParty = await Party.create({
      title: req.body.title,
      description: req.body.description,
      location: req.body.address,
      date: req.body.date
    })

    res.json(newParty)
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

module.exports = router
