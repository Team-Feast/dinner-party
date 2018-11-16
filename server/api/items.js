const {Party, User, Guest, Item} = require('../db/models')
const router = require('express').Router()

router.post('/', async (req, res, next) => {
  try {
    const {title, description, partyId, email} = req.body
    let guest = await Guest.findOne({where: {email: email}})
    let guestId

    if (guest) {
      guestId = guest.id
    } else {
      guest = await Guest.create({email})
      guestId = guest.id
    }

    const item = await Item.create({
      title,
      description,
      partyId,
      email,
      guestId
    })

    const newItem = await Item.findById(item.id, {
      include: [{model: Guest, attributes: ['email']}]
    })
    res.json(newItem)
  } catch (error) {
    next(error)
  }
})

module.exports = router
