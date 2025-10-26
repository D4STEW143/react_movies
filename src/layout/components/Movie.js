import React from 'react';
import './Movie.css'

class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state =
        {
            props: { props }
        }
    }
    render() {
        return (
            <div className='card'>
                <img src={this.props.Poster} alt={this.props.imdbID} />
                <div>
                    <h3>{this.props.Title}</h3>
                    <p>{this.props.Year}<span>{this.props.Type}</span></p>
                </div>
            </div>
        )
    }
}
export default Movie;