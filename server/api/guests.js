const {Party, User, Guest, Item} = require('../db/models')
const router = require('express').Router()

router.get('/rsvp/:guestPartyToken', async (req, res, next) => {
  try {
    const {guestPartyToken} = req.params
    let guest = await Guest.findOne({where: {guestPartyToken: guestPartyToken}})
    res.json(guest.status)
  } catch (error) {
    next(error)
  }
})

router.put(`/rsvp/:guestPartyToken`, async (req, res, next) => {
  try {
    const {status} = req.body
    const {guestPartyToken} = req.params

    const guest = await Guest.findOne({
      where: {guestPartyToken: guestPartyToken}
    })

    guest.update({status: status})
    res.json(guest.status)
  } catch (error) {
    next(error)
  }
})

module.exports = router
