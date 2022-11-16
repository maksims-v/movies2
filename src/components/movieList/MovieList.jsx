import MovieCard from './../movieCard/MovieCard.jsx';
import './movieList.css';
import { useSelector } from 'react-redux';

function MoviList() {
  const { pageCountBack, pageCountNext, sortData } = useSelector((state) => state);

  const movieRendering = (arr) => {
    if (arr.length === 0) {
      return <div className="movie_none">Фильмов пока нет :( </div>;
    } else {
      const movie = arr.map((item, id) => {
        if (id >= pageCountBack && id < pageCountNext) {
          return <MovieCard key={item.id} item={item} />;
        }
      });
      return movie;
    }
  };

  const movies = movieRendering(sortData);

  return <ul className="movie_list">{movies}</ul>;
}

export default MoviList;
