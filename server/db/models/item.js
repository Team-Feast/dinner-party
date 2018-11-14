const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: Sequelize.TEXT
  // quantity: {
  //   type: Sequelize.INTEGER,
  //   defaultValue: 0,
  //   validate: {
  //     min: 0
  //   }
  // }
})

module.exports = Item
