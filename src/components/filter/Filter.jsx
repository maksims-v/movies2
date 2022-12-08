import './filter.css';
import { Fragment } from 'react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  favorite_on,
  pages_count_back_next,
  pages_count_back_next_reset,
  filtered_sort_data,
  get_data,
  countcurrentpage,
} from '../../moviesSlice/moviesSlice';

function Filter() {
  const {
    data,
    isAuth,
    searchOptions,
    favoriteOn,
    movieWithFavoriteData,
    favoriteArr,
    sortData,
    bookmarksArr,
    movieGenreData,
    currentPageInFilter,
  } = useSelector((data) => data);

  const dispatch = useDispatch();

  const [selectedYearReset, setSelectedYearReset] = useState('');
  const [numberOfPage, setNumberOfPage] = useState();
  const [ckeckboxChecked, setCkeckboxChecked] = useState(false);
  const [favoriteValue, setFavoriteValue] = useState();
  const [raitingValue, setRaitingValue] = useState();

  useEffect(() => {
    setNumberOfPage(Math.ceil(sortData.length / 10));
  });

  const resetFilter = () => {
    dispatch(get_data(data));
    dispatch(pages_count_back_next_reset());
    dispatch(countcurrentpage(1));
    setSelectedYearReset('');
    setFavoriteValue('');
    setRaitingValue('');
    setCkeckboxChecked(false);
  };

  const selectFavorite = (value) => {
    const selectValue = value.target.value;
    setFavoriteValue(selectValue);

    if (selectValue === '0') {
      dispatch(favorite_on(false));
      dispatch(filtered_sort_data(movieWithFavoriteData));
    } else if (selectValue === '1') {
      dispatch(favorite_on(true));
      dispatch(filtered_sort_data(bookmarksArr));
      dispatch(countcurrentpage(1));
    } else if (selectValue === '2') {
      dispatch(favorite_on(true));
      dispatch(filtered_sort_data(favoriteArr));
      dispatch(countcurrentpage(1));
    }
  };

  const selectRaitingValue = (value) => {
    const selectValue = value.target.value;
    const dataToSort = [...sortData];
    if (selectValue === '0') {
      dataToSort.sort((a, b) => (a.popularity < b.popularity ? 1 : -1));
    } else if (selectValue === '1') {
      dataToSort.sort((a, b) => a.popularity - b.popularity);
    } else if (selectValue === '2') {
      dataToSort.sort((a, b) => (a.vote_average < b.vote_average ? 1 : -1));
    } else if (selectValue === '3') {
      dataToSort.sort((a, b) => a.vote_average - b.vote_average);
    }
    dispatch(filtered_sort_data(dataToSort));
  };

  const selectYear = (value) => {
    const year = value.target.value;
    dispatch(countcurrentpage(1));
    dispatch(pages_count_back_next_reset());
    setSelectedYearReset(year);

    if (favoriteOn) {
      if (year != 'allYears') {
        const dataToSort = favoriteArr.filter(function (movie) {
          return movie.release_date.slice(0, 4) === year;
        });
        dispatch(filtered_sort_data(dataToSort));
      } else {
        dispatch(filtered_sort_data(favoriteArr));
      }
    } else {
      if (year != 'allYears') {
        const dataToSort = movieWithFavoriteData.filter(function (movie) {
          return movie.release_date.slice(0, 4) === year;
        });
        dispatch(filtered_sort_data(dataToSort));
      } else {
        dispatch(filtered_sort_data(movieWithFavoriteData));
      }
    }
  };

  const pageBack = () => {
    if (currentPageInFilter != 1) {
      dispatch(pages_count_back_next(-10));
      dispatch(countcurrentpage(currentPageInFilter - 1));
    } else if (currentPageInFilter === 1) {
    }
  };

  const nextPage = () => {
    if (currentPageInFilter < numberOfPage) {
      dispatch(pages_count_back_next(10));
      dispatch(countcurrentpage(currentPageInFilter + 1));
    }
  };

  const filterId = (e) => {
    setCkeckboxChecked();
    const dataToSort = sortData.filter((movie) => {
      return movie.genre_ids.includes(Number(e.target.id));
    });
    dispatch(filtered_sort_data(dataToSort));
  };

  return (
    <div
      className={!searchOptions ? 'filter_wrapper filter_wrapper_active_search' : 'filter_wrapper'}>
      <div className="filter_block_wrapper">
        <button onClick={resetFilter} className="filter_block_button_clear_all">
          Сбросить все фильтры
        </button>
        <div className="sort">Сортировать по:</div>
        <form>
          <div className="sort_selected_wrapper">
            <select
              value={favoriteValue}
              className={isAuth ? 'sort_selected' : 'sort_selected autorisationUserSelectActive'}
              onChange={selectFavorite}>
              <option value="0" select className="option">
                Все
              </option>
              <option value="1" select>
                Смотреть позже
              </option>
              <option value="2">Избранные</option>
            </select>
            <select value={raitingValue} onChange={selectRaitingValue} className="sort_selected ">
              <option value="0" select>
                Популярные по убыванию
              </option>
              <option value="1">Популярные по возрастанию</option>
              <option value="2">Рейтинг по убыванию</option>
              <option value="3">Рейтинг по возрастанию</option>
            </select>
            <select value={selectedYearReset} onChange={selectYear} className="sort_selected">
              <option value="allYears" select>
                Все года
              </option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
            </select>
          </div>
        </form>
        <div className="radio_filter_block">
          {movieGenreData.map((item, id) => (
            <Fragment key={id}>
              <input
                value={ckeckboxChecked}
                onChange={filterId}
                type="checkbox"
                className="custom-checkbox"
                id={item.id}
                name={item.name}
                checked={ckeckboxChecked}
              />
              <label htmlFor={item.id}>{item.name}</label>
            </Fragment>
          ))}
        </div>
        <div className="buttons_wrapper">
          <button
            onClick={pageBack}
            className={currentPageInFilter === 1 ? 'back_next_button active' : 'back_next_button'}>
            Назад
          </button>
          <button
            onClick={nextPage}
            className={
              currentPageInFilter === numberOfPage ? 'back_next_button active' : 'back_next_button'
            }>
            Вперёд
          </button>
        </div>
        <div className="number_of_list">
          <span> {currentPageInFilter} </span> of <span>{numberOfPage}</span>
        </div>
      </div>
    </div>
  );
}

export default Filter;
