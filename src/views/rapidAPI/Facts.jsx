import React, { useEffect, useState } from 'react'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

/* import useRequestData */
import useRequestData from '../../hooks/useRequestData'

const Facts = () => {

  const { data, isLoading, error, makeRequest } = useRequestData()


  const [fact, setFact] = useState()

  useEffect(() => {
    handleNewFact()
    //eslint-disable-next-line
  }, [])
  
  const handleNewFact = ()=>{
  makeRequest("https://facts-by-api-ninjas.p.rapidapi.com/v1/facts",
    {
      "X-RapidAPI-Key":process.env.React_APP_RAPIDAPIKEY,
      "X-RapidAPI-Host":'facts-by-api-ninjas.p.rapidapi.com'
    }
    )
  }
  

  return (
      <div>

      <h1>RapidAPI- facts apininja - få en ligegyldig info!</h1>

      {isLoading&&<Loader/>}

      {error&&<Error/>}

      {
        //slice gør at man kan vælge hvilken data der skal være
        data && data.map( f => 
          <article key={f.id}>
          <p >{f.fact}</p>
          </article> 
      )
    }
    <button onClick={()=>{handleNewFact()}}>giv mig et nyt fact</button>
    </div>
  )
}

export default Facts