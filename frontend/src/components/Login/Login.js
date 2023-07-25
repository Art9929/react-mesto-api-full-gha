import React, {useState} from 'react';
import * as auth from '../auth.js';
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import './Login.css';

const Login = ({handleSubmit, handleChange, formValue, onClose, isOpen, imgActive }) => {

  return (
    <div className="auth">
      <div className="auth__container">
        <h3 className="auth__title">Вход</h3>
        <form
          className={`auth__form`}
          action="#"
          name="auth"
          method="post"
          onSubmit={handleSubmit}
        >
          <input
            id="email"
            name="email"
            type="email"
            value={formValue.email}
            placeholder="Введите email"
            className="auth__input"
            required
            onChange={handleChange}
          />
          <span className="auth__error"></span>
          <input
            id="password"
            name="password"
            type="password"
            value={formValue.password}
            placeholder="Введите пароль"
            className="auth__input"
            required
            onChange={handleChange}
          />
          <span className="auth__error name-error"></span>
          <button type="submit" className="auth__button">
            Войти
          </button>
        </form>
      </div>
      <InfoTooltip
        isOpen={isOpen}
        onClose={onClose}
        imgActive={imgActive}
      />
    </div>
  );
};

export default Login;
