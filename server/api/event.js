const {Party} = require('../db/models')
const router = require('express').Router()

router.post('/', async (req, res, next) => {
  try {
    const {date} = req.body
    // const result = new Date(date)
    const newDate = await Party.create({
      title: 'My Party',
      date: date,
      description: '',
      location: '',
    })

    res.json(newDate)
  } catch (err) {
    next(err)
  }
})

module.exports = router
