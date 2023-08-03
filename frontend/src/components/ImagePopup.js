import closeBtn from '../images/button-popup-close.svg';
function ImagePopup(props) {
  return (
    <section className={`popup popup_dark ${props.card.name ? "popup_opened" : ""}`} id="zoom-popup">
      <div className="popup__container popup__container_img">
        <button type="button" onClick={props.onClose} className="popup__button-close">
          <img className="popup__button-close-img" src={closeBtn} alt="картинка закрытия попапа" />
        </button>
        <img className="popup__img" alt={props.card.name} src={props.card.link} />
        <h4 className="popup__img-title">{props.card.name}</h4>
      </div>
    </section>
  );
}

export default ImagePopup;