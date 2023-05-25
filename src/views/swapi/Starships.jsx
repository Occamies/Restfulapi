import React, { useEffect } from 'react'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

import useRequestData from '../../hooks/useRequestData'

const Starships = () => {

  const {data, isLoading, error, makeRequest} = useRequestData()

  useEffect(()=>{
    makeRequest("https://swapi.dev/api/starships")
  },[])

  return (
    <div>
      <h1>Starships</h1>
      {isLoading&&<Loader/>}
      {error&&<Error/>}
      {
        data&&data.results.slice(0,10).map((s, index)=>
        <article key={index}>
          <h2>{s.name}</h2>
          <ul>
            <li>{s.model}</li>
            <li>{s.max_atmosphering_speed} Mph</li>
            <li>{s.length}m</li>
            <li>{s.starship_class}</li>
            <li>{s.cost_in_credits} credits</li>

          </ul>

        </article>
        )
      }
      

    </div>
  )
}

export default Starships