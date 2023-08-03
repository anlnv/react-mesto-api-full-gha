import editBtn from '../images/avatar-edit.svg';
import addBtn from '../images/add-button.svg';
import { api } from '../utils/Api';
import { useEffect, useState, useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Main(props) {

    
    const currentUser = useContext(CurrentUserContext);
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__personal">
                    <button className="profile__button-edit" type="button" onClick={props.onEditAvatar}></button>
                    <img className="profile__avatar" src={currentUser.avatar} alt="фото профиля" />
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button type="button" className="profile__edit-button" onClick={props.onEditProfile}>
                            <img className="profile__edit-button-img" src={editBtn} alt="кнопка редактирования" />
                        </button>
                        <p className="profile__about">{currentUser.about}</p>
                    </div>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}>
                    <img className="profile__add-button-img" src={addBtn} alt="кнопка добавления" />
                </button>
            </section>
            <section className="elements">
                <ul className="elements__table">
                     { props.cards.map((card)=>(
                       <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
                     ))
                     }
                </ul>
            </section>
        </main>
    );
}

export default Main;