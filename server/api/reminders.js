const {Guest, Reminder} = require('../db/models')
const router = require('express').Router()
const Op = require('sequelize').Op

//GET /api/reminders/party/:partyId
router.get('/party/:partyId', async (req, res, next) => {
  try {
    let guests = await Guest.findAll({
      where: {
        [Op.and]: [{partyId: req.params.partyId}, {status: 'attending'}]
      }
    })
    if (guests) {
      let reminders = await Reminder.findAll({
        where: {
          partyId: req.params.partyId
        }
      })
      res.json({reminders, guests})
    }
  } catch (err) {
    next(err)
  }
})

// //PUT /api/reminders/party/:partyId
// router.put('/party/:partyId', async (req, res, next) => {
//   try {
//     let item = await Item.findById(req.params.id)
//     let result = await item.update(req.body)
//     let data = await Item.findById(result.id, {include: [Guest]})
//     res.json(data)
//   } catch (err) {
//     next(err)
//   }
// })

// //PUT /api/reminders/party/:partyId
// router.delete('/party/:partyId', async (req, res, next) => {
//   try {
//     let item = await Item.destroy({
//       where: {
//         id: req.params.id
//       }
//     })
//     if (item) {
//       res.status(200).send()
//     }
//   } catch (err) {
//     next(err)
//   }
// })

// //POST /api/reminders/
// router.post('/', async (req, res, next) => {
//   try {
//     const {title, description, partyId} = req.body

//     const newItem = await Item.create({
//       title,
//       description,
//       partyId
//     })
//     const newItemWithGuest = await Item.findOne({
//       where: {id: newItem.id},
//       include: [Guest]
//     })

//     res.json(newItemWithGuest)
//   } catch (error) {
//     next(error)
//   }
// })

module.exports = router
