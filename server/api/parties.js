const {Party, User, Guest, Item} = require('../db/models')
const router = require('express').Router()

router.get('/:id', async (req, res, next) => {
  try {
    let partyId = req.params.id
    const party = await Party.findById(partyId, {
      include: [
        {model: User, attributes: ['firstName', 'lastName']},
        {model: Guest, attributes: ['id', 'status', 'email']},
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

router.post('/', async (req, res, next) => {
  try {
    const {date} = req.body
    // const result = new Date(date)
    const newDate = await Party.create({
      title: 'My Party',
      date: date,
      description: '',
      location: ''
    })

    res.json(newDate)
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
