import './filter.css';
import NextBackButtons from '../nextBackButtons/NextBackButtons';
import Checkbox from '../checkbox/Checkbox';
import CheckboxFilter from '../checkboxFilter/CheckboxFilter';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  pages_count_back_next_reset,
  get_data,
  countcurrentpage,
  movieGenreDataToggle,
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

  useEffect(() => {
    setNumberOfPage(Math.ceil(sortData.length / 10));
  });

  const resetFilter = () => {
    const newMovieGenreData = movieGenreData.map((i) => {
      return { ...i, toggle: false };
    });
    dispatch(movieGenreDataToggle(newMovieGenreData));
    dispatch(get_data(data));
    dispatch(pages_count_back_next_reset());
    dispatch(countcurrentpage(1));
    setSelectedYearReset('');
    setSelectValues('');
    setRaitingValue('');
  };

  return (
    <div className={!searchOptions ? 'filter_wrapper filter_wrapper_disabled' : 'filter_wrapper'}>
      <button onClick={resetFilter} className="reset_filter">
        Сбросить все фильтры
      </button>
      <div className="sort">Сортировать по:</div>
      <Checkbox
        setSelectValues={setSelectValues}
        selectValues={selectValues}
        setRaitingValue={setRaitingValue}
        raitingValue={raitingValue}
        setSelectedYearReset={setSelectedYearReset}
        selectedYearReset={selectedYearReset}
      />
      <div className="radio_filter_block">
        {movieGenreData.map((item, id) => (
          <CheckboxFilter key={id} item={item} />
        ))}
      </div>
      <NextBackButtons numberOfPage={numberOfPage} />
      <div className="number_of_list">
        <span> {currentPageInFilter} </span> of <span>{numberOfPage}</span>
      </div>
    </div>
  );
}

export default Filter;
