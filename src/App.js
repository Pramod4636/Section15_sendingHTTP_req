import React , {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [dummyMovies,setMovies] = useState([]);
  

  return (
    <React.Fragment>
      <section>
        <button>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={dummyMovies} />
      </section>
    </React.Fragment>
  );
}

export default App;
