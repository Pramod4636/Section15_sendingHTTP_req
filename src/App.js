import React , {useState , useEffect , useCallback } from 'react';
import AddMovie from './components/AddMovie';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMovies] = useState([]);
  const [isLoading ,setIsLoading]  = useState(false);
  const [error , setError] = useState(null);




const  fetchMoviesHandler  = useCallback (  async  () => {
  setError(null);
  setIsLoading(true);
  try{

  
  const response = await fetch('https://react-http-264e0-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json') ; // URL wrong then json convert karata error 
  
  if(!response.ok){
     throw new Error('Something is wrong ');
  }
  
  const data = await response.json();
 
  const loadedMovies = [];

  console.log(data);
  
  for(const key in data ) {
     loadedMovies.push({
      id : key , 
      title : data[key].title,
      openingText : data[key].openingText ,
      releaseDate : data[key].releaseDate 
     })
  }
 
  
   setMovies(loadedMovies);
   setIsLoading(false);
  } 
  catch(error)
  {
      setError(error.message);
  }
  
} ,[] ) ;


useEffect( ()=> {
  fetchMoviesHandler();
} 
, [fetchMoviesHandler]) ; 


 async function addMovieHandler(movie) {
    
   const response = await fetch( 'https://react-http-264e0-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json' , {
      method : 'POST',
      body : JSON.stringify(movie),
      headers : {
        'content-Type' : 'application/json'
      }      
    }) ;

    const data = await  response.json();

    console.log(data);

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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
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
