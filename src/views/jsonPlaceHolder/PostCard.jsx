import React from 'react'
import { Link } from 'react-router-dom'

const PostCard = ({posts}) => {
  return (
    <article key={posts.id}>
          <p >{posts.title}</p>
          {/* <p> {posts.body}</p> */}
          <Link to={"/post/" + posts.id}>Læs mere</Link>
    </article>
  )
}

export default PostCard