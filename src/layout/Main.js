import React from 'react';
import './Main.css';
// import Movie from './components/Movie';
import MovieList from './components/MovieList';
import Preloader from './components/Preloader';

class Main extends React.Component {
   moviesContainerRef = React.createRef();

  state = {
    allMovies: [],        
    displayedMovies: [],  
    loading: true,
    error: null,
    searchQuery: 'matrix',
    currentPage: 1,      
    totalResults: 0,   
    moviesPerPage: 12   
  };

  fetchAllMovies = async (query) => {
    if (!query.trim()) {
		this.setState({ allMovies: [], totalResults: 0, displayedMovies: [], loading: false });
		return;
    }
    this.setState({ loading: true, error: null });
    let allMovies = [];
    let page = 1;
    let total = 0;
    let hasMore = true;

    try {
      while (hasMore && page <= 10) {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=ee8c1054&s=${encodeURIComponent(query)}&page=${page}`
        );
        const data = await response.json();

        if (data.Response === "True") {
          allMovies = [...allMovies, ...data.Search];
          total = parseInt(data.totalResults, 10);
          if (data.Search.length < 10 || allMovies.length >= total) {
            hasMore = false;
          }
          page++;
        } else {
          if (page === 1) {
            throw new Error(data.Error || "Фильмы не найдены");
          }
          break;
        }
      }

      allMovies = allMovies.slice(0, 100);

      this.setState({
        allMovies,
        totalResults: Math.min(total, 100),
        loading: false
      }, () => {
        this.updateDisplayedMovies(1);
        setTimeout(() => {
            this.moviesContainerRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 0);
      });

    } catch (error) {
      console.error("Ошибка загрузки:", error);
      this.setState({
        loading: false,
        error: error.message || "Не удалось загрузить фильмы"
      });
    }
  };

  updateDisplayedMovies = (page) => {
    const { allMovies, moviesPerPage } = this.state;
    const startIndex = (page - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const displayed = allMovies.slice(startIndex, endIndex);

    this.setState({
      displayedMovies: displayed,
      currentPage: page
    });
  };

  componentDidMount() {
    this.fetchAllMovies(this.state.searchQuery);
  }

 handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSearchSubmit = (e) => {
    e.preventDefault();
    if (this.state.searchQuery.trim()) {
      this.fetchAllMovies(this.state.searchQuery.trim());
	  
    }
  };

  handlePageChange =  (newPage) => {
    this.updateDisplayedMovies(newPage);
    setTimeout(() => {
        this.moviesContainerRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 0);
  };

  render() {
    const { displayedMovies, loading, error, currentPage, allMovies, moviesPerPage } = this.state;
    const totalResults = allMovies.length; 
    const totalPages = Math.ceil(totalResults / moviesPerPage);

    return (
      <div className="main">
        <div className="wrap">
          <form onSubmit={this.handleSearchSubmit} className="search-form">
            <input
              type="text"
              value={this.state.searchQuery}
              onChange={this.handleSearchChange}
              placeholder="Поиск фильма..."
              className="search-input"
            />
            <button type="submit" className="search-button">Найти</button>
          </form>

          {error && <div className="error-message">{error}</div>}

          {loading ? (
            <Preloader />
          ) : displayedMovies.length > 0 ? (
            <>
            <div ref={this.moviesContainerRef}/> {}
              <MovieList movies={displayedMovies} />
              {totalResults > moviesPerPage && (
                <div className="pagination">
                  <button
                    onClick={() => this.handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Назад
                  </button>
                  <span>Стр. {currentPage} из {totalPages}</span>
                  <button
                    onClick={() => this.handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                  >
                    Вперёд
                  </button>
                </div>
              )}
            </>
          ) : (
            !loading && <p className="no-results">Фильмы не найдены.</p>
          )}
        </div>
      </div>
    );
  }
}

export default Main;