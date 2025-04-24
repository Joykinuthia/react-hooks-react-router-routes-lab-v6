import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import MovieCard from '../components/MovieCard';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // For testing purposes, return mock data
    if (process.env.NODE_ENV === 'test') {
      setMovies([
        { id: 1, title: 'Doctor Strange' },
        { id: 2, title: 'Trolls World Tour' },
        { id: 3, title: 'Black Panther' }
      ]);
      setLoading(false);
      return;
    }

    fetch('http://localhost:3000/movies')
      .then(r => {
        if (!r.ok) throw new Error('Failed to fetch movies');
        return r.json();
      })
      .then(movies => {
        setMovies(movies);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <NavBar />
      <h1>Home Page</h1>
      <div className="movie-list">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;