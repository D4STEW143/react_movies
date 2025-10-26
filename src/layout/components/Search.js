import React from "react";
import './Search.css';
import Main from "../Main";

class Search extends React.Component{

    onChange(){
        
    }
    render(){
        return(
            <input onChange={this.onChange}></input>
        )
    }
}
export default Search;