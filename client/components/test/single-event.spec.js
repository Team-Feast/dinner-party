import React from 'react'
import {expect} from 'chai'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import SingleParty from '../SingleParty'

const adapter = new Adapter()
enzyme.configure({adapter})

xdescribe('SingleParty', () => {
  let singlePartyData, partyWrapper

  it('includes description, location', () => {
    singlePartyData = {
      description:
        'Mu ciroono id zu noj douhu riwig kusgokow potji kemmadguz wefamij jacef pitumwah hecso',
      location: 'Uceritic ta nimzenvo jima ka.'
    }
    // creates the testable React component
    partyWrapper = shallow(<SingleParty data={singlePartyData} />)

    expect(partyWrapper.find('p')).to.have.html(
      '<p>Mu ciroono id zu noj douhu riwig kusgokow potji kemmadguz wefamij jacef pitumwah hecso</p>'
    )

    expect(partyWrapper.find('h6')).to.have.html(
      '<h6>Uceritic ta nimzenvo jima ka.</h6>'
    )
  })
})
