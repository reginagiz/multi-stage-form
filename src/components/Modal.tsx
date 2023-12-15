import { NavLink } from "react-router-dom";
import FailedIcon from "../images/FailedIcon";
import SuccessIcon from "../images/SuccessIcon";
import s from "./Modal.module.css";

interface ModalProps {
  isSuccess: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isSuccess, onClose }) => {
  return (
    <div className={s.centered}>
      <div className={s.modal}>
        {isSuccess ? (
          <div className={s.modal_success}>
            <div className={s.title}>Форма успешно отправлена</div>
            <div className={`${s.icon_container} ${s.icon_container_success}`}>
              <SuccessIcon />
            </div>
            <NavLink to={"/"}>
              <button
                className={`button-next ${s.button_next}`}
                onClick={onClose}
              >
                На главную
              </button>
            </NavLink>
          </div>
        ) : (
          <div className={s.modal_failed}>
            <div className={s.title}>Ошибка</div>
            <div className={`${s.icon_container} ${s.icon_container_fail}`}>
              <FailedIcon />
            </div>
            <button
              className={`button-next ${s.button_next}`}
              onClick={onClose}
            >
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
