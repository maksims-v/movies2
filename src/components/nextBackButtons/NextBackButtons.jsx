import './nextBackButtons.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pages_count_back_next, countcurrentpage } from '../../moviesSlice/moviesSlice';

const NextBackButtons = ({ numberOfPage }) => {
  const { currentPageInFilter } = useSelector((data) => data);
  const dispatch = useDispatch();

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

  return (
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
  );
};

export default NextBackButtons;
