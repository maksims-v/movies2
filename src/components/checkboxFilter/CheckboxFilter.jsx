import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { filtered_sort_data, movieGenreDataToggle } from '../../moviesSlice/moviesSlice';

export default function CheckboxFilter({ item }) {
  const { sortData, movieGenreData } = useSelector((data) => data);

  const dispatch = useDispatch();
  const handleChange = () => {
    const newMovieGenreData = movieGenreData.map((i) => {
      if (i.id === item.id && i.toggle === false) {
        return { ...i, toggle: true };
      } else if (i.id === item.id && i.toggle === true) {
        return { ...i, toggle: false };
      }
      return i;
    });

    dispatch(movieGenreDataToggle(newMovieGenreData));

    const dataToSort = sortData.filter((movie) => {
      return movie.genre_ids.includes(Number(item.id));
    });
    dispatch(filtered_sort_data(dataToSort));
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={item.toggle}
            onChange={handleChange}
            sx={{
              color: 'white',
              padding: '0',
            }}
          />
        }
        label={item.name}
      />
    </FormGroup>
  );
}
