import imgPopupTry from "../../images/popup-true.svg";
import imgPopupFalse from "../../images/popup-false.svg";
import './InfoTooltip.css';


function InfoTooltip({ onClose, isOpen, imgActive }) {
  return (
    <div className={`popup popup_template ${isOpen}` }>
      <div className="popup__container popup__container-center">
        <img
          className={`popup__img-active-register`}
          alt="Вы успешно зарегистрировались!"
          src={imgActive ? imgPopupTry : imgPopupFalse}>
         </img>
        <h3 className="popup__title">{imgActive ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h3>
      <button
          aria-label="Закрыть"
          type="button"
          className="popup__close"
          onClick={onClose}
        />
    </div>
  </div>
  );
}

export default InfoTooltip;
