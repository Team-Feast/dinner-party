const {Guest, Reminder} = require('../db/models')
const router = require('express').Router()
const Op = require('sequelize').Op

//GET /api/reminders/party/:partyId
/*
 Returns an object that looks like
 {
   reminders: [] // reminders for a particular party
   guests: []  // attending guests
 }

*/
router.get('/party/:partyId', async (req, res, next) => {
  try {
    let guests = await Guest.findAll({
      where: {
        [Op.and]: [{partyId: req.params.partyId}, {status: 'attending'}]
      }
    })
    if (guests.length) {
      let reminders = await Reminder.findAll({
        where: {
          partyId: req.params.partyId
        }
      })
      res.json({reminders, guests})
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

//PUT /api/reminders/:id
router.put('/:id', async (req, res, next) => {
  try {
    let item = await Reminder.findById(req.params.id)
    let result = await item.update(req.body)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

// DELETE /api/reminders/:id
router.delete('/:id', async (req, res, next) => {
  try {
    let reminder = await Reminder.destroy({
      where: {
        id: req.params.id
      }
    })
    if (reminder) {
      res.status(200).send()
    }
  } catch (err) {
    next(err)
  }
})

// //POST /api/reminders/
/*
 Create an object
  {
    "timeBefore" : 99,
    "notificationType": "email",
    "timeBefore": 99,
    "timeUnit": "days",
    "partyId" : 1,
  }

 */
router.post('/', async (req, res, next) => {
  try {
    const {timeBefore, timeUnit, notificationType, partyId} = req.body
    const newItem = await Reminder.create({
      timeBefore,
      timeUnit,
      notificationType,
      partyId
    })
    res.json(newItem)
  } catch (error) {
    next(error)
  }
})

module.exports = router
