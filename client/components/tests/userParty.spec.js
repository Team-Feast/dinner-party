import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SingleParty from '../SingleParty'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SingleParty', () => {
  let userHome

  beforeEach(() => {
    userHome = shallow(<SingleParty title="This will be a big party" />)
  })

  // it('renders the email in an h3', () => {
  //   expect(userHome.find('h3').text()).to.be.equal('This will be a big party')
  // })
})
