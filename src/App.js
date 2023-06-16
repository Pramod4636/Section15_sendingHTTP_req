import React , {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMovies] = useState([]);
  const [isLoading ,setIsLoading]  = useState(false);
  const [error , setError] = useState(null);

async function fetchMoviesHandler (){
  setError("null");
  setIsLoading(true);
 
  try{

  
  const response = await fetch('https://swapi.dev/api/film') ; // URL wrong then json convert karata error 
  
  if(!response.ok){
     throw new Error('Something is wrong ');
  }
  
  const data = await response.json();


  const transformedMovies = data.results.map( movieData => {
      return {id : movieData.episode_id ,
          title : movieData.title ,
          openingText : movieData.opening_crawl,
          releaseDate : movieData.release_data
      }
    }) ;
  
   setMovies(transformedMovies);
   setIsLoading(false);
  } 
  catch(error)
  {
      setError(error.message);
  }
  
}

let content = <p> Found no movies </p> ; 

if (isLoading )
{
  content = <p>Loading ....</p>
}
if(movies.length === 0 )
{
   content = <p> no movies found </p>
}
if(movies.length > 0  )
{
   content = <MoviesList movies = {movies} />  ;  
}

if(error) 
{
  content = <p> {error}</p>
}



  return (
    <React.Fragment>
      <section>
        <button onClick={ fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content} 
      </section>
    </React.Fragment>
  );
}

export default App;
