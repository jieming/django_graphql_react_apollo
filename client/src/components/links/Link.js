import React from 'react'

const Link = props => {
  const renderPostedBy = link => (link.postedBy?.email ? ` | ${link.postedBy.email}` : '')

  return (
    <div>
      <div>
        {props.link.description} | ({props.link.url}) {renderPostedBy(props.link)}
      </div>
    </div>
  )
}

export default Link
