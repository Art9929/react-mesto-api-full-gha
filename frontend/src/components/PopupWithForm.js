function PopupWithForm({ title, method, isOpen, onClose, children, buttonText, onSubmit}) {

  return (
    <div className={`popup popup_template ${isOpen}` }>
      <div className="popup__container">
        <h3 className="popup__title">{title}</h3>
        <form
          method={method}
          name="popup-form"
          action="#"
          className={`popup__form popup__form_template`}
          onSubmit={onSubmit}>
          {children}
        <button type="submit" className="popup__button">{buttonText || "Сохранить"}</button>
        </form>
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

export default PopupWithForm;
