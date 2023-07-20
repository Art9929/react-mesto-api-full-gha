import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect} from "react";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const avatarRef = useRef(null); // записываем объект, возвращаемый хуком, в переменную

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  // После загрузки текущего пользователя из API
// его данные будут использованы в управляемых компонентах.
useEffect(() => {
  avatarRef.current.value = "";
}, [isOpen]);

  return (
    <PopupWithForm
    title="Обновить аватар"
    method="patch"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
  >
    <input
      id="image-avatar"
      name="avatar"
      type="url"
      placeholder="Ссылка на картинку"
      className="popup__input popup__input_text_url-img"
      required
      ref={avatarRef} // При рефах value не нужно. Указали элементу атрибут ref => получили прямой доступ к DOM-элементу
    />
    <span className="popup__error image-avatar-error"></span>
  </PopupWithForm>
  );
}

export default EditAvatarPopup;
