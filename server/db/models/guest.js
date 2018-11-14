const Sequelize = require('sequelize')
const db = require('../db')

const Guest = db.define('guest', {
  status: {
    type: Sequelize.ENUM('attending', 'invited', 'declined'),
    defaultValue: 'invited'
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: Sequelize.STRING
  }
})

module.exports = Guest
