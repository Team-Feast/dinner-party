const {Party, User, Guest, Item} = require('../db/models')
const router = require('express').Router()

router.get('/', async (req, res, next) => {
  try {
    const {guestPartyToken} = req.params
    let guest = await Guest.findOne({where: {guestPartyToken: guestPartyToken}})

    res.json(newItem)
  } catch (error) {
    next(error)
  }
})

module.exports = router
