
import React, { useEffect } from 'react'
import Error from '../../components/Error'
import Loader from '../../components/Loader'
import { Link, useParams } from 'react-router-dom'

/* import useRequestData */
import useRequestData from '../../hooks/useRequestData'

const Post = () => {

  const { data, isLoading, error, makeRequest } = useRequestData()

  useEffect(() => {
    makeRequest("https://jsonplaceholder.typicode.com/posts/" + id)

  }, [])

  const { id } = useParams()

  return (
    <article>

       {isLoading && <Loader/>}
       {error && <Error/>}

       {data && <>
       <h1>{data.title}</h1>
       <p>{data.body}</p>
       
       </>

       }

       <Link to="/posts">back</Link>

        

    </article>
  )
}

export default Post