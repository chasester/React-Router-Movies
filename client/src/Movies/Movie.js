import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import MovieCard from './MovieCard';

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      redirect: false
    };
  }

  componentDidMount() {
    // change this line to grab the id passed on the URL
    const id = this.props.match.params.id;
    this.fetchMovie(id);
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        if(!response.data || response.data === undefined || response.data === "" || response.data.length === 0) throw Error("Data not found");
        this.setState(() => ({ movie: response.data, redirect: false}));
      })
      .catch(error => {
        this.setState({movie: null, redirect: true});
        console.log(error)
      });
  };
  // Uncomment this code when you're ready for the stretch problems
  componentWillReceiveProps(newProps){
    if(this.props.match.params.id !== newProps.match.params.id){
      this.fetchMovie(newProps.match.params.id);
    }
  }

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie)
  }

  render() {
    if(this.state.redirect) return <Redirect to="/"/>
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }
    
    return (
      <div className="save-wrapper">
       <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>Save</div>
      </div>
    );
  }
}
