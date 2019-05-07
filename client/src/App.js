import React, { Component } from 'react';
import axios from 'axios';
import {Route} from "react-router-dom";

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      savedList: [],
      movies: []
    };
  }

  componentDidMount() {
    axios
    .get('http://localhost:5000/api/movies')
    .then(response => {
      let savedList = [];
      let movies = response.data;
      localStorage.getItem("SavedMovies").split(" ")
      .forEach(x=> {
        let i = parseInt(x,10);
        if(i >= 0 && i < movies.length)  
          savedList.push(movies[i]);
        })
      this.setState(() => ({ movies: movies, savedList: savedList }));
    })
    .catch(error => {
      console.error('Server Error', error);
    });
  }


  addToSavedList = movie => {
    let savedList = this.state.savedList;
    console.log(movie.id);
    if(savedList.filter(x=> x.id === movie.id).length >= 1) savedList = savedList.filter(x=> x.id!==movie.id);
    else savedList.push(movie);
    savedList = savedList.sort((a,b) => a.title>=b.title ? 1 : -1);
    localStorage.setItem("SavedMovies", savedList.map(x=> x.id).join(" "))
    this.setState({ savedList });
  };

  isSaved = movie => this.state.savedList.includes(movie);

  render() {
    return (
      <div>
        <SavedList list={this.state.savedList} />
        <Route path="/" component={MovieList} exact/>
        <Route path="/Movies/:id" render={props=> <Movie {...props} addToSavedList={movie=>this.addToSavedList(movie)} saved={movie=>this.isSaved(movie)}/>}  />
      </div> 
    );
  }
}
