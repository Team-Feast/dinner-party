'use strict'

const db = require('../server/db')
const {User, Party, Guest, Item, Category, Image} = require('../server/db/models')
const moment = require('moment')

// Random Data Creators
const chance = require('chance')(123)
const Promise = require('bluebird')
const toonAvatar = require('cartoon-avatar')

const numUsers = 10
const numParties = 5
const numGuests = 10
const numItems = 3
const numCategories = 3

const userEmails = chance.unique(chance.email, numUsers)
const guestEmails = chance.unique(chance.email, numGuests)

const userData = [
  {
    googleId: null,
    password:
      '0775bc0b1e5ee94fa2b1fdceca49f2a794efe7db14f62369534d35ce3f68d8f8',
    firstName: 'Cody',
    id: 1,
    imageUrl:
      'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/5.png',
    email: 'cody@email.com',
    salt: 'WqTlTsCk94j5z+AEqFKMtg==',
    lastName: 'Puppy'
  },
  {
    googleId: null,
    password:
      '56f6c0305cd4b858cdf5196bf449e88b2f59f660edd1b1a1604e47db61134fce',
    firstName: 'Dorothy',
    id: 31,
    imageUrl:
      'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/58.png',
    email: 'iwaciwe@en.im',
    salt: 'pj3hGQb9QLUbewVjbPlQhA==',
    lastName: 'Benelli'
  },
  {
    googleId: null,
    password:
      'b4b02880bc63ac3b91ba5f5819ee7ee684b1a2fd67111bcf5d2d9db12936cd3b',
    firstName: 'Lillian',
    id: 2,
    imageUrl:
      'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/13.png',
    email: 'cod@zivu.cl',
    salt: 'j0VBA5wygT0o5YjRhYkpMQ==',
    lastName: 'Bonini'
  },
  {
    googleId: null,
    password:
      '716a057da3ee6c16e0128dc458c6fdbdff787689415e615b3ef1d63c789fa273',
    firstName: 'Christian',
    id: 3,
    imageUrl:
      'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/124.png',
    email: 'mifco@javsul.ge',
    salt: '9vQ1cjo8Pso4P9KhSXuRgQ==',
    lastName: 'Underwood'
  },
  {
    googleId: null,
    password:
      '53ac53a1f8f35579b3961629f7d284766d0709963bf16b80e570000f701aa188',
    firstName: 'Joseph',
    id: 4,
    imageUrl:
      'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/7.png',
    email: 'lat@johvidvi.tl',
    salt: 'cqa8jGRL7J04RwrjIrSmlw==',
    lastName: 'Ford'
  }
]

const partyData = [
  {
    location: '901 Riil Ave, Kukicbav, SE, 49806',
    status: 'upcoming',
    userId: 1,
    id: 1,
    title: 'Party 1 - Cody',
    date: moment()
      .add(3, 'days')
      .toDate(),
    imageUrl: '/images/default-party.jpg',
    updatedAt: '2018-11-19 11:49:55.512-06',
    description:
      'Vapefdov ihoizo hih boeki de begeh cukbu ko nubfuswus ve wekpiw cegu ruloglaj navkiw pelpu nikpap. Pun ji ak pentake kefjuz licikat jorkib ec tetil he ni apkifak oh netetuv welpu. Cukuke nafuci oboneg ri kemehwur fi botlepak ce le ozbom je '
  },
  {
    location: '901 Riil Ave, Kukicbav, OR, 49806',
    status: 'upcoming',
    userId: 1,
    id: 3,
    title: 'Party 1B (old party) - Cody',
    date: moment()
      .subtract(1, 'days')
      .toDate(),
    imageUrl: '/images/default-party.jpg',
    updatedAt: '2018-11-19 11:49:55.512-06',
    description:
      'Vapefdov ihoizo hih boeki de begeh cukbu ko nubfuswus ve wekpiw cegu ruloglaj navkiw pelpu nikpap. Pun ji ak pentake kefjuz licikat jorkib ec tetil he ni apkifak oh netetuv welpu. Cukuke nafuci oboneg ri kemehwur fi botlepak ce le ozbom je '
  },
  {
    location: '208 Etodun Blvd, Gebijteh, DC, 37575',
    status: 'completed',
    userId: 2,
    id: 2,
    title: 'Party 2 (old party) - Lillian',
    date: moment()
      .subtract(1, 'days')
      .toDate(),
    imageUrl: '/images/default-party.jpg',
    updatedAt: '2018-11-19 11:49:55.512-06',
    description:
      'Luttugi ginkizec ife lugo isredit fo piehjuz ivtov fuphut subobbi wepokmod virvil bo waruldo zelovo siuv fah uwuazza. Duv vipka nag runer ruve de ocibizu hikog saovufef wop fuigojip vuwivnad ot kijan zogu. Pa jufuk difji kasno '
  },
  {
    location: '208 Etodun Blvd, Gebijteh, IL, 37575',
    status: 'completed',
    userId: 2,
    id: 4,
    title: 'Party 2B (future party) - Lillian',
    date: moment()
      .add(1, 'days')
      .toDate(),
    imageUrl: '/images/default-party.jpg',
    updatedAt: '2018-11-19 11:49:55.512-06',
    description:
      'Luttugi ginkizec ife lugo isredit fo piehjuz ivtov fuphut subobbi wepokmod virvil bo waruldo zelovo siuv fah uwuazza. Duv vipka nag runer ruve de ocibizu hikog saovufef wop fuigojip vuwivnad ot kijan zogu. Pa jufuk difji kasno ucetivone hahvatfuj gonter ewtibvif ri wudlowe uze ni res '
  }
]

