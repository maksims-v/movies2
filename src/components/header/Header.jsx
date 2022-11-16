import './header.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  search_options,
  detail_movie,
  exitAccount,
  openModal,
} from '../../moviesSlice/moviesSlice';
import { Link } from 'react-router-dom';
import Modal from '../modal/Modal';

function Header() {
  const { searchOptions, detailMovie, accountOffOn } = useSelector((data) => data);
  const dispatch = useDispatch();

  return (
    <>
      <div className="header">
        <ul className="header_menu">
          <li>
            <div className="home" href="">
              {!detailMovie ? (
                <a href="/" onClick={() => dispatch(detail_movie(false))} className="home" to="/">
                  Home
                </a>
              ) : (
                <Link onClick={() => dispatch(detail_movie(false))} className="home" to="/">
                  Home
                </Link>
              )}
            </div>
          </li>
          {searchOptions ? (
            <Link to="/search">
              <button onClick={() => dispatch(search_options(false))}>ПОИСК ФИЛЬМА</button>
            </Link>
          ) : (
            <Link to="/">
              <button onClick={() => dispatch(search_options(true))}>НАЗАД НА ГЛАВНУЮ</button>
            </Link>
          )}
          <li>
            {!accountOffOn ? (
              <button onClick={() => dispatch(openModal())} className="login">
                Войти
              </button>
            ) : (
              <button onClick={() => dispatch(exitAccount())} className="login">
                Выйти
              </button>
            )}
          </li>
        </ul>
      </div>
      <Modal />
    </>
  );
}

export default Header;
