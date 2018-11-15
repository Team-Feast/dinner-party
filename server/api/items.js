const {Party, User, Guest, Item} = require('../db/models')
const router = require('express').Router()

router.post('/', async (req, res, next) => {
  try {
    const {title, description, partyId, email} = req.body
    const guest = await Guest.findOne({where: {email: email}})

    let guestId

    if (guest) {
      guestId = guest.id
    }

    const item = await Item.create({
      title,
      description,
      partyId,
      email,
      guestId
    })

    res.status(201).json(item)
  } catch (error) {
    next(error)
  }
})

module.exports = router
