'use strict'
/* global describe beforeEach it */

const seed = require('./seed')

describe('seed script', () => {
  it('completes successfully', done => {
    seed().then(() => done())
  }).timeout(30000)
})
