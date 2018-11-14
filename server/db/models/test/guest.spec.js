const {expect} = require('chai')
const db = require('../../index')
const Guest = db.model('guest')
const Party = db.model('party')

describe('Guest model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('valid Guest', () => {
    let party1, party2, guest1, guest2

    beforeEach(async () => {
      party1 = await Party.create({
        title: 'TEST1 PARTY'
      })
      party2 = await Party.create({
        title: 'TEST2 PARTY'
      })

      guest1 = await Guest.create({
        email: 'cody@puppybook.com',
        partyId: 1
      })
      guest2 = await Guest.create({
        email: 'rocky@puppybook.com',
        partyId: 1
      })
    })

    it('sets the email', () => {
      expect(guest1.email).to.equal('cody@puppybook.com')
      expect(guest2.email).to.equal('rocky@puppybook.com')
    })

    it('belongs to a party', async () => {
      expect(guest1.partyId).to.equal(1)
      party1 = await Party.findById(guest1.partyId, {include: [Guest]})
      expect(party1.guests[0].email).to.equal('cody@puppybook.com')
    })

    it('allows for multiple guests to a party', async () => {
      party1 = await Party.findById(guest1.partyId, {include: [Guest]})
      expect(party1.guests[0].email).to.equal('cody@puppybook.com')
      expect(party1.guests[1].email).to.equal('rocky@puppybook.com')
    })

    it('allows for one guests to attent many parties', async () => {
      party1 = await Party.findById(guest1.partyId, {include: [Guest]})
      expect(party1.guests[0].email).to.equal('cody@puppybook.com')
      guest1 = await Guest.create({
        email: 'cody@puppybook.com',
        partyId: 2
      })
      party2 = await Party.findById(guest1.partyId, {include: [Guest]})
      expect(party2.guests[0].email).to.equal('cody@puppybook.com')
    })
  })
}) // end describe('Guest model')
