import React, { useEffect, useState } from 'react'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

/* import useRequestData */
import useRequestData from '../../hooks/useRequestData'

/* paginationcontainer */
import Pagination from '../../components/pagination/Pagination'


const CykelStativ = () => {
  const { data, isLoading, error, makeRequest } = useRequestData()

  /* state til håndtering af beregning til pagination (0=side 1) */
  const [currentPage, setCurrentPage] = useState(0)
  
  const [itemsPerPage, setItemsPerPage] = useState(6)


  useEffect(() => {
    makeRequest("https://admin.opendata.dk/api/3/action/datastore_search?resource_id=0807ae2e-7433-4f73-8b0a-3339ae894eb8")

  }, [])
  

  return (
    <div>

      <h1>bycykel stativer</h1>

      {isLoading&&<Loader/>}

      {error&&<Error/>}
      
      { data && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} itemsTotal={data.result.records.length} />

      }

      {
        //slice gør at man kan vælge hvilken data der skal være
        data && data.result.records.slice(currentPage*itemsPerPage,(currentPage*itemsPerPage)+itemsPerPage).map( c => 
          <article key={c._id}>
          <h2>{c.place}</h2>
          <p>{c._id}</p>
          <p><a href={"https://www.google.com/maps/search/?api=1&query="+c.lat +","+c.lng} target='_blank'>se på kortet</a></p>
          </article>
      )

      }
    </div>
  )
}

export default CykelStativ