import './modal.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../moviesSlice/moviesSlice';
import { useState } from 'react';

function Modal() {
  const { enterAccount } = useSelector((data) => data);
  const [inputValue, setInputValue] = useState('Admin');

  const dispatch = useDispatch();

  return (
    <>
      <div className={enterAccount ? 'modal' : 'modal active'}>
        <div className="modal_content">
          <input
            onChange={(e) => setInputValue(e.target.value)}
            className="autorisation"
            type="text"
            placeholder="Логин"
            value={inputValue}
          />
          <input
            onChange={(e) => setInputValue(e.target.value)}
            type="password"
            placeholder="Пароль"
            value={inputValue}
          />
          <button className="button" onClick={() => dispatch(closeModal())}>
            Войти
          </button>
        </div>
      </div>
    </>
  );
}

export default Modal;
