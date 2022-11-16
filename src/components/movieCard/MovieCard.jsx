import './movieCard.css';
import favoriteImg from './img/favorite.png';
import favoriteOK from './img/favoriteOK.png';
import bookmarksimg from './img/bookmarks.png';
import bookmarksOK from './img/bookmarksOK.png';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  detail_movie,
  add_to_favorite_arr,
  filtered_sort_data,
  movie_with_favorite_data,
  add_to_bookmarks_arr,
} from '../../moviesSlice/moviesSlice';

function MovieCard({ item }) {
  const link = 'https://image.tmdb.org/t/p/w500';

  const { sortData, searchOptions, favoriteOn, accountOffOn, favoriteArr, bookmarksArr } =
    useSelector((data) => data);
  const dispatch = useDispatch();

  const addToFavorite = (item) => {
    if (accountOffOn) {
      const sortetArray = sortData.map((movie) => {
        if (item.id == movie.id && item.favorite === false) {
          dispatch(add_to_favorite_arr([...favoriteArr, ...[{ ...item, favorite: true }]]));
          return { ...movie, favorite: true };
        } else if (item.id == movie.id && item.favorite === true) {
          dispatch(add_to_favorite_arr(favoriteArr.filter((movie) => movie.id != item.id)));
          return { ...movie, favorite: false };
        }
        return movie;
      });
      dispatch(filtered_sort_data(sortetArray));
      dispatch(movie_with_favorite_data(sortetArray));
    } else {
      alert('Нужно войти в аккаунт! ');
    }
  };

  const addToBookmarks = (item) => {
    if (accountOffOn) {
      const sortetArray = sortData.map((movie) => {
        if (item.id == movie.id && item.bookmarks === false) {
          dispatch(add_to_bookmarks_arr([...bookmarksArr, ...[{ ...item, bookmarks: true }]]));
          return { ...movie, bookmarks: true };
        } else if (item.id == movie.id && item.bookmarks === true) {
          dispatch(add_to_bookmarks_arr(bookmarksArr.filter((movie) => movie.id != item.id)));
          return { ...movie, bookmarks: false };
        }
        return movie;
      });
      dispatch(filtered_sort_data(sortetArray));
      dispatch(movie_with_favorite_data(sortetArray));
    } else {
      alert('Нужно войти в аккаунт! ');
    }
  };

  return (
    <li className="movie_wrapper">
      <div className="movie_image">
        <img src={link + item.poster_path} alt="" />
      </div>
      <div className="movie_description">
        <div className="movie_description_header">
          <div className="movie_raiting">
            Рейтинг: <span>{item.vote_average}</span>
          </div>
          {!searchOptions || favoriteOn ? null : (
            <>
              <div onClick={() => addToFavorite(item)} className="movie_card_img" href="">
                <img src={!item.favorite ? favoriteImg : favoriteOK} alt="" />
              </div>
              <div onClick={() => addToBookmarks(item)} href="">
                <img src={!item.bookmarks ? bookmarksimg : bookmarksOK} alt="" />
              </div>
            </>
          )}
        </div>
        <div className="movie_name">{item.title}</div>
        {!searchOptions ? (
          <Link
            onClick={() => dispatch(detail_movie(item))}
            to={`/search/${item.id}`}
            className="movie_button">
            Подробнее
          </Link>
        ) : (
          <Link
            onClick={() => dispatch(detail_movie(item))}
            to={`/${item.id}`}
            className="movie_button">
            Подробнее
          </Link>
        )}
      </div>
    </li>
  );
}

export default MovieCard;
