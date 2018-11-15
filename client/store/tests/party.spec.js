import {expect} from 'chai'
import {fetchParty} from '../party'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

describe('fetchParty', () => {
  let store
  let mockAxios

  const middlewares = [thunkMiddleware]
  const mockStore = configureMockStore(middlewares)

  const initialState = {}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('describe fetchParty ', () => {
    it('eventually dispatches the fetchParty action', async () => {
      const party = {description: "Mu ciroono id zu noj douhu riwig kusgokow potji kemmadguz wefamij jacef pitumwah hecso neido fi komihjar wofa., description: 200"}
      mockAxios.onGet('/api/parties/2').replyOnce(200, party)
      await store.dispatch(fetchParty())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('SET_PARTY')
      expect(actions[0].products).to.be.deep.equal(party)
    })
  })
})
