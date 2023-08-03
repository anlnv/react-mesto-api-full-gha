import AuthForm from "./AuthForm";

const Login = (props) => {
  return (
    <>
      <AuthForm
        header="Вход"
        buttonText="Войти"
        hidden={true}
        handleSubmit={props.onLogin}
        passwordInput={props.passwordInput}
        emailInput={props.emailInput}
        handleChangeInput={props.handleChangeInput}
      />
    </>
  );
};
export default Login;