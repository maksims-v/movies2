import './ModalLoginInputs.css';
import React from 'react';
import { useState } from 'react';
import { closeModal } from '../../moviesSlice/moviesSlice';
import { useDispatch } from 'react-redux';

const ModalLoginInputs = () => {
  const [login, setLogin] = useState('Admin');
  const [pass, setPassword] = useState('Admin');

  const dispatch = useDispatch();

  return (
    <div className="modal_inputs_wrapper">
      <input
        onChange={(e) => setLogin(e.target.value)}
        className="autorisation"
        type="text"
        placeholder="Логин"
        value={login}
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Пароль"
        value={pass}
      />
      <button className="button" onClick={() => dispatch(closeModal())}>
        Войти
      </button>
    </div>
  );
};

export default ModalLoginInputs;
