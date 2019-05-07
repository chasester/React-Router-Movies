import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MovieCard from './MovieCard';


export default class MovieList extends Component {
/*   constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  } */

  render() {
    return (
      <div className="movie-list">
        {this.props.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} id={movie.id} />
        ))}
      </div>
    );
  }
}

function MovieDetails({ movie, id }) {
  return (
    <Link to={`/movies/${id}`}>
    <MovieCard movie={movie}/>
    </Link>
  );
}
