import logo from '../images/header-logo-white.svg';
import { Link, Route, Routes } from 'react-router-dom';

function Header(props) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="логотип header" />

            <Routes>
                <Route exact path="/sign-in" element={
                    <Link to="/sign-up" className="header__link">
                        Регистрация
                    </Link>} >
                </Route>
                
                <Route exact path="/sign-up" element={
                    <Link to="/sign-in" className="header__link">
                        Войти
                    </Link>} >
                </Route>

                <Route exact path="/" element={
                    <div className="header__user-info">
                        <p className="header__email">{props.userEmail}</p>
                        <Link
                            to="/sign-in"
                            className="header__link"
                            onClick={props.onSignOut}
                        >
                            Выйти
                        </Link>
                    </div>
                } >
                </Route>

            </Routes>

        </header>
    );
}

export default Header;