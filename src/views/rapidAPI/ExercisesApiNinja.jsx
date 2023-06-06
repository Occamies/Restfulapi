import React, { useEffect, useState } from 'react'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

/* import useRequestData */
import useRequestData from '../../hooks/useRequestData'

const ExercisesApiNinja = () => {

  const typeArr = [' ','cardio','olympic_weightlifting','plyometrics','powerlifting','strength','stretching','strongman']
  const muscleArr = [' ','abdominals','abductors','adductors','biceps','calves','chest','forearms','glutes','hamstrings','lats','lower_back','middle_back','neck','quadriceps','traps','triceps',
  ]
  const diffArr=[' ','beginner','intermediate','expert',
  ]

  const { data, isLoading, error, makeRequest } = useRequestData();

  const [type, setType] = useState();
  const [difficulty, setDifficulty] = useState();
  const [muscle, setMuscle] = useState();
  

  useEffect(() => {
    newExercise()
    
  }, [type,difficulty,muscle]);

  const newExercise = (e)=>{

    makeRequest("https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises",
    {
      "X-RapidAPI-Key":"",
      "X-RapidAPI-Host":'exercises-by-api-ninjas.p.rapidapi.com'
    },
    {
      "difficulty":difficulty,
      "type":type,
      "muscle":muscle
    }
    );
  }

  return (
    <div>
    <h1>Spoonacular</h1>

    {isLoading && <Loader />}

    {error && <Error />}
    <p>type of exercise</p>
    <select name="type" id="typeArr" onChange={(e)=>{setType(e.target.value)}}>
    { data && typeArr.map((t)=>
        <option value={t}>{t}</option>
      )    
    }
    </select>
    <p>Muscle group</p>
    <select name="muscle" id="muscleArr" onChange={(e)=>{setMuscle(e.target.value)}}>
    { data && muscleArr.map((m)=>
        <option value={m}>{m}</option>
      )    
    }
      </select>
    
    <p>Difficulty</p>
    <select name="diffArr" id="diffArr" onChange={(e)=>{setDifficulty(e.target.value)}}>
    { data && diffArr.map((d)=>
        <option value={d}>{d}</option>
      )    
    }
      </select>

      {
        data && data.map((e)=>
        <article className='exerciseCon'> 
          <h2>{e.name}</h2>
          <ul>
            <li>type of exercise: {e.type}</li>
            <li>what muscle it hits: {e.muscle}</li>
            <li>what equipment to use: {e.equipment}</li>
            <li>how hard it is: {e.difficulty}</li>
            <li className='text-container'>{e.instructions}</li>
          </ul>

        </article>
        )
      }


    
  </div>
  )
}

export default ExercisesApiNinja