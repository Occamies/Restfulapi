import React, { useEffect, useState } from "react";

import Error from "../../components/Error";

import Loader from "../../components/Loader";

import useRequestData from "../../hooks/useRequestData";

const FreeToPlay = () => {
  const [tag, setTag] = useState("shooter");

  const [platform, setPlatform] = useState("browser"); //init request-hook

  const { data, isLoading, error, makeRequest } = useRequestData();

  const catArr = [
    "mmorpg",
    "shooter",
    "strategy",
    "moba",
    "racing",
    "sports",
    "social",
    "sandbox",
    "open-world",
    "survival",
    "pvp",
    "pve",
    "pixel",
    "voxel",
    "zombie",
    "turn-based",
    "first-person",
    "third-Person",
    "top-down",
    "tank",
    "space",
    "sailing",
    "side-scroller",
    "superhero",
    "permadeath",
    "card",
    "battle-royale",
    "mmo",
    "mmofps",
    "mmotps",
    "3d",
    "2d",
    "anime",
    "fantasy",
    "sci-fi",
    "fighting",
    "action-rpg",
    "action",
    "military",
    "martial-arts",
    "flight",
    "low-spec",
    "tower-defense",
    "horror",
    "mmorts",
  ];

  const platArr = ["pc", "browser", "all"];

  useEffect(() => {
    searchGame()
  }, [tag, platform])
  


  const searchGame = (e) => {

    makeRequest(
      "https://free-to-play-games-database.p.rapidapi.com/api/filter",

      {
        "X-RapidAPI-Key": process.env.React_APP_RAPIDAPIKEY,
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
      {
        tag: tag,
        platform: platform,
      }
    );
  };

  return (
    <>
      <h1>Free To Play</h1>

      {isLoading && <Loader />}
      {error && <Error />}

      <select name="category" id="category" onChange={(e)=>{setTag(e.target.value)}}>
        {data && catArr.map((c, index) => 
        <option key={index} value={c}>{c}</option>)}
      </select>

      <select name="platform" id="platform" onChange={(e)=>{setPlatform(e.target.value)}} >
        {data && platArr.map((p, index) => 
        <option key={index} value={p}>{p}</option>)}
      </select>

      {data &&
        data.map((g) => (
          <article key={g.id}>
            <h2>{g.title}</h2>
            <img src={g.thumbnail} alt={g.title} />
            <p>{g.short_description}</p>
            <a href={g.game_url}></a>
          </article>
        ))}
    </>
  );
};

export default FreeToPlay;
