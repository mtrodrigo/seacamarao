import { HeaderBottom } from "../../../components/buttons/HeaderBottom";
import RegisterContainer from "../../../components/containers/RegisterContainer";
import { InputLoginRegister } from "../../../components/input/InputLoginRegister";
import { useForm } from "react-hook-form";
import { LoginRegisterButton } from "../../../components/buttons/LoginRegisterButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import api from "../../../utils/api";
import toast from "react-hot-toast";

const schema = z.object({
  image: z.instanceof(File, { message: "A imagem é obrigatória" }),
  name: z.string().min(1, "O nome é obrigatório"),
  code: z.string().min(1, "O código é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  price: z
    .string()
    .min(1, "O preço é obrigatório")
    .transform((value) => value.replace(",", "."))
    .refine((value) => /^\d+(\.\d{1,2})?$/.test(value), {
      message: "O preço deve estar no formato de dinheiro (ex: 10.99)",
    })
    .transform((value) => parseFloat(value)),
});

type FormData = z.infer<typeof schema>;

const ProductRegister = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<File | null>();
  const [token] = useState(localStorage.getItem("seacamarao-token"));
  const navigate = useNavigate();

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve(reader.result?.toString().split(",")[1] || "");
      reader.onerror = (error) => reject(error);
    });
  };

  const handleRegister = async (data: FormData) => {
    setLoading(true);

    const formData = new FormData();

    if (data.image instanceof File) {
      const base64Image = await convertToBase64(data.image);
      formData.append("image", base64Image);
    }

    formData.append("name", data.name);
    formData.append("code", data.code);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());

    try {
      const response = await api.post("/products/create", formData, {
        headers: {
          Authorization: `Bearer ${token ? JSON.parse(token) : ""}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.data) {
        setPreview(null);
      }
      navigate("/")
      toast.success("Produto cadastrado com sucesso");
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Erro ao cadastrar produto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <div className="flex w-full items-center justify-start">
        <HeaderBottom to="/restricted/dashboard" text="Voltar" />
      </div>
      <h1 className="text-2xl text-zinc-200 font-bold mb-5">
        Cadastro de produtos
      </h1>
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="flex flex-col items-center justify-center text-zinc-200 space-y-2">
          {preview && (
            <img
              className="max-w-52"
              src={URL.createObjectURL(preview)}
              alt={preview.name}
            />
          )}
          <input
            type="file"
            name="image"
            className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-zinc-200 file:text-orange-600 hover:file:bg-zinc-300"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setValue("image", file);
                setPreview(file);
              }
            }}
          />
          <small className="text-red-500">{errors.image?.message}</small>
        </div>
        <InputLoginRegister
          label="Nome do produto"
          type="text"
          name="name"
          register={register}
        />
        <small className="text-red-500">{errors.name?.message}</small>
        <div className="flex gap-5">
          <div className="w-full">
            <InputLoginRegister
              label="Código do produto"
              type="text"
              name="code"
              register={register}
            />
            <small className="text-red-500">{errors.code?.message}</small>
          </div>
          <div className="w-full">
            <InputLoginRegister
              label="Preço do produto"
              type="text"
              name="price"
              register={register}
            />
            <small className="text-red-500">{errors.price?.message}</small>
          </div>
        </div>
        <InputLoginRegister
          label="Descrição do produto"
          type="text"
          name="description"
          register={register}
        />
        <small className="text-red-500">{errors.description?.message}</small>
        <div className="flex items-center justify-center mt-5">
          {loading ? (
            <div className="my-8">
              <CircularProgress size={18} sx={{ color: "#e4e4e7" }} />
            </div>
          ) : (
            <LoginRegisterButton text="Entrar" />
          )}
        </div>
      </form>
    </RegisterContainer>
  );
};

export default ProductRegister;
