import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LinkList from './links/LinkList'
import CreateLink from './links/CreateLink'
import Header from './header/Header'
import Login from './auth/Login'

const App = props => (
  <div className='center w85'>
    <Header />
    <div className='ph3 pv1 background-gray'>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/' component={LinkList} />
        <Route exact path='/create' component={CreateLink} />
      </Switch>
    </div>
  </div>
)

export default App
