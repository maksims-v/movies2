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
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function App() {
  const { searchOptions, detailMovie } = useSelector((data) => data);
  const dispatch = useDispatch();

  // const { request } = useHttp();

  useEffect(() => {
    dispatch(get_data(movies));
  }, []);

  // concurrently
  // useEffect(() => {
  //   request('http://localhost:3001/data')
  //     .then((data) => dispatch(get_data(data)))
  //     .catch(() => dispatch(moviesFetchingError()));
  // }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className="App">
        <div className="wrapper">
          <Header />
          <div className="movie_content">
            {!detailMovie && <Filter />}
            <div className="movies">
              <Routes>
                <Route path={`/search`} element={<SearchPage />} />
                {!searchOptions ? (
                  <Route path={`/search/${detailMovie.id}`} element={<MovieDetail />} />
                ) : (
                  <Route path={`/${detailMovie.id}`} element={<MovieDetail />} />
                )}
                <Route index element={<MoviList />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default App;
