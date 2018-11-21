const {Image} = require('../db/models')
const router = require('express').Router()


router.get('/:id', async (req, res, next) => {
  try {
    const images = await Image.findAll({
      where: {partyId: req.params.id}
    })
    res.json(images)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) =>{
  try{
    const {imageUrl, partyId, guestId} = req.body
    const image = await Image.create({
      imageUrl,
      partyId,
      guestId
    })
    res.json(image)
  }catch(err){
    next(err)
  }
})

module.exports = router

