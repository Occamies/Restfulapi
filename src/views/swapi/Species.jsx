import React, { useEffect, useState } from 'react'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

/* import useRequestData */
import useRequestData from '../../hooks/useRequestData'


const Species = () => {
  const { data, isLoading, error, makeRequest } = useRequestData()

  const [page, setPage] = useState(1)

  useEffect(() => {
    makeRequest("https://swapi.dev/api/species" )

  }, [page])

  return (
    <div>
      

      <h1>post from jsonplaceholder API</h1>

      {isLoading&&<Loader/>}

      {error&&<Error/>}

      {
        //slice gør at man kan vælge hvilken data der skal være
        data && data.results.map( (p, index) => 

          <article key={index}>
            <h2>{p.name}</h2>
  
          </article>
      )

      }
    </div>
  )
}

export default Species