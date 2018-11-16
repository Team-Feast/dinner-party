const {Party, User, Guest, Item} = require('../db/models')
const router = require('express').Router()
const moment = require('moment')

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
// Return an object that will contain information
// about a current users parties.
// The object will look like this:
/*
 {
   upcoming: {} // an object of the closest upcoming event
   hosting: [...] // array of objects
   attending: [...] // array of objects
   past_events: [...] // array of objects past events
 }
*/
router.get('/user/:userId', async (req, res, next) => {
  try {
    // upcoming parties
    const user = await User.findById(req.params.userId)

    const hosting = await Party.findAll({
      where: {
        $and: [
          {userId: user.id},
          {
            date: {
              $gte: moment()
                .utc()
                .toDate()
            }
          }
        ]
      },
      order: [['date', 'ASC']]
    })

    const upcomingEventToHost = await Party.findAll({
      where: {
        $and: [
          {userId: user.id},
          {
            date: {
              $gte: moment()
                .utc()
                .toDate()
            }
          }
        ]
      },
      limit: 1,
      order: [['date', 'ASC']]
    })

    const attending = await Guest.findAll({
      where: {
        email: user.email
      },
      include: [
        {
          model: Party,
          where: {
            date: {
              $gte: moment()
                .utc()
                .toDate()
            }
          }
        }
      ]
    })

    // sort ASCENDING by the party date
    attending.sort(function(left, right) {
      return moment.utc(left.party.date).diff(moment.utc(right.party.date))
    })

    res.json({upcomingEventToHost, hosting, attending})
  } catch (err) {
    next(err)
  }
})

module.exports = router
