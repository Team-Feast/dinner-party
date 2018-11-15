import React from 'react'
import userTest from './components/user/userTest'

import {Navbar} from './components'
import Routes from './routes'
import UserTest from './components/user/userTest'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <UserTest />
    </div>
  )
}

export default App
