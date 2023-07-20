class Api {
  constructor( { baseUrl, headers } ) {
    this._url = baseUrl;
    this._headers = headers
  }

  _response(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }


  // Загружаем карточки
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
      .then(res => this._response(res));
  }

  // Загружаем профиль
  profile() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
      .then(res => this._response(res));
  }

  // Ред. профиль
  editProfile( info ) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify( info )
    })
      .then(res => this._response(res));
  }

  // Добавление карточки на сервер
  addNewCard(item) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(item)
    })
      .then(res => this._response(res));
  }

    // Удаляем карточки с сервера
    deleteCard(_id) {
      return fetch(`${this._url}/cards/${_id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers,
      })
        .then(res => this._response(res));
    }

    // Постановка лайка
    addLike(_id, likes) {
      return fetch(`${this._url}/cards/${_id}/likes`, {
        method: 'PUT',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({ likes }),
      })
        .then(res => this._response(res));
    }

    // Удаление лайка
    deleteLike(_id, likes) {
      return fetch(`${this._url}/cards/${_id}/likes`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({ likes }),
      })
        .then(res => this._response(res));
    }

    // Обновление аватара
    changeAvatar(urlAvatar) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify( urlAvatar ),
      })
        .then(res => this._response(res));
    }

}

// подключение к API
const api = new Api({
  baseUrl: 'http://51.250.25.223:4000',
  headers: {
    authorization: 'cae42bd9-08a7-4ce1-b408-eabcb666728e',
    'Content-Type': 'application/json'
  }
});

export default api;
