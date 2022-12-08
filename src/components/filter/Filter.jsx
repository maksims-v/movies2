import './filter.css';
import SearchSelect from '../searchSelect/SearchSelect';
import { Fragment } from 'react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  pages_count_back_next,
  pages_count_back_next_reset,
  filtered_sort_data,
  get_data,
  countcurrentpage,
} from '../../moviesSlice/moviesSlice';

function Filter() {
  const { data, searchOptions, sortData, movieGenreData, currentPageInFilter } = useSelector(
    (data) => data,
  );

  const dispatch = useDispatch();
  const [selectValues, setSelectValues] = useState('');
  const [raitingValue, setRaitingValue] = useState();

  const [selectedYearReset, setSelectedYearReset] = useState('');

  const [numberOfPage, setNumberOfPage] = useState();
  const [ckeckboxChecked, setCkeckboxChecked] = useState(false);

  useEffect(() => {
    setNumberOfPage(Math.ceil(sortData.length / 10));
  });

  const resetFilter = () => {
    dispatch(get_data(data));
    dispatch(pages_count_back_next_reset());
    dispatch(countcurrentpage(1));
    setCkeckboxChecked(false);
    setSelectedYearReset('');
    setSelectValues('');
    setRaitingValue('');
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
        <SearchSelect
          setSelectValues={setSelectValues}
          selectValues={selectValues}
          setRaitingValue={setRaitingValue}
          raitingValue={raitingValue}
          setSelectedYearReset={setSelectedYearReset}
          selectedYearReset={selectedYearReset}
        />
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
