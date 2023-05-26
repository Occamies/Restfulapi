import logo from './logo.svg';
import "@picocss/pico"
import './App.scss';

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Layout from './layout/Layout';
import LayoutAdmin from './layout/admin/LayoutAdmin';
import Home from "./views/Home"
import HomeAdmin from "./views/admin/HomeAdmin"
import NotFound from "./views/NotFound"
import Posts from './views/jsonPlaceHolder/Posts';
import Post from './views/jsonPlaceHolder/Post';
/* starwars */
import People from './views/swapi/People';
import Starships from './views/swapi/Starships';
import Species from './views/swapi/Species';
/* news */
import News1 from './views/newsApi/News1';
import News2 from './views/newsApi/News2';

//routing

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      {/*public */}
      <Route path='/' element={<Layout/>}>
        {/* posts */}
        <Route index element={<Home/>}/>
        <Route path='/Posts' element={<Posts/>}/>
        {/* post/id hvor id ikke er en del af linket */}
        <Route path='/Post/:id' element={<Post/>}/>
        <Route path='*' element={<NotFound/>}/>
        
        {/* swapi */}
        <Route path='/People' element={<People/>}/>
        <Route path='/Starships' element={<Starships/>}/>
        <Route path='/Species' element={<Species/>}/>
        {/* news */}
        <Route path='/News1' element={<News1/>}/>
        <Route path='/News2' element={<News2/>}/>
        


      </Route>

        {/*admin */}   
        <Route path='/admin' element={<LayoutAdmin/>}>
        <Route index element={<HomeAdmin/>}/>
        <Route path='*' element={<NotFound/>}/>
        </Route>
      </>
    )
  )

  return (
    <main className='container'> 
      <RouterProvider router={router} />
  
    </main>
  );
}

export default App;
