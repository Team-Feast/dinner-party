const {expect} = require('chai')
const db = require('../../index')
const Party = db.model('party')

describe('Party model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('valid party', () => {
    let party

    beforeEach(async () => {
      party = await Party.create({
        title: 'TEST PARTY'
      })
    })

    it('sets the title', () => {
      expect(party.title).to.equal('TEST PARTY')
    })

    it('sets default imageUrl', () => {
      expect(party.imageUrl).to.equal('/images/default-party.jpg')
    })
  })
}) // end describe('Party model')
