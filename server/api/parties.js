const {Party, User, Guest, Item} = require('../db/models')
const router = require('express').Router()
const moment = require('moment')

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

router.get('/:id/items', async (req, res, next) => {
  try {
    const items = await Item.findAll({
      where: {
        partyId: req.params.id
      },
      include: [Guest]
    })
    res.json(items)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/guests', async (req, res, next) => {
  try {
    const guests = await Guest.findAll({
      where: {
        partyId: req.params.id
      }
    })
    res.json(guests)
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
    const newPartyWithUser = await Party.findOne({
      where: {id: newParty.id},
      include: [User]
    })

    res.json(newPartyWithUser)
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

router.put('/:id', async (req, res, next) => {
  try {
    let party = await Party.findById(req.params.id)
    let result = await party.update(req.body)
    res.json(result)
  } catch (err) {
    next(err)
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

    const hostingQuery = Party.findAll({
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
      include: [{model: Guest, where: {userId: user.id}}],
      order: [['date', 'ASC']]
    })

    const upcomingEventQuery = Party.findAll({
      include: [
        {model: Guest, where: {userId: user.id}},
        {model: User, attributes: ['firstName', 'lastName']}
      ],
      where: {
        date: {
          $gte: moment()
            .utc()
            .toDate()
        }
      },
      limit: 1,
      order: [['date', 'ASC']]
    })

    const attendingQuery = Party.findAll({
      include: [
        {model: Guest, where: {userId: user.id}},
        {model: User, attributes: ['firstName', 'lastName']}
      ],
      where: {
        date: {
          $gte: moment()
            .utc()
            .toDate()
        }
      },
      order: [['date', 'ASC']]
    })

    const pastEventsQuery = Party.findAll({
      include: [
        {model: Guest, where: {userId: user.id}},
        {model: User, attributes: ['firstName', 'lastName']}
      ],
      where: {
        date: {
          $lt: moment()
            .utc()
            .toDate()
        }
      },
      order: [['date', 'DESC']]
    })

    const hosting = await hostingQuery
    let upcomingEvent = await upcomingEventQuery
    const attending = await attendingQuery
    const pastEvents = await pastEventsQuery

    if (upcomingEvent.length === 1) upcomingEvent = upcomingEvent[0]

    res.json({upcomingEvent, hosting, attending, pastEvents})
  } catch (err) {
    next(err)
  }
})

module.exports = router
