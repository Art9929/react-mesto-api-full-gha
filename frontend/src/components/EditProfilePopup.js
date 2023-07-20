import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";
import { useContext } from 'react'; // это React Hook, который позволяет вам читать и подписываться на  контекст  вашего компонента.
import { UserContext } from '../contexts/CurrentUserContext'; // контекст


function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

  const [name , setName] = useState("");
  const [description , setDescription] = useState("");
  const currentUser = useContext(UserContext) // подписываемся на контекст

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Функция. Передаём значения управляемых компонентов во внешний обработчик
 onUpdateUser({
      name,
      about: description,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

// После загрузки текущего пользователя из API
// его данные будут использованы в управляемых компонентах.
useEffect(() => {
  setName(currentUser.name);
  setDescription(currentUser.about);
}, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      method="post"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="name"
        name="name"
        type="text"
        value={name || ""}
        placeholder="Введите имя"
        className="popup__input popup__input_text_name"
        minLength="2"
        maxLength="40"
        required
        onChange={handleChangeName}
      />
      <span className="popup__error name-error"></span>
      <input
        id="job"
        name="about"
        type="text"
        placeholder="Введите хобби"
        value={description || ""}
        className="popup__input popup__input_text_job"
        minLength="2"
        maxLength="200"
        required
        onChange={handleChangeDescription}
      />
      <span className="popup__error job-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
