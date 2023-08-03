import closeBtn from '../images/button-popup-close.svg';

function PopupWithForm(props) {
    return (
        <section className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}  id={`${props.name}-popup`} >
            <div className="popup__container">
                <button onClick={props.onClose} type="button" className="popup__button-close">
                    <img className="popup__button-close-img" src={closeBtn} alt="картинка закрытия попапа" />
                </button>
                <div className="popup__menu">
                    <h3 className="popup__title">{props.title}</h3>
                    <form onSubmit={props.onSubmit} id={`${props.name}-form`} name={props.name} className="popup__form" action="#" method="post">
                        {props.children}
                        <button type="submit" className="popup__button-save">{props.btnText}</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default PopupWithForm;