const guestData = [
  {
    status: 'invited',
    phone: '3147278836',
    guestPartyToken: '68264670-ec39-11e8-a2d2-758fc26097cb',
    id: 1,
    partyId: 1,
    email: 'iwaciwe@en.im'
  },
  {
    status: 'invited',
    phone: '3678326353',
    guestPartyToken: '68264671-ec39-11e8-a2d2-758fc26097cb',
    id: 2,
    partyId: 1,
    email: 'cod@zivu.cl'
  },
  {
    status: 'attending',
    phone: '3159662982',
    guestPartyToken: '68264673-ec39-11e8-a2d2-758fc26097cb',
    id: 3,
    partyId: 1,
    email: 'lat@johvidvi.tl'
  },
  {
    status: 'declined',
    phone: '5324896085',
    guestPartyToken: '68264672-ec39-11e8-a2d2-758fc26097cb',
    id: 4,
    partyId: 1,
    email: 'mifco@javsul.ge'
  },
  {
    status: 'declined',
    phone: '2519885065',
    guestPartyToken: '68264674-ec39-11e8-a2d2-758fc26097cb',
    id: 5,
    partyId: 2,
    email: 'gabawsa@zipak.pg'
  },
  {
    status: 'attending',
    phone: '7255943268',
    guestPartyToken: '68264675-ec39-11e8-a2d2-758fc26097cb',
    id: 6,
    partyId: 4,
    userId: 1,
    email: 'cody@email.com'
  },
  {
    status: 'attending',
    phone: '7879734793',
    guestPartyToken: '68264676-ec39-11e8-a2d2-758fc26097cb',
    id: 7,
    partyId: 2,
    email: 'jim@jun.dk'
  },
  {
    status: 'attending',
    phone: '2346372441',
    guestPartyToken: '68264678-ec39-11e8-a2d2-758fc26097cb',
    id: 8,
    partyId: 2,
    email: 'avi@kujfit.an'
  }
]

const categoryData = [
  {
    id: 1,
    imageUrl: '/images/default-category.jpg',
    name: 'entrees'
  },
  {
    id: 2,
    imageUrl: '/images/default-category.jpg',
    name: 'beverages'
  },
  {
    id: 3,
    imageUrl: '/images/default-category.jpg',
    name: 'desserts'
  }
]

const itemData = [
  {
    partyId: 1,
    title: 'Pie',
    guestId: null,
    categoryId: 1,
    description:
      'Kicamali bobki tujtona kupioz vet ucivokhac wemi ob tu mejene du zedlaz eji.'
  },
  {
    partyId: 1,
    title: 'Drinks',
    guestId: null,
    categoryId: 1,
    description:
      'Nozwiv dahupoh lulas gucebi ewik difji kasno ucetivone hahvatfuj gonter ewtibvif ri wudlowe uze ni res.'
  },
  {
    partyId: 1,
    title: 'Appetizers',
    guestId: 2,
    categoryId: 3,
    description:
      'Nozwiv dahupoh lulas gucebi ewik difji kasno ucetivone hahvatfuj gonter ewtibvif ri wudlowe uze ni res.'
  },
  {
    partyId: 2,
    title: 'Kids Food',
    guestId: null,
    categoryId: 1,
    description:
      'Kicamali bobki tujtona kupioz vet ucivokhac wemi ob tu mejene du zedlaz eji.'
  },
  {
    partyId: 2,
    title: 'Strawberries',
    guestId: null,
    categoryId: 1,
    description:
      'Nozwiv dahupoh lulas gucebi ewik difji kasno ucetivone hahvatfuj gonter ewtibvif ri wudlowe uze ni res.'
  },
  {
    partyId: 2,
    title: 'Turkey',
    guestId: 7,
    categoryId: 1,
    description:
      'Nozwiv dahupoh lulas gucebi ewik difji kasno ucetivone hahvatfuj gonter ewtibvif ri wudlowe uze ni res.'
  }
]

