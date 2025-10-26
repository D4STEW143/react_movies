import React from "react";
import './MovieList.css'
import Movie from "./Movie";

class MovieList extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="movies">
                {
                    this.props.movies.map(
                        movie=>{
                            return <Movie key={movie.imdbID} {...movie}/>
                        }
                    )
                }
            </div>
        )
    }
}

export default MovieList;