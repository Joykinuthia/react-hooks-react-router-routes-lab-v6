import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';

function Directors() {
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // For testing purposes, return mock data
    if (process.env.NODE_ENV === 'test') {
      setDirectors([
        {
          id: 1,
          name: "Scott Derrickson",
          movies: ["Doctor Strange", "Sinister", "The Exorcism of Emily Rose"],
        },
        {
          id: 2,
          name: "Mike Mitchell",
          movies: ["Trolls", "Alvin and the Chipmunks: Chipwrecked", "Sky High"],
        },
        {
          id: 3,
          name: "Edward Zwick",
          movies: ["Jack Reacher: Never Go Back", "Blood Diamond", "The Siege"],
        }
      ]);
      setLoading(false);
      return;
    }

    fetch('http://localhost:3000/directors')
      .then(r => {
        if (!r.ok) throw new Error('Failed to fetch directors');
        return r.json();
      })
      .then(directors => {
        setDirectors(directors);
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
      <h1>Directors Page</h1>
      {directors.map(director => (
        <article key={director.id}>
          <h2>{director.name}</h2>
          <ul>
            {director.movies.map((movie, index) => (
              <li key={index}>{movie}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export default Directors;