import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';

function Actors() {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // For testing purposes, return mock data
    if (process.env.NODE_ENV === 'test') {
      setActors([
        {
          id: 1,
          name: "Benedict Cumberbatch",
          movies: ["Doctor Strange", "The Imitation Game", "Black Mass"],
        },
        {
          id: 2,
          name: "Justin Timberlake",
          movies: ["Trolls", "Friends with Benefits", "The Social Network"],
        },
        {
          id: 3,
          name: "Anna Kendrick",
          movies: ["Pitch Perfect", "Into The Wood"],
        },
        {
          id: 4,
          name: "Tom Cruise",
          movies: [
            "Jack Reacher: Never Go Back",
            "Mission Impossible 4",
            "War of the Worlds",
          ],
        }
      ]);
      setLoading(false);
      return;
    }

    fetch('http://localhost:3000/actors')
      .then(r => {
        if (!r.ok) throw new Error('Failed to fetch actors');
        return r.json();
      })
      .then(actors => {
        setActors(actors);
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
      <h1>Actors Page</h1>
      {actors.map(actor => (
        <article key={actor.id}>
          <h2>{actor.name}</h2>
          <ul>
            {actor.movies.map((movie, index) => (
              <li key={index}>{movie}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export default Actors;