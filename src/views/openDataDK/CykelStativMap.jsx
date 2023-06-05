import React, { useEffect, useRef, useState } from 'react'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

/* import useRequestData */
import useRequestData from '../../hooks/useRequestData'

/* paginationcontainer */
import Pagination from '../../components/pagination/Pagination'

/* MAP - Leaflet kort */
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import icon from "leaflet/dist/images/marker-icon.png"

let defaultIcon = L.icon({
  iconUrl: icon,
  iconSize:[24,36],
  iconAnchor: [12,36]
})

L.Marker.prototype.options.icon = defaultIcon


const CykelStativMap = () => {
  const { data, isLoading, error, makeRequest } = useRequestData()

  /* state til håndtering af beregning til pagination (0=side 1) */
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(6)


  /* reference til markers */
  const mapRef = useRef()
  const markersLayerRef = useRef(null)


  useEffect(() => {
    makeRequest("https://admin.opendata.dk/api/3/action/datastore_search?resource_id=0807ae2e-7433-4f73-8b0a-3339ae894eb8")

  }, [])

  
  useEffect(() => {
      if(!mapRef.current) {
      mapRef.current = L.map('mapcontainer').setView([56.15459468768158, 10.20632002679148], 12);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(mapRef.current);
      
      
      //marker
      //.bindpopup er en tekst til markør
      /* var marker = L.marker([56.15459468768158, 10.20632002679148]).addTo(mapRef.current).bindPopup("hello world"); */
      
      //hvis du vil have den til at auto pop op
      //.openPopup();
      
      markersLayerRef.current = L.layerGroup().addTo(mapRef.current)
    }
      
    }, [])
    

  const addMarker = (coord,place)=>{
    L.marker(coord).addTo(markersLayerRef.current).bindPopup(place, {offset: [0,-30]})
  }

  const clearMarkers =()=>{
    markersLayerRef.current.clearLayers()
  }
  

  return (
    <div>

      <h1>bycykel stativer</h1>

      <div id='mapcontainer' style={{width:"600px", height:"600px", margin:"10px"}} >
        kortet loader ....
      </div>

      {isLoading&&<Loader/>}

      {error&&<Error/>}
      
      { data && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} itemsTotal={data.result.records.length} />

      }

      {
        //kald funktionen som sletter tidligere markører(inden de nye laves i map herunder)
        data && clearMarkers()
      }

      {
        //slice gør at man kan vælge hvilken data der skal være
        data && data.result.records.slice(currentPage*itemsPerPage,(currentPage*itemsPerPage)+itemsPerPage).map( c => {
          //lav en marker
          addMarker([c.lat,c.lng],c.place)

          
          return(
          <article key={c._id}>
          <h2>{c.place}</h2>
          <p>{c._id}</p>
          <p><a href={"https://www.google.com/maps/search/?api=1&query="+c.lat +","+c.lng} target='_blank'>se på kortet</a></p>
          </article>
          )
        }
      )

      }

      

    </div>
  )
}

export default CykelStativMap