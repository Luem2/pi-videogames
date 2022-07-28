import React from 'react';
import { useDispatch } from 'react-redux';
import {
  alphaSort,
  gamesSort,
  genresSort,
  ratingSort,
} from '../../redux/actions';
import {
  ASCENDENTE,
  DESCENDENTE,
  EXTERNAL_API,
  DATABASE_GAMES,
} from '../../utility';
import { genres } from '../../utility/genres';
import style from './Order.module.css';

const Order = () => {
  const dispatch = useDispatch();

  const orderByAlpha = e => {
    dispatch(alphaSort(e.target.value));
  };

  const orderByRating = e => {
    dispatch(ratingSort(e.target.value));
  };

  const orderByGenres = e => {
    dispatch(genresSort(e.target.value));
  };

  const orderByGames = e => {
    dispatch(gamesSort(e.target.value));
  };

  return (
    <div className={style.container}>
      <select className={style.order} name='select' onChange={orderByAlpha}>
        <option value='default'>Order alphabetically </option>
        <option value={ASCENDENTE}>Sort: A - Z</option>
        <option value={DESCENDENTE}>Sort: Z - A</option>
      </select>

      <select className={style.order} name='select' onChange={orderByRating}>
        <option value='default'>Order by Rating</option>
        <option value={DESCENDENTE}>High Rating</option>
        <option value={ASCENDENTE}>Low Rating</option>
      </select>

      <select className={style.order} name='select' onChange={orderByGenres}>
        <option value='default'>Order by Genre</option>
        {genres.map((p, i) => (
          <option key={i + p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <select className={style.order} name='select' onChange={orderByGames}>
        <option value='default'>Order Games by:</option>
        <option value={EXTERNAL_API}>External API</option>
        <option value={DATABASE_GAMES}>Database Created Games</option>
      </select>
    </div>
  );
};

export default Order;
