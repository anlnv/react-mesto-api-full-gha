import PopupWithForm from "./PopupWithForm";
import { createRef, useEffect } from "react";

export default function EditAvatarPopup(props){

    const avatar = createRef();

    useEffect(() => {
        avatar.current.value = "";
      }, [avatar, props.isOpen]);
    

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: avatar.current.value,
        });
      }


    return(
        
        <PopupWithForm name="avatar" title="Обновить аватар" btnText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
          <label htmlFor="avatar" className="popup__label">
            <input type="url" name="avatar" id="avatar" className="popup__input" placeholder="Ссылка" required ref={avatar} />
            <span className="popup__input-error" id="avatar-error"></span>
          </label>
        </PopupWithForm>
    );

}