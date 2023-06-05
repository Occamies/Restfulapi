import React, { useEffect, useState } from "react";
import Error from "../../components/Error";
import Loader from "../../components/Loader";

import LeafletMap from "../../components/leaflet/LeafletMap";

/* import useRequestData */
import useRequestData from "../../hooks/useRequestData";

const CurrentWeatherDawaMap = () => {
  /* request hook open weather */
  const { data, isLoading, error, makeRequest } = useRequestData();
  /* request hook Dawa */
  const {
    data: dataDawa,
    isLoading: loadingDawa,
    error: errorDawa,
    makeRequest: makeRequestDawa,
  } = useRequestData();

  const [zipcode, setZipcode] = useState(8000);

  useEffect(() => {
    if (zipcode.length === 4 && !isNaN(zipcode)) {
      makeRequest(
        "https://api.openweathermap.org/data/2.5/weather?zip=" +
          zipcode +
          ",dk&units=metric&appid=c9a6ba5d1e18e049c6d6c41940c1bfc9"
      );
    } else {
      makeRequestDawa(
        "https://api.dataforsyningen.dk/postnumre/autocomplete?q=" + zipcode
      );
    }
  }, [zipcode]);

  return (
    <div>
      <h1>CurrentWeather</h1>

      {isLoading && <Loader />}

      {error && <Error />}

      <p>postnummer</p>
      <form onChange={(e) => setZipcode(e.target.value)}>
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
        data && <LeafletMap coords={[data.coord.lat, data.coord.lon]}/>
      }

      {
        //slice gør at man kan vælge hvilken data der skal være
        data && (
          <article>
            {data.name}{" "}
            <img
              src={
                "https://openweathermap.org/img/wn/" +
                data.weather[0].icon +
                "@2x.png"
              }
              alt=""
              />
            <ul>
              <li>tempratur {Math.round(data.main.temp)}&deg;C</li>
              <li>luftfugtighed {Math.round(data.main.humidity)}&deg;%</li>
              <li>vindhastighed{data.wind.speed}m/s</li>
              <li>vindstød{data.wind.gust}m/s</li>
              <li>
                vindretning {data.wind.deg}{" "}
                <span
                  style={{
                    display: "inline-block",
                    transform: "rotate(" + data.wind.deg + "deg)",
                  }}
                >
                  ↑
                </span>
              </li>
              <li>
                sol op kl:{" "}
                {new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </li>
              <li>
                sol ned kl:{" "}
                {new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </li>
            </ul>
          </article>
        )
      }


    </div>
  );
};

export default CurrentWeatherDawaMap;
