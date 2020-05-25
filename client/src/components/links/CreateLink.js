import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const CREATE_LINK_MUTATION = gql`
  mutation CreateLink($url: String!, $description: String!) {
    createLink(url: $url, description: $description) {
      link {
        id
        url
        description
      }
    }
  }
`

const CreateLink = props => {
  const [description, updateDescription] = useState('')
  const [url, updateUrl] = useState('')
  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    onCompleted: () => props.history.push('/'),
  })

  const onCreate = e => {
    e.preventDefault()
    createLink({ variables: { url, description } })
    updateDescription('')
    updateUrl('')
  }

  return (
    <>
      <div className='flex flex-column mt3'>
        <input
          className='mb2'
          value={description}
          onChange={e => updateDescription(e.target.value)}
          type='text'
          placeholder='A description for the new link'
        />
        <input
          className='mb2'
          value={url}
          onChange={e => updateUrl(e.target.value)}
          type='text'
          placeholder='The url for the new link'
        />
        <button onClick={onCreate}>Submit</button>
      </div>
    </>
  )
}

export default CreateLink
