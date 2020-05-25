import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { AUTH_TOKEN } from '../../constants'
import gql from 'graphql-tag'

const VOTE_MUTATION = gql`
  mutation CreateVote($linkId: Int!) {
    createVote(linkId: $linkId) {
      id
      user {
        id
        email
      }
      link {
        id
        url
        votes {
          edges {
            node {
              user {
                id
              }
            }
          }
        }
      }
    }
  }
`

const Link = props => {
  const authToken = localStorage.getItem(AUTH_TOKEN)
  const [voteLink] = useMutation(VOTE_MUTATION, { onCompleted: () => props.history.push('/') })

  const onVote = e => {
    e.preventDefault()
    voteLink({ variables: { linkId: props.link.id } })
  }

  return (
    <div className='flex mt2 items-start'>
      <div className='flex items-center'>
        <span className='gray'>{props.index + 1}.</span>
        {authToken && (
          <div className='ml1 gray f11' onClick={onVote}>
            ▲
          </div>
        )}
      </div>
      <div className='ml1'>
        <div>
          {props.link.description} ({props.link.url})
        </div>
        <div className='f6 lh-copy gray'>
          {props.link.votes.edges.length} votes | by{' '}
          {props.link.postedBy ? props.link.postedBy.username : 'Anonymous'}{' '}
        </div>
      </div>
    </div>
  )
}

export default Link
