import React, { useState } from "react";
import { Link } from "react-router-dom";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import "./Register.css";

const Register = ({formValue, handleChange, handleSubmit, onClose, isOpen, imgActive}) => {

  return (
    <div className="register">
      <div className="register__container">
        <h3 className="register__title">Регистрация</h3>
        <form
          className={`register__form`}
          action="#"
          name="register"
          method="post"
          onSubmit={handleSubmit}
        >
          <input
            id="email"
            name="email"
            type="email"
            value={formValue.email}
            placeholder="Введите email"
            className="register__input"
            required
            onChange={handleChange}
          />
          <span className="register__error"></span>
          <input
            id="password"
            name="password"
            type="password"
            value={formValue.password}
            placeholder="Введите пароль"
            className="register__input"
            required
            onChange={handleChange}
          />
          <span className="register__error name-error"></span>
          <button type="submit" className="register__button">
            Зарегистрироваться
          </button>
        </form>
        <div className="register__signin">
        <Link to={"/signin"} className="register__login-link">Уже зарегистрированы? Войти</Link>
        </div>
      </div>
      <InfoTooltip
        isOpen={isOpen}
        onClose={onClose}
        imgActive={imgActive}
      />
    </div>
  );
};

export default Register;
