import { useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Card(props) {

    const currentUser = useContext(CurrentUserContext);
    const isOwn = props.card.owner === currentUser._id;
    const isLiked = props.card.likes.some((i) => i === currentUser._id);
    const cardLikeButtonClassName = ( 
        `like ${isLiked && 'like_active'}` 
      );

  
    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }


    return (
        <li className="element">
            {isOwn && <button type="button" className="delete-button" onClick={handleDeleteClick}></button>}
            <img src={props.card.link}
                onClick={handleClick}
                alt={props.card.name}
                className="element__img" />
            <div className="element__info">
                <h2 className="element__text">{props.card.name}</h2>
                <div className="element__like-area">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="element__like-counter">{props.card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;