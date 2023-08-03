import imageSuccess from "../images/success.svg";
import imageError from "../images/error.svg";
import closeBtn from '../images/button-popup-close.svg';

const InfoTooltip = (props) => {
    return (
        <div
            className={`popup ${props.isOpen && "popup_opened"
                }`}
            id={props.name}
            onClick={props.onClick}
        >
            <div className="popup__container">
                <button
                    className={`popup__button-close`}
                    type="button"
                    onClick={props.onClose}
                >
                    <img className="popup__button-close-img" src={closeBtn} alt="картинка закрытия попапа" />
                </button>
                <div className="popup__menu">
                    <img className="popup__img-info" alt={props.alt} src={props.isOk ? imageSuccess : imageError} />
                    <span className="popup__caption-info">{props.isOk ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</span>
                </div>
            </div>
        </div>
    );
};
export default InfoTooltip;