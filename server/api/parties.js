const {Party, User, Guest, Item} = require('../db/models')
const router = require('express').Router()
const moment = require('moment')
const multer = require('multer')
const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')

// const storage = cloudinaryStorage({
//   cloudinary: cloudinary,
//   folder: 'parties',
//   allowedFormats: ['jpg', 'png'],
//   transformation: [{width: 500, height: 500, crop: 'limit'}]
// })

const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname)
  }
})

const imageFilter = function(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are allowed.'), false)
  }
  cb(null, true)
}

const upload = multer({storage: storage, fileFilter: imageFilter})

// const parser = multer({storage: storage})
// parser.single('image'),
router.post('/images', upload.single('image'), (req, res, next) => {
  console.log(req.body)
  console.log(req.file)
  // try {
  //   console.log(req.file) // to see what is returned to you
  //   const image = {}
  //   image.url = req.file.url
  //   image.id = req.file.public_id

  //   res.json(image.url)
  // } catch (error) {
  //   next(error)
  // }

  cloudinary.uploader.upload(req.file.path, function(error, result) {
    console.log(result, error)
  })
  // Image.create(image) // save image information in database
  //   .then(newImage => res.json(newImage))
  //   .catch(err => console.log(err))
})

router.get('/:id', async (req, res, next) => {
  try {
    const party = await Party.findById(req.params.id, {
      include: [{model: User, attributes: ['firstName', 'lastName']}]
    })
    res.json(party)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/items', async (req, res, next) => {
  try {
    const items = await Item.findAll({
      where: {
        partyId: req.params.id
      },
      include: [Guest]
    })
    res.json(items)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/guests', async (req, res, next) => {
  try {
    const guests = await Guest.findAll({
      where: {
        partyId: req.params.id
      }
    })
    res.json(guests)
  } catch (err) {
    next(err)
  }
})

router.post('/', upload.single('image'), async (req, res, next) => {
  console.log(req.file)
  console.log(req.body)
  try {
    cloudinary.uploader.upload(req.file.path, async result => {
      const newParty = await Party.create({
        title: req.body.info.title,
        description: req.body.info.description,
        location: req.body.info.location,
        date: req.body.info.date,
        userId: req.body.info.userId,
        imageUrl: result.url
      })
      res.json(newParty)
    })
  } catch (err) {
    next(err)
  }
})

router.get('/rsvp/:guestPartyToken', async (req, res, next) => {
  try {
    const {guestPartyToken} = req.params
    let guest = await Guest.findOne({where: {guestPartyToken: guestPartyToken}})
    res.json(guest.status)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try{
    let party = await Party.findById(req.params.id)
    let result  = await party.update(req.body)
    res.json(result)
  }catch(err){
    next(err)
  }
})

router.put('/rsvp/:guestPartyToken', async (req, res, next) => {
  try {
    const {guestPartyToken} = req.params
    const {status} = req.body
    let guest = await Guest.findOne({where: {guestPartyToken: guestPartyToken}})
    if (guest) {
      await guest.update({status})
      res.json(guest.status)
    }
  } catch (error) {
    next(error)
  }
})

// GET /api/parties/user/:userId
// Return an object that will contain information
// about a current users parties.
// The object will look like this:
/*
 {
   upcoming: {} // an object of the closest upcoming event
   hosting: [...] // array of objects
   attending: [...] // array of objects
   past_events: [...] // array of objects past events
 }
*/
router.get('/user/:userId', async (req, res, next) => {
  try {
    // upcoming parties
    const user = await User.findById(req.params.userId)

    const hosting = await Party.findAll({
      where: {
        $and: [
          {userId: user.id},
          {
            date: {
              $gte: moment()
                .utc()
                .toDate()
            }
          }
        ]
      },
      order: [['date', 'ASC']]
    })

    let upcomingEventToHost = await Party.findAll({
      where: {
        $and: [
          {userId: user.id},
          {
            date: {
              $gte: moment()
                .utc()
                .toDate()
            }
          }
        ]
      },
      limit: 1,
      order: [['date', 'ASC']]
    })

    if (upcomingEventToHost.length === 1)
      upcomingEventToHost = upcomingEventToHost[0]

    const attending = await Guest.findAll({
      where: {
        email: user.email
      },
      include: [
        {
          model: Party,
          where: {
            date: {
              $gte: moment()
                .utc()
                .toDate()
            }
          }
        }
      ]
    })

    // sort ASCENDING by the party date
    attending.sort(function(left, right) {
      return moment.utc(left.party.date).diff(moment.utc(right.party.date))
    })

    const pastHosting = await Party.findAll({
      where: {
        $and: [
          {userId: user.id},
          {
            date: {
              $lt: moment()
                .utc()
                .toDate()
            }
          }
        ]
      },
      order: [['date', 'ASC']]
    })

    const pastAttending = await Guest.findAll({
      where: {
        email: user.email
      },
      include: [
        {
          model: Party,
          where: {
            date: {
              $lt: moment()
                .utc()
                .toDate()
            }
          }
        }
      ]
    })

    const pastEvents = [...pastHosting, ...pastAttending]

    res.json({upcomingEventToHost, hosting, attending, pastEvents})
  } catch (err) {
    next(err)
  }
})

module.exports = router
