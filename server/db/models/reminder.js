const Sequelize = require('sequelize')
const db = require('../db')

const Reminder = db.define('reminder', {
  name: {
    type: Sequelize.STRING
  },
  notificationType: {
    type: Sequelize.ENUM('email', 'text', 'both'),
    defaultValue: 'email'
  },
  timeBefore: {
    type: Sequelize.INTEGER,
    defaultValue: 10
  },
  timeUnit: {
    type: Sequelize.ENUM('days', 'weeks', 'hours', 'minutes'),
    defaultValue: 'days'
  }
})

module.exports = Reminder
