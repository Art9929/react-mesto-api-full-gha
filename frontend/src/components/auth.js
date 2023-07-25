export const BASE_URL = 'https://api.a-ryabcev.nomoredomains.xyz';

export const signup = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
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
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
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
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  .then(_response => {
    if (_response.ok) {
        return _response.json();
    }
    return Promise.reject(`Ошибка ${_response.status}`);
})
  .then(data => data)
}
