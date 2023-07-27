export const BASE_URL = 'http://localhost:4000';

export const signup = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(_response => {
    if (_response.ok) {
        return _response.json();
    }
    return _response.json();
    // return Promise.reject(`Ошибка ${_response.status}`);
})
  .then((res) => {
    return res;
  })
};
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(_response => {
    if (_response.ok) {
        return _response.json();
    }
    return Promise.reject(`Ошибка ${_response.status}`);
})
  .then((data) => {
    if (data.token){
      localStorage.setItem('jwt', data.token);
      return data;
    }
  })
};
export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then(_response => {
    if (_response.ok) {
        return _response.json();
    }
    return Promise.reject(`Ошибка ${_response.status}`);
})
  .then(data => data)
}
export const logOut = () => {
  return fetch(`${BASE_URL}/logout`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then(data => console.log(data))
  .catch((err) => console.error(err));
}
