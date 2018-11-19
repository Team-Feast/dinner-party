const {Party, User, Guest, Item} = require('../db/models')
const router = require('express').Router()

router.post('/', async (req, res, next) => {
  try {
    const {title, description, partyId} = req.body

    const newItem = await Item.create({
      title,
      description,
      partyId
    })

    res.json(newItem)
  } catch (error) {
    next(error)
  }
})

module.exports = router
