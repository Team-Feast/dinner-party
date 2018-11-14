const {expect} = require('chai')
const db = require('../../index')
const Category = db.model('category')
const Party = db.model('party')
const Guest = db.model('guest')
const Item = db.model('item')

describe('Category model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('valid Category', () => {
    let party1,
      party2,
      item1,
      item2,
      item3,
      category1,
      category2,
      guest1,
      guest2

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
      category1 = await Category.create({
        name: 'CATEGORY1'
      })
      category2 = await Category.create({
        name: 'CATEGORY2'
      })
      item1 = await Item.create({
        title: 'TEST1 ITEM',
        partyId: 1,
        guestId: 1,
        categoryId: 1
      })
      item2 = await Item.create({
        title: 'TEST2 ITEM',
        partyId: 2,
        guestId: 2,
        categoryId: 2
      })
      item3 = await Item.create({
        title: 'TEST3 ITEM',
        partyId: 1,
        guestId: 1,
        categoryId: 1
      })
    })

    it('sets the name', () => {
      expect(category1.name).to.equal('CATEGORY1')
      expect(category2.name).to.equal('CATEGORY2')
    })

    it('item belongs to category', () => {
      expect(item1.categoryId).to.equal(1)
    })

    it('category can have many items', async () => {
      category1 = await Category.findById(1, {include: [Item]})
      expect(category1.items.length).to.equal(2)
    })
  })
}) // end describe('Category model')
