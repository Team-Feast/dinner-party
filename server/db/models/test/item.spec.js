const {expect} = require('chai')
const db = require('../../index')
const Guest = db.model('guest')
const Party = db.model('party')
const Item = db.model('item')

describe('Item model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('valid Item', () => {
    let party1, party2, guest1, guest2, item1, item2, item3

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
        email: 'cody@puppybook.com',
        partyId: 1
      })

      item1 = await Item.create({
        title: 'TEST1 ITEM',
        partyId: 1,
        guestId: 1
      })

      item2 = await Item.create({
        title: 'TEST2 ITEM',
        partyId: 2,
        guestId: 2
      })

      item3 = await Item.create({
        title: 'TEST1 ITEM',
        partyId: 1,
        guestId: 1
      })
    })

    it('sets the title', () => {
      expect(item1.title).to.equal('TEST1 ITEM')
      expect(item2.title).to.equal('TEST2 ITEM')
    })

    it('belongs to a party', async () => {
      expect(item1.partyId).to.equal(1)
      party1 = await Party.findById(item1.partyId, {include: [Item]})
      expect(party1.items[0].title).to.equal('TEST1 ITEM')
    })

    it('allows for multiple items to a party', async () => {
      party1 = await Party.findById(item1.partyId, {include: [Item]})
      expect(party1.items.length).to.equal(2)
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
}) // end describe('Item model')
