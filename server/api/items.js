const {Party, User, Guest, Item} = require('../db/models')
const router = require('express').Router()

router.get('/', async (req, res, next) => {
  try {
    let items = await Item.findAll()
    res.json(items)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let item = await Item.create(req.body)
    res.json(item)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    let item = await Item.findById(req.params.id)
    let result = await item.update(req.body)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    let item = await Item.destroy({
      where: {
        id: req.params.id
      }
    })
    if (item) {
      res.status(200).send()
    }
  } catch (err) {
    next(err)
  }
})

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
