import React, { useEffect } from 'react'
import Error from '../../components/Error'
import Loader from '../../components/Loader'
import PostCard from './PostCard'

/* import useRequestData */
import useRequestData from '../../hooks/useRequestData'


const Posts = () => {
  const { data, isLoading, error, makeRequest } = useRequestData()

  useEffect(() => {
    makeRequest("https://jsonplaceholder.typicode.com/posts")

  }, [])
  
  console.log(data, isLoading, error)

  return (
    <div>

      <h1>post from jsonplaceholder API</h1>

      {isLoading&&<Loader/>}

      {error&&<Error/>}

      {
        //slice gør at man kan vælge hvilken data der skal være
        data && data.slice(0,3).map( posts => 

          <PostCard posts = {posts}  key={posts.id}/>
          /* 
          <article key={posts.id}>
          <p >{posts.title}</p>
          <p> {posts.body}</p>
          </article> 
          */
      )

      }
    </div>
  )
}

export default Posts