import './movieDetail.css';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detail_movie } from '../../moviesSlice/moviesSlice';

const MovieDetail = () => {
  const { searchOptions, detailMovie, movieGenreData } = useSelector((data) => data);
  const dispatch = useDispatch();

  const { release_date, vote_average, genre_ids, backdrop_path, title, overview } = detailMovie;

  const genre = movieGenreData.filter((item) => genre_ids.includes(item.id));

  const picture = `https://image.tmdb.org/t/p/w500${backdrop_path}`;

  return (
    <Fragment>
      <div className="movie_detail_wrapper">
        <div className="movie_detail_container">
          <div className="background_image_wrapper">
            <img className="background_image" src={picture} alt="" />
            <div className="movie_detail_wrapper_header">
              <div className="movie_detail_wrapper_header_img">
                <img src={picture} alt="" />
              </div>
              <div className="movie_detail_wrapper_header_description">
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
