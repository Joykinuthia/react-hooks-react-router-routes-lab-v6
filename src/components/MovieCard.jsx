import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <h2>{movie.title}</h2>
      <Link to={`/movie/${movie.id}`} data-testid={`movie-link-${movie.id}`}>View Info</Link>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired
};

export default MovieCard;