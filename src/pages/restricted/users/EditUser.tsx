import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../../utils/api";
import RegisterContainer from "../../../components/containers/RegisterContainer";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputLoginRegister } from "../../../components/input/InputLoginRegister";
import { LoginRegisterButton } from "../../../components/buttons/LoginRegisterButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { HeaderBottom } from "../../../components/buttons/HeaderBottom";

const schema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.string().email("E-mail inválido").nonempty("E-mail é obrigatório"),
  cpf_cnpj: z
    .string()
    .min(11, "CPF ou CNPJ apenas números")
    .max(14, "CPF ou CNPJ apenas números"),
  address: z.string().nonempty("Endereço é obrigatório"),
  city: z.string().nonempty("Cidade é obrigatório"),
  state: z.string().nonempty("Estado é obrigatório"),
  phone: z.string().nonempty("Telefone é obrigatório"),
  administrator: z.boolean(),
});

// Define the type for our form data
type FormData = z.infer<typeof schema>;

const EditUser = () => {
  const { id } = useParams();
  const [token] = useState(localStorage.getItem("seacamarao-token"));
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      administrator: false,
    },
  });
  const [loading, setLoading] = useState({ initial: true, submit: false });
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("Sessão expirada. Faça login novamente.");
      navigate("/login");
      return;
    }
    api
      .get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token ? JSON.parse(token) : ""}`,
        },
      })
      .then((response) => {
        reset({
          ...response.data,
          administrator: response.data.administrator || false,
        });
        setLoading((prev) => ({ ...prev, initial: false }));
      })
      .catch((error) => {
        toast.error("Erro ao carregar o usuário");
        console.error("Error: ", error);
        setLoading((prev) => ({ ...prev, initial: false }));
      });
  }, [id, token, reset, navigate]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!token) {
      toast.error("Sessão expirada. Faça login novamente.");
      navigate("/login");
      return;
    }

    setLoading((prev) => ({ ...prev, submit: true }));

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("cpf_cnpj", data.cpf_cnpj);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("phone", data.phone);
      formData.append("administrator", data.administrator.toString());

      const response = await api.patch(`/users/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token ? JSON.parse(token) : ""}`,
        },
      });

      if (response.data) {
        toast.success("Usuário atualizado com sucesso");
        navigate(`/restricted/users/userdetails/${id}`);
      }
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Erro ao editar o usuário");
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  if (loading.initial) {
    return (
      <RegisterContainer>
        <div className="flex justify-center items-center h-64">
          <CircularProgress style={{ color: "#e4e4e7" }} size={40} />
        </div>
      </RegisterContainer>
    );
  }

  return (
    <RegisterContainer>
      <div className="flex w-full items-center justify-start">
        <HeaderBottom
          to={`/restricted/users/userdetails/${id}`}
          text="Voltar"
        />
      </div>
      <h1 className="text-2xl text-zinc-200 font-bold">Editar usuário</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center"
      >
        <div className="flex flex-col w-9/10 sm:flex-row gap-0 sm:gap-10">
          <div className="w-full">
            <InputLoginRegister
              label="Digite seu nome"
              type="text"
              name="name"
              register={register}
            />
            <small className="text-red-500">
              {errors && errors.name?.message}
            </small>
          </div>
          <div className="w-full">
            <InputLoginRegister
              label="Digite seu e-mail"
              type="email"
              name="email"
              register={register}
            />
            <small className="text-red-500">
              {errors && errors.email?.message}
            </small>
          </div>
        </div>
        <div className="flex flex-col w-9/10 sm:flex-row gap-0 sm:gap-10">
          <div className="w-full">
            <InputLoginRegister
              label="CPF ou CNPJ"
              type="text"
              name="cpf_cnpj"
              register={register}
            />
            <small className="text-red-500">
              {errors && errors.cpf_cnpj?.message}
            </small>
          </div>
        </div>
        <div className="flex flex-col w-9/10 sm:flex-row gap-0 sm:gap-10">
          <div className="w-full">
            <InputLoginRegister
              label="Digite seu endereço...Rua, Avenida, número"
              type="text"
              name="address"
              register={register}
            />
            <small className="text-red-500">
              {errors && errors.address?.message}
            </small>
          </div>
        </div>
        <div className="flex flex-col w-9/10 sm:flex-row gap-0 sm:gap-10">
          <div className="w-full">
            <InputLoginRegister
              label="Cidade "
              type="text"
              name="city"
              register={register}
            />
            <small className="text-red-500">
              {errors && errors.city?.message}
            </small>
          </div>
          <div className="w-full">
            <InputLoginRegister
              label="Estado"
              type="text"
              name="state"
              register={register}
            />
            <small className="text-red-500">
              {errors && errors.state?.message}
            </small>
          </div>
          <div className="w-full">
            <InputLoginRegister
              label="Telefone"
              type="text"
              name="phone"
              register={register}
            />
            <small className="text-red-500">
              {errors && errors.phone?.message}
            </small>
          </div>
        </div>
        <div className="mt-3">
          <FormControlLabel
            control={
              <Checkbox
                checked={watch("administrator")}
                onChange={(e) => setValue("administrator", e.target.checked)}
                sx={{
                  color: "#f97316",
                  "&.Mui-checked": {
                    color: "#f97316",
                  },
                  "&:hover": {
                    color: "#ea580c",
                  },
                }}
              />
            }
            label="Administrador"
            className="text-zinc-200"
          />
        </div>
        <div className="w-full flex items-center justify-between mt-5">
          {loading.submit ? (
            <div className="my-8">
              <CircularProgress size={18} sx={{ color: "#e4e4e7" }} />
            </div>
          ) : (
            <LoginRegisterButton text="Salvar Alterações" />
          )}
          {loading.submit ? (
            <div className="my-8">
              <CircularProgress size={18} sx={{ color: "#e4e4e7" }} />
            </div>
          ) : (
            <Button
              onClick={() => {}}
              variant="outlined"
              color="warning"
              startIcon={<DeleteIcon />}
            >
              Apagar
            </Button>
          )}
        </div>
      </form>
    </RegisterContainer>
  );
};

export default EditUser;
