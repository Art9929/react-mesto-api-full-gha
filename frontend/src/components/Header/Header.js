import './Header.css';

function Header({loggedIn, data, removeToken, navigateMenu}) {

const setMenu = () => {
  return window.location.pathname === "/signup" ? "Войти" : "Регистрация"
}

  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__menu">
        {loggedIn ?

        <nav className="header__nav">
          <ul className="header__list">
            <li className="header__text">{data ? data.email : ""}</li>
          {/* {data && Object.values(array).map((list) => (
             <li key={list} className="header__text">{list}</li>)
             )} */}
          </ul>
             <button
              className="header__text-exit"
                type="button"
                onClick={removeToken}>
                Выход
            </button>
        </nav>
        :
        <button
          className="header__text-exit"
          type="button"
          onClick={navigateMenu}>
            {setMenu()}
        </button>}
      </div>
    </header>
  );
}

export default Header;
