'use strict'

const db = require('../server/db')
const {User, Party, Guest, Item, Category} = require('../server/db/models')

// Random Data Creators
const chance = require('chance')(123)
const Promise = require('bluebird')
const toonAvatar = require('cartoon-avatar')

const numUsers = 50
const numParties = 200
const numGuests = 2000
const numItems = 1500
const numCategories = 10

const userEmails = chance.unique(chance.email, numUsers)
const guestEmails = chance.unique(chance.email, numGuests)

//helper functions
function doTimes(n, fn) {
  const results = []
  while (n--) {
    results.push(fn())
  }
  return results
}

function randPhoto(gender) {
  gender = gender.toLowerCase()
  const id = chance.natural({
    min: 1,
    max: gender === 'female' ? 114 : 129
  })
  return toonAvatar.generate_avatar({gender: gender, id: id})
}

//Users
function randUser() {
  const gender = chance.gender()
  return User.build({
    firstName: chance.first({gender: gender}),
    lastName: chance.last(),
    imageUrl: randPhoto(gender),
    email: userEmails.pop(),
    password: chance.word({length: 6}) + chance.character({pool: '12345'})
  })
}

function generateUsers() {
  const users = doTimes(numUsers, randUser)
  console.log(`seeding ${users.length} users`)
  return users
}

function createUsers() {
  return Promise.map(generateUsers(), user => {
    return user.save()
  })
}

//Guests
function randGuest() {
  return Guest.build({
    email: guestEmails.pop(),
    status: chance.weighted(['invited', 'attending', 'declined'], [5, 2, 1]),
    phone: chance.phone({formatted: false}),
    partyId: chance.integer({min: 1, max: numParties})
  })
}

function generateGuests() {
  const guests = doTimes(numGuests, randGuest)
  console.log(`seeding ${guests.length} guests`)
  return guests
}

function createGuests() {
  return Promise.map(generateGuests(), guest => {
    return guest.save()
  })
}

//Parties
function randParty() {
  return Party.build({
    title: chance.sentence({words: 5}),
    description: chance.paragraph(),
    location: [
      chance.address({short_suffix: true}),
      chance.city(),
      chance.state(),
      chance.country(),
      chance.zip()
    ].join(', '),
    date: new Date(),
    status: chance.weighted(
      ['draft', 'upcomming', 'cancelled', 'completed'],
      [1, 3, 1, 2]
    ),
    userId: chance.integer({min: 1, max: numUsers})
  })
}

function generateParties() {
  const parties = doTimes(numParties, randParty)
  console.log(`seeding ${parties.length} parties`)
  return parties
}

function createParties() {
  return Promise.map(generateParties(), party => {
    return party.save()
  })
}

//Items
function randItem() {
  return Item.build({
    title: chance.sentence({words: 5}),
    description: chance.paragraph(),
    partyId: chance.integer({min: 1, max: numParties}),
    categoryId: chance.weighted(
      [chance.integer({min: 1, max: numCategories}), null],
      [5, 1]
    ),
    guestId: chance.weighted(
      [chance.integer({min: 1, max: numGuests}), null],
      [5, 1]
    )
  })
}

function generateItems() {
  const items = doTimes(numItems, randItem)
  console.log(`seeding ${items.length} items`)
  return items
}

function createItems() {
  return Promise.map(generateItems(), item => {
    return item.save()
  })
}

//Categories
function randCategory() {
  return Category.build({
    name: chance.word({length: 6})
  })
}

function generateCategories() {
  const categories = doTimes(numCategories, randCategory)
  console.log(`seeding ${categories.length} categories`)
  return categories
}

function createCategories() {
  return Promise.map(generateCategories(), category => {
    return category.save()
  })
}

const seed = async () => {
  try {
    await db.sync({force: true})
    console.log('db synced!')

    await createUsers()
    console.log(`Successfully Seeded Users`)

    await createParties()
    console.log(`Successfully Seeded Parties`)

    await createGuests()
    console.log(`Successfully Seeded Guests`)

    await createCategories()
    console.log(`Successfully Seeded Parties`)

    await createItems()
    console.log(`Successfully Seeded Parties`)

    console.log(`seeding successfully`)
  } catch (err) {
    console.log('Error while seeding')
    console.log(err.stack)
  }
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
