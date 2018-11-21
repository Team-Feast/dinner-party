const router = require('express').Router()
const {User, Guest} = require('../db/models')
const gcal = require('google-calendar')
const moment = require('moment')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/:guestId/calendars', async (req, res, next) => {
  try {
    const guest = await Guest.findById(req.params.guestId, {include: [User]})
    const gCal = new gcal.GoogleCalendar(guest.user.googleToken)
    const start = moment(req.body.date).format('YYYY-MM-DDTHH:mm:ss')
    const end = moment(start)
      .add(2, 'hours')
      .format('YYYY-MM-DDTHH:mm:ss')

    var event = {
      summary: req.body.title,
      location: req.body.location,
      description: req.body.description,
      start: {
        dateTime: start,
        timeZone: 'America/Chicago'
      },
      end: {
        dateTime: end,
        timeZone: 'America/Chicago'
      },
      recurrence: [],
      attendees: [],
      reminders: {
        useDefault: false,
        overrides: [
          {method: 'email', minutes: 24 * 60},
          {method: 'popup', minutes: 10}
        ]
      }
    }

    await gCal.events.insert('primary', event, async function(err) {
      if (err) {
        next(err)
      } else {
        const updatedGuest = await guest.update({onGoogleCalendar: true})
        res.json(updatedGuest)
      }
    })
  } catch (err) {
    next(err)
  }
})
