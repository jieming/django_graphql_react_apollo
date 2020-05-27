import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import LinkList from './links/LinkList'
import { useQuery } from '@apollo/react-hooks'
import { useDispatch } from 'react-redux'
import { gql } from 'apollo-boost'
import { withAuth } from './auth/withAuth'

const CURRENT_USER_QUERY = gql`
  {
    currentUser {
      id
      email
      username
    }
  }
`

const AuthenticatedApp = props => {
  const { data } = useQuery(CURRENT_USER_QUERY)
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      dispatch({ type: 'LOAD_USER_DATA', user: data.currentUser })
    }
  }, [data, dispatch])

  return <Route exact path='/' component={LinkList} />
}

export default withAuth(AuthenticatedApp)
