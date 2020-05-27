import React from 'react'
import Link from './Link'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const LINKS_QUERY = gql`
  {
    links {
      id
      description
      url
      postedBy {
        id
        username
        email
      }
      votes {
        edges {
          node {
            id
            user {
              id
              email
            }
          }
        }
      }
    }
  }
`

const LinkList = props => {
  const { loading, error, data } = useQuery(LINKS_QUERY)

  if (loading) return <div>Loading....</div>

  if (error) return <div>Error!</div>

  return data.links.map((link, index) => (
    <Link key={link.id} link={link} index={index} {...props} />
  ))
}

export default LinkList
