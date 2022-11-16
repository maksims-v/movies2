import './modal.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../moviesSlice/moviesSlice';

function Modal() {
  const { enterAccount } = useSelector((data) => data);

  const dispatch = useDispatch();

  return (
    <>
      <div className={enterAccount ? 'modalWrapper' : 'modalWrapper active'}>
        <div className="modalEnter">
          <input className="autorisation" type="text" placeholder="Логин" />
          <input type="password" placeholder="Пароль" />
        </div>
        <div className="closeButton">
          <button onClick={() => dispatch(closeModal())}>Войти</button>
        </div>
      </div>
    </>
  );
}

export default Modal;
