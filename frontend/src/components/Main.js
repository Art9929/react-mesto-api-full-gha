import { useContext } from "react"; // это React Hook, который позволяет вам читать и подписываться на  контекст  вашего компонента.
import { UserContext } from "../contexts/CurrentUserContext"; // контекст

function Main({ onEditProfile, onAddPlace, onEditAvatar, cards }) {
  const currentUser = useContext(UserContext); // подписываемся на контекст

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar">
          <img
            lang="ru"
            src={currentUser.avatar}
            alt="Аватар"
            className="profile__image"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="block profile__title">{currentUser.name}</h1>
          <button
            aria-label="Редактировать"
            type="button"
            className="profile__edit-button"
            onClick={onEditProfile}
          ></button>
          <p className="block profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          aria-label="Добавить место"
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="group elements__group">{cards}</ul>
      </section>
    </main>
  );
}

export default Main;