const galleryData = [
  {
    imageUrl: '/images/images-2.jpg',
    partyId: 1,
    guestId: 1
  },
  {
    imageUrl: '/images/images-3.jpg',
    partyId: 1,
    guestId: 2
  },
  {
    imageUrl: '/images/images-4.jpg',
    partyId: 1,
    guestId: 3
  },
  {
    imageUrl: '/images/images-5.jpg',
    partyId: 1,
    guestId: 4
  },
  {
    imageUrl: '/images/images-6.jpg',
    partyId: 1,
    guestId: 5
  },
  {
    imageUrl: '/images/images-7.jpg',
    partyId: 1,
    guestId: 6
  },
  {
    imageUrl: '/images/images-2.jpg',
    partyId: 2,
    guestId: 1
  },
  {
    imageUrl: '/images/images-3.jpg',
    partyId: 2,
    guestId: 2
  },
  {
    imageUrl: '/images/images-4.jpg',
    partyId: 2,
    guestId: 3
  },
  {
    imageUrl: '/images/images-5.jpg',
    partyId: 2,
    guestId: 4
  },
  {
    imageUrl: '/images/images-6.jpg',
    partyId: 2,
    guestId: 5
  },
  {
    imageUrl: '/images/images-7.jpg',
    partyId: 2,
    guestId: 6
  },
  {
    imageUrl: '/images/images-2.jpg',
    partyId: 3,
    guestId: 1
  },
  {
    imageUrl: '/images/images-3.jpg',
    partyId: 3,
    guestId: 2
  },
  {
    imageUrl: '/images/images-4.jpg',
    partyId: 3,
    guestId: 3
  },
  {
    imageUrl: '/images/images-5.jpg',
    partyId: 3,
    guestId: 4
  },
  {
    imageUrl: '/images/images-6.jpg',
    partyId: 3,
    guestId: 5
  },
  {
    imageUrl: '/images/images-7.jpg',
    partyId: 3,
    guestId: 6
  },
  {
    imageUrl: '/images/images-2.jpg',
    partyId: 4,
    guestId: 1
  },
  {
    imageUrl: '/images/images-3.jpg',
    partyId: 4,
    guestId: 2
  },
  {
    imageUrl: '/images/images-4.jpg',
    partyId: 4,
    guestId: 3
  },
  {
    imageUrl: '/images/images-5.jpg',
    partyId: 4,
    guestId: 4
  },
  {
    imageUrl: '/images/images-6.jpg',
    partyId: 4,
    guestId: 5
  },
  {
    imageUrl: '/images/images-7.jpg',
    partyId: 4,
    guestId: 6
  }
]

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
  const cody = User.build({
    firstName: 'Cody',
    lastName: 'Puppy',
    imageUrl: randPhoto('male'),
    email: 'cody@email.com',
    password: '123'
  })
  users.push(cody)
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

    // await createUsers()
    await User.bulkCreate(userData)
    console.log(`Successfully Seeded Users`)

    // await createParties()
    await Party.bulkCreate(partyData)
    console.log(`Successfully Seeded Parties`)

    // await createGuests()
    await Guest.bulkCreate(guestData)
    console.log(`Successfully Seeded Guests`)

    // await createCategories()
    await Category.bulkCreate(categoryData)
    console.log(`Successfully Seeded Categories`)

    // await createItems()
    await Item.bulkCreate(itemData)
    console.log(`Successfully Seeded Items`)

    await Image.bulkCreate(galleryData)
    console.log(`Successfully Seeded Images`)



    await db.query(
      `ALTER SEQUENCE "parties_id_seq" RESTART WITH ${partyData.length + 1};`
    )
    await db.query(
      `ALTER SEQUENCE "guests_id_seq" RESTART WITH ${guestData.length + 1};`
    )
    await db.query(
      `ALTER SEQUENCE "users_id_seq" RESTART WITH ${userData.length + 1};`
    )
    await db.query(
      `ALTER SEQUENCE "categories_id_seq" RESTART WITH ${categoryData.length +
        1};`
    )
    await db.query(
      `ALTER SEQUENCE "items_id_seq" RESTART WITH ${itemData.length + 1};`
    )

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
