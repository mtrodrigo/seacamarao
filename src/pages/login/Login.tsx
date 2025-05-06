import { InputLoginRegister } from "../../components/input/InputLoginRegister";
import LoginContainer from "../../components/containers/LoginContainer";
import { LoginRegisterButton } from "../../components/buttons/LoginRegisterButton";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { z } from "zod";
import { Context } from "../../contexts/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CircularProgress } from "@mui/material";

const schema = z.object({
  email: z
    .string()
    .email("Formato de e-mail inválido")
    .nonempty("O campo e-mail é obrigatório"),
  password: z.string().nonempty("O campo senha é obrigatório"),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login, authenticated } = useContext(Context);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), mode: "onChange" });

  if (authenticated) {
    navigate("/");
  }

  const handleLogin = async (data: FormData) => {
    setIsLoading(true);
    try {
      await login(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <h1 className="text-2xl text-zinc-200 font-bold">Entrar</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="w-9/10">
          <InputLoginRegister
            label="Digite seu e-mail"
            type="email"
            name="email"
            register={register}
          />
          <small className="text-sm text-red-500">
            {errors.email?.message}
          </small>
        </div>
        <div className="w-9/10">
          <InputLoginRegister
            label="Digite sua senha"
            type="password"
            name="password"
            register={register}
          />
          <small className="text-sm text-red-500">
            {errors.password?.message}
          </small>
        </div>
        <div className="flex items-center justify-center">
          {isLoading ? (
            <div className="my-8">
              <CircularProgress size={18} sx={{ color: '#e4e4e7' }} />
            </div>
          ) : (
            <LoginRegisterButton text="Entrar" />
          )}
        </div>
      </form>
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
