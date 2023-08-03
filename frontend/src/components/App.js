import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../context/CurrentUserContext';
import { api } from '../utils/Api';

import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from "./InfoTooltip";
import { authorization, register, checkToken } from '../utils/Auth';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState({
    name: " ",
    about: " ",
    avatar: " ",
    _id: " ",
  });
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [registrated, setRegistrated] = useState(false);
  const [userEmail, setUserEmail] = useState("email@yandex.ru");
  const [authorizationData, setAuthorizationData] = useState({
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    checkToken(jwt)
      .then((response) => {
        setUserEmail(response.email);
        setLoggedIn(true);
      }).then(() => navigate("/"))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    tokenCheck();
    api
      .getUserInfoFromServer()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((error) => {
        console.log(error);
      });

    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch(err => console.log(err));
  }, []);

  const logOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate('/sign-in');
  }

  const handleLogin = () => {
    const { password, email } = authorizationData;
    authorization(password, email)
      .then((response) => {
        if (response.token) {
          localStorage.setItem("jwt", response.token);
          setUserEmail(email);
          setLoggedIn(true);
          navigate("/");
        }
      })
      .then(() => {
        setAuthorizationData({ password: "", email: "" });
      })
      .catch((err) => console.error(err));
  };

  const handleRegister = () => {
    setRegistrated(false);
    const { password, email } = authorizationData;
    register(password, email)
      .then((response) => {
        if (response.email) {
          setRegistrated(true);
          navigate("/sign-in");
        }
      })
      .then(() => {
        setAuthorizationData({ password: "", email: "" });
      })
      .catch((err) => console.error(err))
      .finally(() => setIsInfoTooltipOpen(true));
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setAuthorizationData((data) => ({
      ...data,
      [name]: value,
    }));
  };












  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }


  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link });
  }

  const handleUpdateUser = (user) => {
    api
      .setUserInfo(user)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => closeAllPopups())
      .catch((error) => console.log(error));
  };

  const handleUpdateAvatar = (avatar) => {
    api
      .editAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => closeAllPopups())
      .catch((error) => console.log(error));
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch((error) => console.log(error));
  };

  return (
    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>
        <Header userEmail={userEmail} onSignOut={logOut}/>
        <Routes >

          <Route
            path='/sign-up'
            element={
              <Register
                onRegister={handleRegister}
                passowrdInput={authorizationData.password}
                emailInput={authorizationData.email}
                handleChangeInput={handleChangeInput}
              />
            }
          />
          <Route
            path='/sign-in'
            element={
              <Login
                onLogin={handleLogin}
                passowrdInput={authorizationData.password}
                emailInput={authorizationData.email}
                handleChangeInput={handleChangeInput}
              />
            }
          />
          <Route path="/" element={<ProtectedRoute cards={cards} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} loggedIn={loggedIn} element={Main} />} />

        </Routes>

        {loggedIn && <Footer />}




        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <PopupWithForm name="delete" title="Вы уверены?" btnText="Да" onClose={closeAllPopups} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          name="info"
          containerType="infoTooltip"
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isOk={registrated}
        />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
