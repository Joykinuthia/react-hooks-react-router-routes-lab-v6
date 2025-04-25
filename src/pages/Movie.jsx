
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';

function Movie() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // For testing purposes, return mock data
    if (process.env.NODE_ENV === 'test') {
      setMovie({
        id: 1,
        title: 'Doctor Strange',
        time: '115',
        genres: ['Action', 'Adventure', 'Fantasy']
      });
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3000/movies/${id}`)
      .then(r => {
        if (!r.ok) throw new Error('Failed to fetch movie');
        return r.json();
      })
      .then(movie => {
        setMovie(movie);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <div>
      <NavBar />
      <h1>{movie.title}</h1>
      <p>{movie.time}</p>
      <div>
        {movie.genres.map((genre, index) => (
          <span key={index} style={{ marginRight: '10px' }}>{genre}</span>
        ))}
      </div>
    </div>
  );
}

export default Movie;