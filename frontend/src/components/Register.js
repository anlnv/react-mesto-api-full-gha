import AuthForm from "./AuthForm";

const Register = (props) => {
   return (
    <>
      <AuthForm
        header="Регистрация"
        buttonText="Зарегистрироваться"
        hidden={false}
        handleSubmit={props.onRegister}
        passwordInput={props.passwordInput}
        emailInput={props.emailInput}
        handleChangeInput={props.handleChangeInput}
      />
    </>
  );
};
export default Register;