import { useContext } from 'react'; // это React Hook, который позволяет вам читать и подписываться на  контекст  вашего компонента.
import { UserContext } from '../contexts/CurrentUserContext'; // контекст

function Card({card, handleCardClick, onCardLike, onCardDelete}) {

  const currentUser = useContext(UserContext) // подписываемся на контекст
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i === currentUser._id);

  return (
      <li className="group__element">
          {isOwn &&
          <button
            type="button"
            aria-label="Корзина"
            className="group__trash"
            onClick={onCardDelete}
            />
          }
        <img
          lang="ru"
          src={card.link}
          alt={card.name}
          className="group__image"
          onClick={handleCardClick}
        />
        <div className="group__figcaption">
          <h3 className="block group__title">{card.name}</h3>
          <div className="group__likes">
            <button
              aria-label="Нравится"
              type="button"
              className={`group__vector ${isLiked && 'group__vector_active'}`}
              onClick={onCardLike}
            >
            </button>
            <span className="group__quantity">{card.likes.length}</span>
          </div>
        </div>
      </li>
  );
}

export default Card;
