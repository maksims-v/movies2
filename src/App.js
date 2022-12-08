import './App.css';
import { movies } from './moviesData';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { moviesFetchingError, get_data } from './moviesSlice/moviesSlice';
import { useHttp } from './hooks/http.hook';
import Header from './components/header/Header';
import MoviList from './components/movieList/MovieList';
import Filter from './components/filter/Filter.jsx';
import MovieDetail from './components/movieDetail/MovieDetail.jsx';
import SearchPage from './components/searchPage/SearchPage';

function App() {
  const { searchOptions, detailMovie } = useSelector((data) => data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_data(movies));
    console.log('hoj');
  }, []);

  // concurrently
  // useEffect(() => {
  //   request('http://localhost:3001/data')
  //     .then((data) => dispatch(get_data(data)))
  //     .catch(() => dispatch(moviesFetchingError()));
  // }, []);

  return (
    <div className="App">
      <Header />
      <div className="movie_content">
        {!detailMovie && <Filter />}
        <Routes>
          <Route path="/moviesbase" element={<MoviList />} />
          <Route path="/search" element={<SearchPage />} />
          {!searchOptions ? (
            <Route path={`/search/${detailMovie.id}`} element={<MovieDetail />} />
          ) : (
            <Route path={`/${detailMovie.id}`} element={<MovieDetail />} />
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
