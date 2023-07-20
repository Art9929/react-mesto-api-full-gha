function ImagePopup({card, name, onClose}) {
  return (
    <div className={`popup popup_template_${name} ${card.handleOpenPopups}`}>
    <div className="popup__container-img">
      <img lang="ru" src={`${card.link}`} alt={card.name} className="popup__image popup__image_active" />
      <h3 className="block popup__title popup__title_active">{card.name}</h3>
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

export default ImagePopup;
