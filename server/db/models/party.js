const Sequelize = require('sequelize')
const db = require('../db')

const Party = db.define('party', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  location: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATE
  },
  status: {
    type: Sequelize.ENUM('draft', 'upcoming', 'cancelled', 'completed'),
    defaultValue: 'upcoming'
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/images/default-party.jpg'
  }
})

module.exports = Party
