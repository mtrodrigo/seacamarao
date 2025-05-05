import { InputLoginRegister } from "../../components/input/InputLoginRegister";
import RegisterContainer from "../../components/containers/RegisterContainer";
import { LoginRegisterButton } from "../../components/buttons/LoginRegisterButton";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  return (
    <RegisterContainer>
      <h1 className="text-2xl text-zinc-200 font-bold">Registrar</h1>
      <div className="flex flex-col w-9/10 sm:flex-row gap-0 sm:gap-10">
        <InputLoginRegister label="Digite seu nome" type="text" />
        <InputLoginRegister label="Digite seu e-mail" type="email" />
      </div>
      <div className="flex flex-col w-9/10 sm:flex-row gap-0 sm:gap-10">
        <InputLoginRegister label="Digite sua senha" type="password" />
        <InputLoginRegister label="Confirme sua senha" type="password" />
      </div>
      <div className="flex flex-col w-9/10 sm:flex-row gap-0 sm:gap-10">
        <InputLoginRegister label="Digite seu CPF ou CNPJ " type="text" />
        <InputLoginRegister label="Digite seu CEP " type="text" />
      </div>
      <div className="flex flex-col w-9/10 sm:flex-row gap-0 sm:gap-10">
        <InputLoginRegister
          label="Digite seu endereço...Rua, Avenida, número"
          type="text"
        />
      </div>
      <div className="flex flex-col w-9/10 sm:flex-row gap-0 sm:gap-10">
        <InputLoginRegister label="Cidade " type="text" />
        <InputLoginRegister label="Estado" type="text" />
        <InputLoginRegister label="Telefone" type="text" />
      </div>

      <LoginRegisterButton text="Cadastrar" />
      <p className="text-zinc-200 ">
        Já tem cadasdastro clique{" "}
        <a
          className="text-orange-600 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          aqui
        </a>
      </p>
    </RegisterContainer>
  );
};

export default Register;
