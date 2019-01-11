'use strict'

const db = require('../server/db')
const {
  User,
  Party,
  Guest,
  Item,
  Category,
  Image,
  Reminder
} = require('../server/db/models')
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
      'https://user-images.githubusercontent.com/12876798/38030875-d3166276-3267-11e8-96d9-309aa8cf008b.png',
    email: 'cody@email.com',
    salt: 'WqTlTsCk94j5z+AEqFKMtg==',
    lastName: 'Puppy'
  },
  {
    googleId: null,
    password:
      '70ef721085a8fc6225db7d3583a04af49962114c0ea5c53830fc572a0b43e1bc',
    firstName: 'Paul',
    id: 5,
    imageUrl: '/images/Paul.jpeg',
    salt: 's6nRHgYri45Wjw+6gcA4Pw==',
    email: 'paul@email.com',
    lastName: 'Ebreo'
  },
  {
    googleId: null,
    password:
      'b4b02880bc63ac3b91ba5f5819ee7ee684b1a2fd67111bcf5d2d9db12936cd3b',
    firstName: 'Joseph',
    id: 2,
    imageUrl: '/images/Joseph.jpeg',
    email: 'josephfullstack@gmail.com',
    salt: 'WqTlTsCk94j5z+AEqFKMtg==',
    lastName: 'Park'
  },
  {
    googleId: null,
    password:
      '716a057da3ee6c16e0128dc458c6fdbdff787689415e615b3ef1d63c789fa273',
    firstName: 'Daniel',
    id: 3,
    imageUrl: '/images/Daniel.jpeg',
    email: 'daniel@email.com',
    salt: '9vQ1cjo8Pso4P9KhSXuRgQ==',
    lastName: 'Casaola'
  },
  {
    googleId: null,
    password:
      '53ac53a1f8f35579b3961629f7d284766d0709963bf16b80e570000f701aa188',
    firstName: 'Andrew',
    id: 4,
    imageUrl: '/images/Andrew.jpeg',
    email: 'andrew@email.com',
    salt: 'cqa8jGRL7J04RwrjIrSmlw==',
    lastName: 'Ferguson'
  }
]

const partyData = [
  {
    location: '405 W Superior St, Chicago, IL 60654',
    status: 'upcoming',
    userId: 5,
    id: 1,
    title: 'Friends & Family Afterparty',
    date: '2019-05-28 18:30:00.512-06',
    imageUrl: '/images/party-pic.jpg',
    updatedAt: '2018-11-28 20:30:00.512-06',
    description: `We're going to code all night! Bring food, drinks, and let's celebrate!`
  },
  {
    location: '1305 S Michigan Ave, Chicago, IL 60605',
    status: 'upcoming',
    userId: 5,
    id: 2,
    title: 'Friday night dinner',
    date: '2018-11-30 19:30:00.512-06',
    imageUrl:
      'http://buckinghamfarmsonline.com/wp-content/uploads/2018/08/8.17.18-dinner-848x380.jpg',
    updatedAt: '2018-11-30 19:30:00.512-06',
    description: `Let's just get together for potluck dinner on Friday. We'll eat, drink, and play some games.`
  },
  {
    location: '401 N Wabash Ave, Chicago, IL 60611',
    status: 'upcoming',
    userId: 1,
    id: 3,
    title: '2018 Christmas Party Dinner',
    date: '2018-12-24 18:30:00.512-06',
    imageUrl: 'http://ibew2323.com/wp-content/uploads/2014/12/christmas.jpg',
    updatedAt: '2018-11-19 11:49:55.512-06',
    description: `HohHOHOHO it's Christmas Time! We're going to have a potluck dinner and White Elephant gift exchange! Sign up for what you'll be bringing and also bring a $15 or less gift!`
  },
  {
    location: '1700 Orington Avenue, Evanston, IL 60201',
    status: 'completed',
    userId: 2,
    id: 4,
    title: `John's 30th birthday!`,
    date: '2018-11-23 18:30:00.512-06',
    imageUrl:
      'https://ih1.redbubble.net/image.563456370.8581/poster%2C210x230%2Cf8f8f8-pad%2C210x230%2Cf8f8f8.lite-1u2.jpg',
    updatedAt: '2018-11-23 18:30:00.512-06',
    description: `Come out and celebrate John's 30th birthday with us! We'll start with dinner and then make our way out to the city!`
  },
  {
    location: '1531 N Damen Ave, Chicago, IL 60622',
    status: 'completed',
    userId: 5,
    id: 5,
    title: `Thursday Night Taco Night`,
    date: '2018-11-22 19:30:00.512-06',
    imageUrl:
      'https://img1.cookinglight.timeinc.net/sites/default/files/1519665233/slow-cooker-carnitas-tacos-ck-1804p38.jpg',
    updatedAt: '2018-11-22 19:30:00.512-06',
    description: `We're going to have our monthly Thursday Night Taco Night!`
  }
]

