const Sequelize = require('sequelize')
const db = require('../db')
const uuidv1 = require('uuid/v1')

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
  },
  guestPartyToken: {
    type: Sequelize.STRING
  }
})

Guest.beforeCreate((userInstance, optionsObject) => {
  userInstance.guestPartyToken = uuidv1()
})

module.exports = Guest
