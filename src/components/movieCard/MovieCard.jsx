import './movieCard.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detail_movie } from '../../moviesSlice/moviesSlice';

function MovieCard({ item }) {
  const link = 'https://image.tmdb.org/t/p/w500';

  const { searchOptions } = useSelector((data) => data);
  const dispatch = useDispatch();

  return (
    <Link
      onClick={() => dispatch(detail_movie(item))}
      to={!searchOptions ? `/search/${item.id}` : `/${item.id}`}>
      <li className="movie_card_wrapper">
        <div className="movie_image">
          <div className="movie_raiting">
            <span>{item.vote_average}</span>
          </div>
          <img src={link + item.poster_path} alt="" />
        </div>
      </li>
      <div className="movie_title">{item.title}</div>
    </Link>
  );
}

export default MovieCard;
