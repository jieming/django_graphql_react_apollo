import React from 'react'
import { AUTH_TOKEN } from '../../constants'

export const withAuth = WrappedComponent => props => {
  const authToken = localStorage.getItem(AUTH_TOKEN)

  return authToken ? <WrappedComponent {...props} /> : null
}
