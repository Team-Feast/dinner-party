const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')

const app = require('../index')
const Party = db.model('party')
const User = db.model('user')
const Guest = db.model('guest')
const moment = require('moment')

describe('Party API routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  //TODO, moved to new route
  // describe('/api/parties/user/:userId', () => {
  //   beforeEach(() => {
  //     return db.sync({force: true})
  //   })
  //   it('GET /api/parties/user/:userId for a hosting event', async () => {
  //     const host = await User.create({
  //       email: 'test@test.com',
  //       password: 'test'
  //     })
  //     const party = await Party.create({
  //       title: 'Test party',
  //       date: moment()
  //         .add(1, 'days')
  //         .toDate()
  //     })
  //     party.setUser(host)
  //     const agent = request.agent(app)
  //     const res = await agent.get('/api/parties/user/1').expect(200)

  //     expect(res.body.length).to.be.equal(1)
  //   })
  //   it('GET /api/parties/user/:userId for an attending event', async () => {
  //     // host and guess are the same person
  //     const host = await User.create({
  //       email: 'host@test.com',
  //       password: 'test'
  //     })
  //     // host and guess are the same person
  //     const guest = await Guest.create({
  //       email: 'host@test.com'
  //     })
  //     const party = await Party.create({
  //       title: 'Test party',
  //       date: moment()
  //         .add(1, 'days')
  //         .toDate()
  //     })
  //     party.setUser(host)
  //     party.addGuest(guest)
  //     const agent = request.agent(app)
  //     const res = await agent.get('/api/parties/user/1').expect(200)
  //     expect(res.body.length).to.be.equal(1)
  //   })
  // }) // end describe('/api/parties')

  describe('/api/parties/rsvp/:guestPartyToken', () => {
    beforeEach(() => {
      return db.sync({force: true})
    })
    it('should return an invited status', async () => {
      const guest = await Guest.create({
        email: 'test@test.com'
      })

      const agent = request.agent(app)
      const res = await agent
        .get(`/api/parties/rsvp/${guest.guestPartyToken}`)
        .expect(200)
      expect(res.body).to.be.equal('invited')
    })
  })
}) // end describe('Party routes')
