const {Party} = require('../db/models')
const router = require('express').Router()
const moment = require('moment')
router.post('/', async (req, res, next) => {
  try {
    const {date} = req.body
    console.log('re body >>>>>>>>>> ', req.body)
    console.log('re date >>>>>>>>>> ', date)
    let md = moment(date)
    console.log('data >>>>>>>>>>>>>>>>>>>>>. ', md)

    const newDate = await Party.create({
      title: 'My Party',
      // date: '2018-11-16T06:00:00Z',
      date: md.utc().format(),
      description: '',
      location: ''
    })
    res.json(newDate)
  } catch (err) {
    next(err)
  }
})

module.exports = router
