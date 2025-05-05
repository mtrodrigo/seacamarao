import { InputLoginRegister } from "../../components/input/InputLoginRegister";
import LoginContainer from "../../components/containers/LoginContainer";
import { LoginRegisterButton } from "../../components/buttons/LoginRegisterButton";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <LoginContainer>
      <h1 className="text-2xl text-zinc-200 font-bold">Entrar</h1>
      <div className="w-9/10">
        <InputLoginRegister label="Digite seu e-mail" type="email" />
      </div>
      <div className="w-9/10">
        <InputLoginRegister label="Digite sua senha" type="password" />
      </div>
      <LoginRegisterButton text="Entrar" />
      <p className="text-zinc-200 mt-5">
        Não tem cadasdastro clique{" "}
        <a
          className="text-orange-600 cursor-pointer"
          onClick={() => navigate("/register")}
        >
          aqui
        </a>
      </p>
    </LoginContainer>
  );
};

export default Login;
