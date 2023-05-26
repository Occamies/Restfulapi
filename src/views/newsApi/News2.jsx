import React, { useEffect, useState } from 'react'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

/* import useRequestData */
import useRequestData from '../../hooks/useRequestData'

const News2 = () => {

  const categoryARR = ["business","entertainment","general","health","science","sports","technology"]

  const { data, isLoading, error, makeRequest } = useRequestData()

  const [news, setNews] = useState("bitcoin");
  const [category, setCategory] = useState("bitcoin");

  /* "&q="+news+ */
  useEffect(() => {
    makeRequest("https://newsapi.org/v2/top-headlines?country=us&category="+category+"&apikey="+process.env.REACT_APP_NEWSAPIKEY)
    

    console.log(news)

  }, [news,category])
  return (
    <div>

      {isLoading&&<Loader/>}

      {error&&<Error/>}

<form onSubmit={(e)=>{e.preventDefault(); setNews(e.target[0].value)}}>
      <input type="text"/>
</form>


{
  data && categoryARR.map((c)=>
  <button onClick={()=>{setCategory(c)}}>{c}</button>
  )
}
      {
        data && data.articles.map((n)=>
          <article>
            <h2>{n.title}</h2>
            <p>{n.description}...<a href={n.url} target="_blank">Læs mere</a></p>
            {
              n.urlToImage ?<img src={n.urlToImage} alt="Foto" width={700} />:null
            }
          </article>
        )
      }
    </div>
  )
}

export default News2