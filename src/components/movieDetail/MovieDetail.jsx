import './movieDetail.css';
import favoriteImg from './img/favorite.png';
import favoriteOK from './img/favoriteOK.png';
import bookmarksimg from './img/bookmarks.png';
import bookmarksOK from './img/bookmarksOK.png';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  detail_movie,
  add_to_favorite_arr,
  filtered_sort_data,
  movie_with_favorite_data,
  add_to_bookmarks_arr,
} from '../../moviesSlice/moviesSlice';

const MovieDetail = () => {
  const {
    searchOptions,
    detailMovie,
    movieGenreData,
    favoriteOn,
    isAuth,
    favoriteArr,
    bookmarksArr,
    sortData,
  } = useSelector((data) => data);
  const dispatch = useDispatch();

  const addToFavorite = (item) => {
    if (isAuth) {
      const sortetArray = sortData.map((movie) => {
        if (item.id == movie.id && item.favorite === false) {
          dispatch(add_to_favorite_arr([...favoriteArr, ...[{ ...item, favorite: true }]]));
          dispatch(detail_movie({ ...item, favorite: true }));
          return { ...movie, favorite: true };
        } else if (item.id == movie.id && item.favorite === true) {
          dispatch(add_to_favorite_arr(favoriteArr.filter((movie) => movie.id != item.id)));
          dispatch(detail_movie({ ...item, favorite: false }));
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
    if (isAuth) {
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

  const { release_date, vote_average, genre_ids, backdrop_path, title, overview } = detailMovie;

  const genre = movieGenreData.filter((item) => genre_ids.includes(item.id));

  const picture = `https://image.tmdb.org/t/p/w500${backdrop_path}`;

  console.log(detailMovie.bookmarks);

  return (
    <Fragment>
      <div className="movie_detail_wrapper">
        <div className="movie_detail_container">
          <div className="background_image_wrapper">
            <div className="movie_detail_wrapper_header">
              <div className="movie_detail_wrapper_header_img">
                <img src={picture} alt="" />
              </div>
              <div className="movie_detail_wrapper_header_description">
                {!searchOptions || favoriteOn ? null : (
                  <>
                    <div
                      onClick={() => addToFavorite(detailMovie)}
                      className="movie_card_img"
                      href="">
                      <img src={!detailMovie.favorite ? favoriteImg : favoriteOK} alt="" />
                    </div>
                    <div
                      onClick={() => addToBookmarks(detailMovie)}
                      className="movie_card_img2"
                      href="">
                      <img src={!detailMovie.bookmarks ? bookmarksimg : bookmarksOK} alt="" />
                    </div>
                  </>
                )}

                <div className="movie_description_tittle">{title}</div>
                <div className="movie_genre">Жанр: {`${genre.map((item) => item.name)}`}</div>
                <div className="movie_description_raiting">
                  Рейтинг: <span>{vote_average}</span> <span>Дата выхода: {release_date} </span>
                </div>
                <div className="movie_description_text">{overview}</div>
                {!searchOptions ? (
                  <Link
                    onClick={() => dispatch(detail_movie(false))}
                    className="movie_description_bottom"
                    to="/search">
                    Назад
                  </Link>
                ) : (
                  <Link
                    onClick={() => dispatch(detail_movie(false))}
                    className="movie_description_bottom"
                    to="/">
                    Назад
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MovieDetail;
