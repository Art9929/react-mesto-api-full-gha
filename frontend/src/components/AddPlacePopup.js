import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

function AddPlacePopup({isOpen, onClose, onUpdatePlace}) {

  const [place , setPlace] = useState("");
  const [placeUrl , setPlaceUrl] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onUpdatePlace({
      name: place,
      link: placeUrl
    });
  }

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }
  function handleChangePlaceUrl(e) {
    setPlaceUrl(e.target.value);
  }

  /*
  Чтобы очищать форму при открытии, можно создать useEffect,
  который будет зависеть от пропса isOpen, и будет изменять
  значения наших рефов или стейтов на пустые строки
  */
  useEffect(() => {
    setPlace("");
    setPlaceUrl("");
  }, [isOpen]);

  return (
    <PopupWithForm
    title="Новое место"
    method="post"
    isOpen={isOpen}
    buttonText="Создать"
    onClose={onClose}
    onSubmit={handleSubmit}
  >
    <input
      id="name-place"
      name="name"
      type="text"
      value={place || ""}
      placeholder="Название"
      className="popup__input popup__input_text_place"
      minLength="2"
      maxLength="30"
      required
      onChange={handleChangePlace}
    />
    <span className="popup__error name-place-error"></span>
    <input
      id="image-place"
      name="link"
      type="url"
      value={placeUrl || ""}
      placeholder="Ссылка на картинку"
      className="popup__input popup__input_text_url-img"
      required
      onChange={handleChangePlaceUrl}
    />
    <span className="popup__error image-place-error"></span>
  </PopupWithForm>
  );
}

export default AddPlacePopup;
