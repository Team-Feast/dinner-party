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
    type: Sequelize.STRING
  },
  location: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATE
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/images/default-party.jpg'
  }
})

module.exports = Party
