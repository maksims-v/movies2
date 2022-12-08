import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  favorite_on,
  pages_count_back_next_reset,
  filtered_sort_data,
  countcurrentpage,
} from '../../moviesSlice/moviesSlice';

const SearchSelect = ({
  setSelectValues,
  selectValues,
  setRaitingValue,
  raitingValue,
  setSelectedYearReset,
  selectedYearReset,
}) => {
  const { isAuth, favoriteOn, movieWithFavoriteData, favoriteArr, sortData, bookmarksArr } =
    useSelector((data) => data);
  const dispatch = useDispatch();

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

  const selectFavorite = (value) => {
    const selectValue = value.target.value;
    setSelectValues(selectValue);

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
    setRaitingValue(selectValue);
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

  return (
    <form>
      <div className="sort_selected_wrapper">
        <select
          value={selectValues}
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
  );
};

export default SearchSelect;
