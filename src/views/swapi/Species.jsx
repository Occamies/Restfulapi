import { useEffect, useState } from 'react'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

/* import useRequestData */
import useRequestData from '../../hooks/useRequestData'


const Species = () => {
  const { data, isLoading, error, makeRequest } = useRequestData()
  const [personID, setPersonID] = useState(2)

  useEffect(() => {
    makeRequest("https://swapi.dev/api/people/" + personID )

  }, [personID])

  return (
    <div>
      <h1>Species</h1>

      <input type='number' onInput={(e)=>{ setPersonID(e.target.value)}} placeholder='skriv person id'/>
     

      {isLoading&&<Loader/>}

      {error&&<Error/>}

      {
        //slice gør at man kan vælge hvilken data der skal være
        data && 

          <article>
            <h2>{data.name}</h2>
  
          </article>
      

      }
    </div>
  )
}

export default Species