const guestData = [
  {
    status: 'invited',
    phone: '3147278836',
    guestPartyToken: '68264670-ec39-11e8-a2d2-758fc26097cb',
    id: 1,
    partyId: 1,
    userId: 1,
    firstName: 'Cody',
    email: 'cody@email.com'
  },
  {
    status: 'invited',
    phone: '3678326353',
    guestPartyToken: '68264671-ec39-11e8-a2d2-758fc26097cb',
    id: 2,
    partyId: 1,
    userId: 2,
    firstName: 'Joseph',
    email: 'josephfullstack@gmail.com'
  },
  {
    status: 'attending',
    phone: '3159662982',
    guestPartyToken: '68264673-ec39-11e8-a2d2-758fc26097cb',
    id: 3,
    partyId: 1,
    userId: 3,
    firstName: 'Daniel',
    email: 'daniel@email.com'
  },
  {
    status: 'invited',
    phone: '5324896085',
    guestPartyToken: '68264672-ec39-11e8-a2d2-758fc26097cb',
    id: 4,
    partyId: 1,
    userId: 4,
    firstName: 'Andrew',
    email: 'andrew@email.com'
  },
  {
    status: 'attending',
    phone: '5324896085',
    guestPartyToken: '68264679-ec39-11e8-a2d2-758fc26097cb',
    id: 5,
    partyId: 1,
    userId: 5,
    firstName: 'Paul',
    email: 'paul@email.com'
  },
  {
    status: 'invited',
    phone: '2519885065',
    guestPartyToken: '68264674-ec39-11e8-a2d2-758fc26097cb',
    id: 6,
    partyId: 1,
    firstName: 'Nathan',
    email: 'nathan@email.com'
  },
  {
    status: 'attending',
    phone: '5324896085',
    guestPartyToken: '68264675-ec39-11e8-a2d2-758fc26097cb',
    id: 7,
    partyId: 3,
    userId: 5,
    firstName: 'Paul',
    email: 'paul@email.com'
  },
  {
    status: 'attending',
    phone: '7255943268',
    guestPartyToken: '68264676-ec39-11e8-a2d2-758fc26097cb',
    id: 8,
    partyId: 2,
    firstName: 'Jane',
    email: 'jane@email.com'
  },
  {
    status: 'invited',
    phone: '7879734793',
    guestPartyToken: '68264677-ec39-11e8-a2d2-758fc26097cb',
    id: 9,
    partyId: 2,
    userId: 4,
    firstName: 'Andrew',
    email: 'andrew@email.com'
  },
  {
    status: 'attending',
    phone: '2346372441',
    guestPartyToken: '68264678-ec39-11e8-a2d2-758fc26097cb',
    id: 10,
    partyId: 2,
    userId: 5,
    firstName: 'Paul',
    email: 'paul@email.com'
  },
  {
    status: 'attending',
    phone: '2326372441',
    guestPartyToken: '68264979-ec39-11e8-a2d2-758fc26097cb',
    id: 11,
    partyId: 2,
    userId: 3,
    firstName: 'Daniel',
    email: 'daniel@email.com'
  },
  {
    status: 'invited',
    phone: '3147278836',
    guestPartyToken: '68224670-ec39-11e8-a2d2-758fc26097cb',
    id: 32,
    partyId: 2,
    userId: 1,
    firstName: 'Cody',
    email: 'cody@email.com'
  },
  {
    status: 'invited',
    phone: '3246372441',
    guestPartyToken: '68264980-ec39-11e8-a2d2-758fc26097cb',
    id: 12,
    partyId: 3,
    firstName: 'Suzy',
    email: 'suzy@email.com'
  },
  {
    status: 'attending',
    phone: '2533435322',
    guestPartyToken: '68264981-ec39-11e8-a2d2-758fc26097cb',
    id: 13,
    partyId: 3,
    firstName: 'Sue',
    email: 'sue@email.com'
  },
  {
    status: 'attending',
    phone: '2326372441',
    guestPartyToken: '68264982-ec39-11e8-a2d2-758fc26097cb',
    id: 14,
    partyId: 3,
    firstName: 'Sophie',
    email: 'sophie@email.com'
  },
  {
    status: 'invited',
    phone: '2326372441',
    guestPartyToken: '68264983-ec39-11e8-a2d2-758fc26097cb',
    id: 15,
    partyId: 3,
    firstName: 'Jenny',
    email: 'jenny@email.com'
  },
  {
    status: 'attending',
    phone: '2326372441',
    guestPartyToken: '68264984-ec39-11e8-a2d2-758fc26097cb',
    id: 16,
    partyId: 3,
    firstName: 'Brett',
    email: 'brett@email.com'
  },
  {
    status: 'attending',
    phone: '3147278836',
    guestPartyToken: '68364670-ec39-11e8-a2d2-758fc26097cb',
    id: 33,
    partyId: 3,
    userId: 1,
    firstName: 'Cody',
    email: 'cody@email.com'
  },
  {
    status: 'attending',
    phone: '2326372441',
    guestPartyToken: '68264985-ec39-11e8-a2d2-758fc26097cb',
    id: 17,
    partyId: 4,
    userId: 2,
    firstName: 'Joseph',
    email: 'joseph@email.com'
  },
  {
    status: 'invited',
    phone: '2326372441',
    guestPartyToken: '68264986-ec39-11e8-a2d2-758fc26097cb',
    id: 18,
    partyId: 4,
    firstName: 'John',
    email: 'johnp@email.com'
  },
  {
    status: 'attending',
    phone: '2326372441',
    guestPartyToken: '68264987-ec39-11e8-a2d2-758fc26097cb',
    id: 19,
    partyId: 4,
    firstName: 'Ron',
    email: 'ron@email.com'
  },
  {
    status: 'invited',
    phone: '2326372441',
    guestPartyToken: '68264988-ec39-11e8-a2d2-758fc26097cb',
    id: 20,
    partyId: 4,
    firstName: 'Collin',
    email: 'collin@email.com'
  },
  {
    status: 'invited',
    phone: '2326372441',
    guestPartyToken: '68264989-ec39-11e8-a2d2-758fc26097cb',
    id: 21,
    partyId: 4,
    firstName: 'Hannah',
    email: 'hannah@email.com'
  },
  {
    status: 'attending',
    phone: '2326372441',
    guestPartyToken: '68264990-ec39-11e8-a2d2-758fc26097cb',
    id: 22,
    partyId: 4,
    firstName: 'Jennifer',
    email: 'jennifer@email.com'
  },
  {
    status: 'attending',
    phone: '2326372441',
    guestPartyToken: '68264991-ec39-11e8-a2d2-758fc26097cb',
    id: 23,
    partyId: 4,
    firstName: 'Ryan',
    email: 'ryan@email.com'
  },
  {
    status: 'attending',
    phone: '2326372441',
    guestPartyToken: '68264992-ec39-11e8-a2d2-758fc26097cb',
    id: 24,
    partyId: 4,
    firstName: 'Eric',
    email: 'eric@email.com'
  },
  {
    status: 'attending',
    phone: '3147278836',
    guestPartyToken: '68234670-ec39-11e8-a2d2-758fc26097cb',
    id: 34,
    partyId: 4,
    userId: 1,
    firstName: 'Cody',
    email: 'cody@email.com'
  },
  {
    status: 'attending',
    phone: '2326372441',
    guestPartyToken: '68264993-ec39-11e8-a2d2-758fc26097cb',
    id: 25,
    partyId: 5,
    userId: 5,
    firstName: 'Paul',
    email: 'paul@email.com'
  },
  {
    status: 'invited',
    phone: '2326372441',
    guestPartyToken: '68264994-ec39-11e8-a2d2-758fc26097cb',
    id: 26,
    partyId: 5,
    firstName: 'Ellie',
    email: 'ellie@email.com'
  },
  {
    status: 'invited',
    phone: '2326372441',
    guestPartyToken: '68264995-ec39-11e8-a2d2-758fc26097cb',
    id: 27,
    partyId: 5,
    firstName: 'Janet',
    email: 'janet@email.com'
  },
  {
    status: 'invited',
    phone: '2326372441',
    guestPartyToken: '68264996-ec39-11e8-a2d2-758fc26097cb',
    id: 28,
    partyId: 5,
    firstName: 'Pearl',
    email: 'pearl@email.com'
  },
  {
    status: 'attending',
    phone: '2326372441',
    guestPartyToken: '68264997-ec39-11e8-a2d2-758fc26097cb',
    id: 29,
    partyId: 5,
    firstName: 'Brittney',
    email: 'brittney@email.com'
  },
  {
    status: 'attending',
    phone: '2326372441',
    guestPartyToken: '68264998-ec39-11e8-a2d2-758fc26097cb',
    id: 30,
    partyId: 5,
    firstName: 'Jeanne',
    email: 'jeanne@email.com'
  },
  {
    status: 'invited',
    phone: '2326372441',
    guestPartyToken: '68264999-ec39-11e8-a2d2-758fc26097cb',
    id: 31,
    partyId: 5,
    userId: 4,
    firstName: 'Andrew',
    email: 'andrew@email.com'
  },
  {
    status: 'attending',
    phone: '3147278836',
    guestPartyToken: '68124670-ec39-11e8-a2d2-758fc26097cb',
    id: 35,
    partyId: 5,
    userId: 1,
    firstName: 'Cody',
    email: 'cody@email.com'
  },
  {
    status: 'invited',
    phone: '2326372441',
    guestPartyToken: '68262312-ec39-11e8-a2d2-758fc26097cb',
    id: 36,
    partyId: 1,
    firstName: 'John',
    email: 'johnj@email.com'
  },
  {
    status: 'attending',
    phone: '2326372441',
    guestPartyToken: '68262313-ec39-11e8-a2d2-758fc26097cb',
    id: 37,
    partyId: 1,
    firstName: 'Chrissy',
    email: 'chrissy@email.com'
  },
  {
    status: 'attending',
    phone: '2326372441',
    guestPartyToken: '68262314-ec39-11e8-a2d2-758fc26097cb',
    id: 38,
    partyId: 1,
    firstName: 'Meghan',
    email: 'meghan@email.com'
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
    title: '3 Pints of Ice Cream',
    guestId: null,
    categoryId: 1,
    description: '3 Quarts... vanilla, chocolate, cookies and cream'
  },
  {
    partyId: 1,
    title: 'Lots of Pizza',
    guestId: null,
    categoryId: 1,
    description: 'Gonna order a couple of large from Papa Johns'
  },
  {
    partyId: 1,
    title: '200 Chicken Wings',
    guestId: 1,
    categoryId: 3,
    description: 'Picking up some wings from Harolds'
  },
  {
    partyId: 1,
    title: '12 Pack IPA',
    guestId: null,
    categoryId: 1,
    description: '24 pack'
  },
  {
    partyId: 1,
    title: 'Portillos Cake',
    guestId: 3,
    categoryId: 1,
    description: ''
  },
  {
    partyId: 1,
    title: 'Salad',
    categoryId: 1,
    description: ''
  },
  {
    partyId: 1,
    title: 'Tequila',
    guestId: 4,
    categoryId: 1,
    description: ''
  },
  {
    partyId: 1,
    title: 'Silverware',
    guestId: 37,
    categoryId: 1,
    description: ''
  },
  {
    partyId: 2,
    title: 'Wings',
    guestId: 2,
    categoryId: 1,
    description: 'party platter from Buff Joes'
  },
  {
    partyId: 2,
    title: 'Pizza',
    guestId: 3,
    categoryId: 1,
    description: '2 pizzas from Lou Malnatis'
  },
  {
    partyId: 2,
    title: '2 Bottles of Soda',
    categoryId: 1,
    description: ''
  },
  {
    partyId: 2,
    title: '1 Bottle of Wine',
    guestId: 8,
    categoryId: 1,
    description: ''
  },
  {
    partyId: 3,
    title: 'Ribs',
    guestId: 13,
    categoryId: 1,
    description: ''
  },
  {
    partyId: 3,
    title: 'Spaghetti',
    guestId: 14,
    categoryId: 1,
    description: ''
  },
  {
    partyId: 3,
    title: 'Fruit Salad',

    categoryId: 1,
    description: ''
  },
  {
    partyId: 3,
    title: 'Chicken Wings',
    categoryId: 1,
    description: ''
  },
  {
    partyId: 3,
    title: 'Dessert',
    categoryId: 1,
    description: ''
  },
  {
    partyId: 3,
    title: 'Wine',
    categoryId: 1,
    description: ''
  },
  {
    partyId: 3,
    title: 'Cookies',
    categoryId: 1,
    description: ''
  },
  {
    partyId: 4,
    title: 'Galbi',
    guestId: 17,
    categoryId: 1,
    description: ''
  },
  {
    partyId: 4,
    title: 'Beer',
    categoryId: 1,
    description: ''
  },
  {
    partyId: 4,
    title: 'Veggies',
    categoryId: 1,
    description: ''
  },
  {
    partyId: 4,
    title: 'Apple Pie',
    categoryId: 1,
    guestId: 19,
    description: ''
  },
  {
    partyId: 4,
    title: 'Chicken Wings',
    categoryId: 1,
    description: ''
  },
  {
    partyId: 5,
    title: 'Tortillas',
    categoryId: 1,
    guestId: 29,
    description: ''
  },
  {
    partyId: 5,
    title: 'Ground Beef',
    categoryId: 1,
    guestId: 30,
    description: ''
  },
  {
    partyId: 5,
    title: 'Chicken',
    categoryId: 1,
    guestId: 19,
    description: ''
  },
  {
    partyId: 5,
    title: 'Veggies',
    categoryId: 1,
    guestId: 25,
    description: 'Lettuce, tomatos, onions, cilantro'
  },
  {
    partyId: 5,
    title: 'Cerveza',
    categoryId: 1,
    description: ''
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
    guestId: 7
  },
  {
    imageUrl: '/images/images-3.jpg',
    partyId: 2,
    guestId: 8
  },
  {
    imageUrl: '/images/images-4.jpg',
    partyId: 2,
    guestId: 10
  },
  {
    imageUrl: '/images/images-5.jpg',
    partyId: 2,
    guestId: 11
  },
  {
    imageUrl: '/images/images-6.jpg',
    partyId: 2,
    guestId: 11
  },
  {
    imageUrl: '/images/images-7.jpg',
    partyId: 2,
    guestId: 10
  },
  {
    imageUrl: '/images/images-2.jpg',
    partyId: 3,
    guestId: 13
  },
  {
    imageUrl: '/images/images-3.jpg',
    partyId: 3,
    guestId: 13
  },
  {
    imageUrl: '/images/images-4.jpg',
    partyId: 3,
    guestId: 14
  },
  {
    imageUrl: '/images/images-5.jpg',
    partyId: 3,
    guestId: 14
  },
  {
    imageUrl: '/images/images-6.jpg',
    partyId: 3,
    guestId: 16
  },
  {
    imageUrl: '/images/images-7.jpg',
    partyId: 3,
    guestId: 16
  },
  {
    imageUrl: '/images/images-2.jpg',
    partyId: 4,
    guestId: 17
  },
  {
    imageUrl: '/images/images-3.jpg',
    partyId: 4,
    guestId: 19
  },
  {
    imageUrl: '/images/images-4.jpg',
    partyId: 4,
    guestId: 19
  },
  {
    imageUrl: '/images/images-5.jpg',
    partyId: 4,
    guestId: 22
  },
  {
    imageUrl: '/images/images-6.jpg',
    partyId: 4,
    guestId: 22
  },
  {
    imageUrl: '/images/images-7.jpg',
    partyId: 4,
    guestId: 22
  }
]

const reminderData = [
  {
    timeBefore: 3,
    partyId: 1
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

    await Reminder.bulkCreate(reminderData)
    console.log(`Successfully Seeded Reminders`)

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
    await db.query(
      `ALTER SEQUENCE "reminders_id_seq" RESTART WITH ${reminderData.length +
        1};`
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
