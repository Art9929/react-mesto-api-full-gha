import { useState, useEffect} from "react";
import { Route, Routes, Outlet, Navigate, useNavigate} from 'react-router-dom';
import api from "../utils/api";
import Footer from "./Footer";
import Header from "./Header/Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Card from "./Card";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import * as auth from "./auth.js";
import { UserContext } from '../contexts/CurrentUserContext'; // Контекст

// Регистрация и Авторизация
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setPopupEdit] = useState("");
  const [isAddPlacePopupOpen, setPopupAdd] = useState("");
  const [isEditAvatarPopupOpen, setPopupImg] = useState("");
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
 // Регистрация и Авторизация
  const [loggedIn, setLoggedIn] = useState(null); // 3 разделения - null, false, true
  const [data, setData] = useState([]); // 3 разделения - null, false, true
 // Регистрация
  const [isRegisterPopupOpen, setPopupRegister] = useState(""); // Регистрация
  const [isActiveRegisterPopup, setActiveRegisterPopup] = useState(false); // Регистрация
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  //  Авторизация

  function handleOpenPopups() {
    return "popup_opened";
  }
  function handleClosePopups() {
    setPopupEdit("");
    setPopupAdd("");
    setPopupImg("");
    setPopupRegister(""); // регистрация
    setSelectedCard({});
  }

  // Лайк
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (isLiked === false) {
      api.addLike(card._id, isLiked)
        .then((newCard) => {
          setCards((results) => results.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.error(err));
    } else {
      api.deleteLike(card._id, isLiked) // Удаляем Лайк
        .then((newCard) => {
          setCards((results) => results.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => console.error(err));
      }
}

  // Корзина
  function handleCardDelete(card) {
    api.deleteCard(card._id) // Удаляем
    .then((newCard) => {
      setCards((results) => results.filter((c) => c._id !== card._id ? newCard : newCard - c)); // Работает, но слабо понимаю, что написано :()
    })
    .catch((err) => console.error(err));
  }

  // Edit
  function handleUpdateUser(info) {
    api.editProfile(info)
    .then((info) => {
      setCurrentUser(info);
      handleClosePopups();
    })
    .catch((err) => console.error(err));
  }

  // Cards
  function handleAddPlaceSubmit(card) {
    api.addNewCard(card)
    .then((newCard) => {
      setCards([newCard, ...cards]); // обновляем стейт cards с помощью расширенной копии текущего массива — используйте оператор ...:
      handleClosePopups();
    })
    .catch((err) => console.error(err));
  }

    // Avatar
    function handleUpdateAvatar(urlAvatar) {
      api.changeAvatar(urlAvatar)
      .then((urlAvatar) => {
        setCurrentUser(urlAvatar);
        handleClosePopups();
      })
      .catch((err) => console.error(err));
    }

  useEffect(() => {
    // if (searchQuery) {
    // setIsLoading(true); крутилка
    api
      .profile()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.error(err));

    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.error(err));
    // .finally(() => setIsLoading(false));
    // }
  }, []);


// Регистрация и Авторизация
const handleLogin = () => {
  setLoggedIn(true);
}

useEffect(() => {
  const handleTokenCheck = () => {
      auth.checkToken()
      .then((res) => {
        setData(res)
        if (res.data){
          setLoggedIn(true);
          navigate("/")
        } else {
          setLoggedIn(false);
        }
    })
    .catch((err) => {
      setLoggedIn(false);
      console.error(err)}
      );
  }
  handleTokenCheck();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []) // [] - токльо при первой загрузке

const removeToken = () => {
  setLoggedIn(false);
  navigate("/", {replace: true})
}

const navigateMenu = () => {
  window.location.pathname === "/signup"
  ?
  navigate("/signin")
  :
  navigate("/signup")
}

// Регистрация
const handleSubmitRegistrate = (e) => {
  e.preventDefault();
  auth.signup(formValue.email, formValue.password)
  .then((res) => {
    setPopupRegister(handleOpenPopups);
      if (res._id) setActiveRegisterPopup(true)
      })
      .catch((e) => console.log(e));
};

// Авторизация
const handleSubmitAuth = (e) => {
  e.preventDefault();
  if (!formValue.email || !formValue.password){
    return;
  }
  auth.authorize(formValue.email, formValue.password)
    .then((data) => {
      if (data.token){
        setFormValue({email: '', password: ''});
        handleLogin();
        navigate('/cards', {replace: true});
      }
    })
    .catch(err => console.log(err));
}

// handleChange для Auth/Registrate
const handleChange = (e) => {
  const { name, value } = e.target;

  setFormValue({
    ...formValue,
    [name]: value,
  });
};

  return (
    <div className="App">
    <Routes>
    <Route element={<> <Header loggedIn={loggedIn} data={data} removeToken={removeToken} navigateMenu={navigateMenu}/> <Outlet /> </>} >
      <Route path="/" element={ loggedIn ? <Navigate to="/cards" replace /> : <Navigate to="/signin" replace /> } />
      <Route path="*" element={<h2 style={{color: "white"}}>Not found</h2>} />
      <Route path="/signin"
        element={<Login
          handleSubmit={(e) => handleSubmitAuth(e)}
          handleChange={(e) => handleChange(e)}
          formValue={formValue}
        />} />
      <Route path="/signup"
        element={<Register
          handleSubmit={(e) => handleSubmitRegistrate(e)}
          handleChange={(e) => handleChange(e)}
          isOpen={isRegisterPopupOpen}
          onClose={handleClosePopups}
          imgActive={isActiveRegisterPopup}
          formValue={formValue}
        />} />
      <Route path="/cards" element={
        <>
        <ProtectedRoute loggedIn={loggedIn}
        element={
          <UserContext.Provider value={currentUser}>
              <Main
                onEditProfile={() => setPopupEdit(handleOpenPopups)}
                onAddPlace={() => setPopupAdd(handleOpenPopups)}
                onEditAvatar={() => setPopupImg(handleOpenPopups)}
                cards={cards.map((card) => (
                  <Card
                  key={card._id}
                  card={card}
                  onCardLike={() => handleCardLike(card)}
                  onCardDelete={() => handleCardDelete(card)}
                    handleCardClick={() =>
                      setSelectedCard({
                        handleOpenPopups: "popup_opened",
                        name: card.name,
                        link: card.link,
                        id: card.id,
                      })
                    }
                  />
                ))}
              />

              <Footer />

              <ImagePopup
                name="img"
                card={selectedCard}
                onClose={handleClosePopups}
              />

              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={handleClosePopups}
                onUpdateUser={(info) => handleUpdateUser(info)}
              />

              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={handleClosePopups}
                onUpdatePlace={(card) => handleAddPlaceSubmit(card)}
              />

              <PopupWithForm
                title="Вы уверены?"
                method="delete">
                <button type="submit" className="popup__button">
                  Да
                </button>
              </PopupWithForm>

              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={handleClosePopups}
                onUpdateAvatar={(urlAvatar) => handleUpdateAvatar(urlAvatar)}
              />
              </UserContext.Provider>
               }
             />
            </>
          } />
        </Route> {/*header*/}
      </Routes> {/*Routes*/}
    </div> // App
  );
}

export default App;
