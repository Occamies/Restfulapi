import React, { useEffect, useState } from "react";
import Error from "../../components/Error";
import Loader from "../../components/Loader";

import LeafletMap from "../../components/leaflet/LeafletMap";

/* import useRequestData */
import useRequestData from "../../hooks/useRequestData";

const Pollution = () => {
  /* request hook open weather */
  const { data, isLoading, error, makeRequest } = useRequestData();
  /* request hook Dawa */
  const {
    data: dataDawa,
    isLoading: loadingDawa,
    error: errorDawa,
    makeRequest: makeRequestDawa,
  } = useRequestData();

  const [zipcode, setZipcode] = useState(8210);
  var lat = 13;
  var lon = 56;

  useEffect(() => {
    
    
    if (zipcode.length === 4 && !isNaN(zipcode)) {
      lat = dataDawa[0].postnummer.visueltcenter_x
      lon = dataDawa[0].postnummer.visueltcenter_y
      makeRequest(
        "http://api.openweathermap.org/data/2.5/air_pollution?lat="+lat+"&lon="+lon+"&appid="+process.env.React_APP_WEATHERAPIKEY
      );
      
    } else {
      makeRequestDawa(
        "https://api.dataforsyningen.dk/postnumre/autocomplete?q=" + zipcode
      ); 
    }
  }, [zipcode]);


  const changedata = (e)=> {
    setZipcode(e.target.value)
    
  }

  return (
    <div>
      <h1>current Pollution</h1>

      {isLoading && <Loader />}

      {error && <Error />}

      <p>postnummer</p>
      <form onChange={(e) =>changedata(e) }>
        <input
          list="zipcodeinputs"
          type="text"
          placeholder="1234"
          autoComplete="off"
        />
         <datalist id="zipcodeinputs">
          {dataDawa &&
            dataDawa.map((a) => (
              <option key={a.postnummer.nr} value={a.postnummer.nr}>{a.tekst}</option>
            ))}
        </datalist> 
      </form>


      {
        //slice gør at man kan vælge hvilken data der skal være
        data && (
          <article>
            { dataDawa && <h1>
              {dataDawa[0].tekst}
            </h1>
            }
            <ul>
            <li>{Math.round( dataDawa[0].postnummer.visueltcenter_x)}</li>
            <li>{Math.round( dataDawa[0].postnummer.visueltcenter_y)}</li>
            <li>{data.list[0].components.nh3} nh3</li>
            <li>{data.list[0].components.co} co</li>
            <li>{data.list[0].components.no} no</li>
            <li>{data.list[0].components.no2} no2</li>
            <li>{data.list[0].components.o3} o3</li>
            <li>{data.list[0].components.pm2_5} pm2_5</li>
            <li>{data.list[0].components.pm10}pm_10</li>
            <li>{data.list[0].components.so2} so2</li>
            </ul>
       
          </article>
        )
      }
      {
        dataDawa && 
       <>
        <LeafletMap coords={[dataDawa[0].postnummer.visueltcenter_y, dataDawa[0].postnummer.visueltcenter_x]}/>
        </>
      }
    </div>
  );
};

export default Pollution;
