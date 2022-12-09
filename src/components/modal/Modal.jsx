import './modal.css';
import { useSelector } from 'react-redux';
import ModalLoginInputs from '../modalLoginInputs/ModalLoginInputs';

function Modal() {
  const { enterAccount } = useSelector((data) => data);

  return (
    <div className={enterAccount ? 'modal' : 'modal active'}>
      <div className="modal_content">
        <ModalLoginInputs />
      </div>
    </div>
  );
}

export default Modal;
