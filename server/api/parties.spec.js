const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')

const app = require('../index')
const Party = db.model('party')
const User = db.model('user')
const moment = require('moment')

describe.only('Party API routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/parties/user/:userId', () => {
    beforeEach(() => {
      return db.sync({force: true})
    })
    it('GET /api/parties/user/:userId for a hosting event', async () => {
      const host = await User.create({
        email: 'test@test.com',
        password: 'test'
      })
      const party = await Party.create({
        title: 'Test party',
        date: moment()
          .add(1, 'days')
          .toDate()
      })
      party.setUser(host)
      const agent = request.agent(app)
      const res = await agent.get('/api/parties/user/1').expect(200)
      expect(res.body.hosting.length).to.be.equal(1)
    })
    xit('GET /api/parties/user/:userId for an attending event', async () => {
      // const user = await createUserWithNoCart('nocart@cart.com')
      // const res = await user.get('/api/cart').expect(200)
      // expect(res.body.products).to.be.an('array')
      // expect(res.body.products.length).to.be.equal(0)
      expect(true).to.be.equal(false)
    })
  }) // end describe('/api/parties')
}) // end describe('Party routes')
