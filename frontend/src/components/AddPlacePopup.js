import PopupWithForm from "./PopupWithForm";
import { createRef} from "react";
export default function AddPlacePopup(props) {

    const name = createRef();
    const link = createRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onAddPlace({
          name: name.current.value,
          link: link.current.value
        });
      }

    return (
        <PopupWithForm name="create" title="Новое место" btnText="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
          <label htmlFor="title" className="popup__label">
            <input name="title" id="title" className="popup__input" placeholder="Название" required minLength="2" maxLength="30" ref={name} />
            <span className="popup__input-error" id="title-error"></span>
          </label>
          <label htmlFor="link" className="popup__label">
            <input type="url" name="link" id="link" className="popup__input" placeholder="Ссылка на картинку" required ref={link}/>
            <span className="popup__input-error" id="link-error"></span>
          </label>
        </PopupWithForm>
    );
}