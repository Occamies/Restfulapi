import React, { useEffect, useState } from 'react'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

import uparrow from "../../assets/uparrow.png"


/* import useRequestData */
import useRequestData from '../../hooks/useRequestData'


const CurrentWeather = () => {
  const { data, isLoading, error, makeRequest } = useRequestData()

  const [zipcode, setZipcode] = useState(1000)

  useEffect(() => {
    makeRequest("https://api.openweathermap.org/data/2.5/weather?zip="+zipcode+",dk&units=metric&appid=c9a6ba5d1e18e049c6d6c41940c1bfc9")

  }, [zipcode])
  
  const handleFormSubmit = (e) => {
    e.preventDefault()
    const input = e.target[0].value
    if (input.length === 4) {
      setZipcode(input)
    }
  }


  return (
    <div>

      <h1>CurrentWeather</h1>

      {isLoading&&<Loader/>}

      {error&&<Error/>}

      <p>postnummer</p>
      <form onSubmit={handleFormSubmit}>
        <input type="number" placeholder='1234'/>
      </form>

      {
        //slice gør at man kan vælge hvilken data der skal være
        data && <article>
          {data.name} <img src={"https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"} alt="" />
          <ul>
            <li>tempratur {Math.round(data.main.temp)}&deg;C</li>
            <li>luftfugtighed {Math.round(data.main.humidity)}&deg;%</li>
            <li>vindhastighed{(data.wind.speed)}m/s</li>
            <li>vindstød{(data.wind.gust)}m/s</li>
            <li>vindretning {(data.wind.deg)} <span style={{display: "inline-block", transform:"rotate("+data.wind.deg+"deg)"}}>↑</span></li>
            <li>sol op kl: {new Date(data.sys.sunrise * 1000).toLocaleTimeString([],{hour:"2-digit", minute:"2-digit"})}</li>
            <li>sol ned kl: {new Date(data.sys.sunset * 1000).toLocaleTimeString([],{hour:"2-digit", minute:"2-digit"})}</li>
          </ul>

        </article>


      

      }
    </div>
  )
}

export default CurrentWeather