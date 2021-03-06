const {Guest, Item} = require('../db/models')
const router = require('express').Router()

//GET /api/items/
router.get('/', async (req, res, next) => {
  try {
    let items = await Item.findAll()
    res.json(items)
  } catch (err) {
    next(err)
  }
})

//
router.put('/:id', async (req, res, next) => {
  try {
    let item = await Item.findById(req.params.id)
    let result = await item.update(req.body)
    let data = await Item.findById(result.id, {include: [Guest]})
    res.json(data)
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
    const {title, description, partyId} = req.body

    const newItem = await Item.create({
      title,
      description,
      partyId
    })
    const newItemWithGuest = await Item.findOne({
      where: {id: newItem.id},
      include: [Guest]
    })

    res.json(newItemWithGuest)
  } catch (error) {
    next(error)
  }
})

router.post('/newfeast', async (req, res, next) => {
  try {
    const {items, partyId} = req.body

    for (let i = 0; i < items.length; i++) {
      const {title, description} = items[i]
      await Item.create({
        title,
        description,
        partyId
      })
    }

    res.status(201).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router
