import React, { useEffect, useState } from "react";
import Error from "../../components/Error";
import Loader from "../../components/Loader";

/* import useRequestData */
import useRequestData from "../../hooks/useRequestData";

const People = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();

  const [page, setPage] = useState(1);

  useEffect(() => {
    makeRequest("https://swapi.dev/api/people/?page=" + page);
  }, [page]);

  return (
    <div>
      <h1>post from jsonplaceholder API</h1>

      {isLoading && <Loader />}

      {error && <Error />}

      {data && (
        <>
          <div className="buttoncon">
          <button onClick={() => setPage(page - 1)}disabled={data.previous ? false : true} >&lt;&lt; vis forrige</button>
            {
              [ ...Array(Math.ceil(data.count / data.results.length)) ].map((x,i) =><button onClick={() => setPage( i + 1)}>{i+1}</button>)
            }
            
            <button onClick={() => setPage(page + 1)}disabled={data.next ? false : true} >vis næsteside &gt;&gt;</button>

          </div>

          {/* <button onClick={()=>setPage(page+1)} style={data.next ? {display:"block"}:{display:"none"}}>vis næsteside&gt;&gt;</button>
      <button onClick={()=>setPage(page-1)} style={data.previous ? {display:"block"}:{display:"none"}}>&lt;&lt;vis forrige</button> */}
        </>
      )}
      {
        //slice gør at man kan vælge hvilken data der skal være
        data &&
          data.results.map((p, index) => (
            <article key={index}>
              <h2>
                {p.name} {index}
              </h2>
              <ul>
                <li>height: {p.height}cm</li>
                <li>weight: {p.mass}kg</li>
                <li>identify as: {p.gender}</li>
              </ul>
            </article>
          ))
      }
    </div>
  );
};

export default People;
