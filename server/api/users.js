const router = require('express').Router()
const {User} = require('../db/models')
//const {google} = require('googleapis')
var gcal = require('google-calendar')

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

router.get('/:id/calendars', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    const google_calendar = new gcal.GoogleCalendar(user.googleToken)
    console.log(google_calendar)
    google_calendar.calendarList.list(function(err, calendarList) {
      console.log(calendarList)
    })

    var event = {
      summary: 'Google I/O 2016',
      location: '800 Howard St., San Francisco, CA 94103',
      description: "A chance to hear more about Google's developer products.",
      start: {
        dateTime: '2018-11-20T09:00:00-07:00',
        timeZone: 'America/Los_Angeles'
      },
      end: {
        dateTime: '2018-11-20T09:00:00-08:00',
        timeZone: 'America/Los_Angeles'
      },
      recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
      attendees: [{email: 'lpage@example.com'}, {email: 'sbrin@example.com'}],
      reminders: {
        useDefault: false,
        overrides: [
          {method: 'email', minutes: 24 * 60},
          {method: 'popup', minutes: 10}
        ]
      }
    }

    google_calendar.events.insert('primary', event, function(err, eventList) {
      console.log(eventList)
    })

    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId/calendars/:calendarId', async (req, res, next) => {
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
