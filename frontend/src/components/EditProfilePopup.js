import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function EditProfilePopup(props) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

    function handleNameCgange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateUser({
          name,
          about: description,
        });
      }

    return (

        <PopupWithForm name="profile" title="Редактировать профиль" btnText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <label htmlFor="name" className="popup__label">
                <input value={name} onChange={handleNameCgange} name="name" id="name" className="popup__input" placeholder="Имя" required minLength="2" maxLength="40" />
                <span className="popup__input-error" id="name-error"></span>
            </label>
            <label htmlFor="about" className="popup__label">
                <input value={description} onChange={handleDescriptionChange} name="about" id="about" className="popup__input" placeholder="О себе" required minLength="2" maxLength="200" />
                <span className="popup__input-error" id="about-error"></span>
            </label>
        </PopupWithForm>
    );
}