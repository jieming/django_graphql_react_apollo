import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { AUTH_TOKEN } from '../../constants'
import gql from 'graphql-tag'

const LOGIN_MUTATION = gql`
  mutation tokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`

const CREATE_USER_MUTATION = gql`
  mutation createUser($username: String!, $password: String!, $email: String!) {
    createUser(username: $username, password: $password, email: $email) {
      user {
        id
        username
        email
      }
    }
  }
`

const Login = props => {
  const [login, updateLogin] = useState(true)
  const [email, updateEmail] = useState('')
  const [password, updatePassword] = useState('')
  const [username, updateUsername] = useState('')

  const [userLogin] = useMutation(LOGIN_MUTATION, {
    onCompleted: payload => {
      localStorage.setItem(AUTH_TOKEN, payload.tokenAuth.token)
      props.history.push('/')
    },
  })
  const [userSignUp] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: () => {
      updateLogin(!login)
      updatePassword('')
    },
  })

  const confirmLoginOrSignUp = e => {
    e.preventDefault()
    login
      ? userLogin({ variables: { username, password } })
      : userSignUp({ variables: { username, password, email } })
  }

  return (
    <>
      <h4 className='mv3'>{login ? 'Login' : 'Sign Up'}</h4>
      <div className='flex flex-column'>
        {!login && (
          <input
            value={email}
            onChange={e => updateEmail(e.target.value)}
            type='text'
            placeholder='Your email address'
          />
        )}
        <input
          value={username}
          onChange={e => updateUsername(e.target.value)}
          type='text'
          placeholder='Your username'
        />

        <input
          value={password}
          onChange={e => updatePassword(e.target.value)}
          type='password'
          placeholder='Your password'
        />
      </div>
      <div className='flex mt3'>
        <div className='pointer mr2 button' onClick={confirmLoginOrSignUp}>
          {login ? 'Login' : 'Create account'}
        </div>
        <div className='pointer button' onClick={() => updateLogin(!login)}>
          {login ? 'Need to create an account?' : 'Already have an account?'}
        </div>
      </div>
    </>
  )
}

export default Login
