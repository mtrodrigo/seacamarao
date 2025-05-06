import { InputLoginRegister } from "../../components/input/InputLoginRegister";
import RegisterContainer from "../../components/containers/RegisterContainer";
import { LoginRegisterButton } from "../../components/buttons/LoginRegisterButton";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import api from "../../utils/api";
import { CircularProgress } from "@mui/material";

type CheckCepEvent = React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>;

const schema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.string().email("E-mail inválido").nonempty("E-mail é obrigatório"),
  password: z.string().nonempty("Senha é obrigatório"),
  confirmpassword: z.string().nonempty("Confirmação de senha é obrigatório"),
  cpf_cnpj: z
    .string()
    .min(11, "CPF ou CNPJ apenas números")
    .max(14, "CPF ou CNPJ apenas números"),
  address: z.string().nonempty("Endereço é obrigatório"),
  city: z.string().nonempty("Cidade é obrigatório"),
  state: z.string().nonempty("Estado é obrigatório"),
  phone: z.string().nonempty("Telefone é obrigatório"),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  const checkCep = (e: CheckCepEvent): void => {
    if (e.target instanceof HTMLInputElement) {
      const cep: string = e.target.value.replace(/\D/g, "");
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao buscar CEP");
          }
          console.log("response", response);

          return response.json();
        })
        .then((data) => {
          if (data.erro) {
            toast.error("CEP não encontrado");
            return;
          }
          setValue("address", data.logradouro);
          setValue("city", data.localidade);
          setValue("state", data.uf);
        })
        .catch((error) => {
          console.error("Erro: ", error);
          toast.error("Erro ao buscar CEP");
        });
    }
  };

  const registerUser = async (data: FormData) => {
    setIsLoading(true);

    try {
      await api.post("/users/register", data);
      navigate("/login");
      toast.success("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Erro ao cadastrar");
      setIsLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <h1 className="text-2xl text-zinc-200 font-bold">Registrar</h1>
      <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit(registerUser)}>
        <div className="flex flex-col w-9/10 sm:flex-row gap-0 sm:gap-10">
          <InputLoginRegister
            label="Digite seu nome"
            type="text"
            name="name"
            register={register}
            error={errors.name?.message}
          />
          <InputLoginRegister
            label="Digite seu e-mail"
            type="email"
            name="email"
            register={register}
          />
        </div>
        <div className="flex flex-col w-9/10 sm:flex-row gap-0 sm:gap-10">
          <InputLoginRegister
            label="Digite sua senha"
            type="password"
            name="password"
            register={register}
          />
          <InputLoginRegister
            label="Confirme sua senha"
            type="password"
            name="confirmpassword"
            register={register}
          />
        </div>
        <div className="flex flex-col w-9/10 sm:flex-row gap-0 sm:gap-10">
          <InputLoginRegister
            label="CPF ou CNPJ"
            type="text"
            name="cpf_cnpj"
            register={register}
          />
          <InputLoginRegister
            label="Digite seu CEP "
            type="text"
            name="cep"
            onBlur={checkCep}
            register={register}
          />
        </div>
        <div className="flex flex-col w-9/10 sm:flex-row gap-0 sm:gap-10">
          <InputLoginRegister
            label="Digite seu endereço...Rua, Avenida, número"
            type="text"
            name="address"
            register={register}
          />
        </div>
        <div className="flex flex-col w-9/10 sm:flex-row gap-0 sm:gap-10">
          <InputLoginRegister
            label="Cidade "
            type="text"
            name="city"
            register={register}
          />
          <InputLoginRegister
            label="Estado"
            type="text"
            name="state"
            register={register}
          />
          <InputLoginRegister
            label="Telefone"
            type="text"
            name="phone"
            register={register}
          />
        </div>
        <div className="flex items-center justify-center">
          {isLoading ? (
            <div className="my-8">
              <CircularProgress size={18} sx={{ color: "#e4e4e7" }} />
            </div>
          ) : (
            <LoginRegisterButton text="Cadastrar" />
          )}
        </div>
      </form>
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
