const {expect} = require('chai')
const db = require('../../index')
const Party = db.model('party')
const User = db.model('user')

describe('Party model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('valid party', () => {
    let party
    let user

    beforeEach(async () => {
      user = await User.create({
        email: 'cody@puppybook.com',
        password: 'bones'
      })

      party = await Party.create({
        title: 'TEST PARTY',
        userId: 1
      })
    })

    it('sets the title', () => {
      expect(party.title).to.equal('TEST PARTY')
    })

    it('sets default imageUrl', () => {
      expect(party.imageUrl).to.equal('/images/default-party.jpg')
    })

    it('belongs to a user', async () => {
      expect(party.userId).to.equal(1)
      user = await User.findById(party.userId)
      expect(user.email).to.equal('cody@puppybook.com')
    })
  })
}) // end describe('Party model')
