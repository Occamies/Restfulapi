import React, { useEffect, useState } from 'react'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

/* import useRequestData */
import useRequestData from '../../hooks/useRequestData'

const Hobby = () => {

  const { data, isLoading, error, makeRequest } = useRequestData()

  useEffect(() => {
    handleNewHobby()
    //eslint-disable-next-line
  }, [])
  
  const handleNewHobby = ()=>{
  makeRequest("https://hobbies-by-api-ninjas.p.rapidapi.com/v1/hobbies",
    {
      "X-RapidAPI-Key":"54d9b55007msh02b07909ec7dcbep182911jsn698187f97374",
      "X-RapidAPI-Host":'hobbies-by-api-ninjas.p.rapidapi.com'
    }
    )
  }
  

  return (
      <div>

      <h1>RapidAPI- Hobby apininja - få en tilfældig hobby!</h1>

      {isLoading&&<Loader/>}

      {error&&<Error/>}

      {
        //slice gør at man kan vælge hvilken data der skal være
        data && 
          <article key={data.id}>
          <p >{data.hobby}</p>
          <a href={data.link} target='_blank' rel='noreferrer'>læs mere</a>

          </article> 
  
    }
    <button onClick={()=>{handleNewHobby()}}>giv mig en ny hobby</button>
    </div>
  )
}

export default Hobby