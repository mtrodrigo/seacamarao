import { HeaderBottom } from "../../../components/buttons/HeaderBottom";
import RegisterContainer from "../../../components/containers/RegisterContainer";
import { InputLoginRegister } from "../../../components/input/InputLoginRegister";
import { useForm } from "react-hook-form";
import { LoginRegisterButton } from "../../../components/buttons/LoginRegisterButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import api from "../../../utils/api";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";

// Schema modificado para edição
const editProductSchema = z.object({
  image: z.union([z.instanceof(File), z.string().min(1)]).optional(),
  name: z.string().min(1, "O nome é obrigatório"),
  code: z.string().min(1, "O código é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  price: z
    .string()
    .min(1, "O preço é obrigatório")
    .transform((value) => value.replace(",", "."))
    .refine((value) => /^\d+(\.\d{1,2})?$/.test(value), {
      message: "O preço deve estar no formato de dinheiro (ex: 10.99)",
    }),
});

type FormData = z.infer<typeof editProductSchema>;

const EditProduct = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(editProductSchema),
    mode: "onChange",
  });

  const [loading, setLoading] = useState({ initial: true, submit: false });
  const [preview, setPreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const imageFile = watch("image");

  const getAuthToken = (): string | null => {
    const token = localStorage.getItem("seacamarao-token");
    return token ? JSON.parse(token) : null;
  };

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      toast.error("Sessão expirada. Faça login novamente.");
      navigate("/login");
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const product = response.data;
        setExistingImage(product.image);
        setPreview(product.image);

        reset({
          name: product.name,
          code: product.code,
          description: product.description,
          price: product.price.toString(),
          image: product.image,
        });
      } catch (error: unknown) {
        console.error("Erro ao carregar produto:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Erro ao carregar produto";
        toast.error(errorMessage);
        navigate("/restricted/dashboard");
      } finally {
        setLoading((prev) => ({ ...prev, initial: false }));
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, reset, navigate]);

  useEffect(() => {
    if (imageFile instanceof File) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(imageFile);
    } else if (typeof imageFile === "string") {
      setPreview(imageFile);
    }
  }, [imageFile]);

  const onSubmit = async (data: FormData) => {
    const token = getAuthToken();
    if (!token) {
      toast.error("Sessão expirada. Faça login novamente.");
      navigate("/login");
      return;
    }

    setLoading((prev) => ({ ...prev, submit: true }));

    try {
      const formData = new FormData();
      const priceValue = parseFloat(data.price.toString().replace(",", "."));

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      formData.append("name", data.name);
      formData.append("code", data.code);
      formData.append("description", data.description);
      formData.append("price", priceValue.toString());

      const response = await api.patch(`/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        toast.success("Produto atualizado com sucesso");
        navigate("/restricted/products/showproducts");
      }
    } catch (error: unknown) {
      console.error("Erro ao editar produto:", error);
      let errorMessage = "Erro ao editar produto";

      if (typeof error === "object" && error !== null && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        errorMessage = axiosError.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  const deleteProduct = async () => {
    const token = getAuthToken();
    if (!token) {
      toast.error("Sessão expirada. Faça login novamente.");
      navigate("/login");
      return;
    }

    setLoading((prev) => ({ ...prev, submit: true }));

    try {
      const response = await api.delete(`/products/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        toast.success("Produto apagado com sucesso");
        navigate("/restricted/products/showproducts");
      }
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Erro ao apagar produto");
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  if (loading.initial) {
    return (
      <RegisterContainer>
        <div className="flex justify-center items-center h-full">
          <CircularProgress size={24} sx={{ color: "#e4e4e7" }} />
        </div>
      </RegisterContainer>
    );
  }

  return (
    <RegisterContainer>
      <div className="flex w-full items-center justify-start">
        <HeaderBottom to="/restricted/products/showproducts" text="Voltar" />
      </div>
      <h1 className="text-2xl text-zinc-200 font-bold mb-5">Editar Produto</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center text-zinc-200 space-y-2">
          {preview && (
            <img className="max-w-52" src={preview} alt="Imagem do produto" />
          )}
          <input
            type="file"
            className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-zinc-200 file:text-orange-600 hover:file:bg-zinc-300"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setValue("image", file);
              } else if (existingImage) {
                setValue("image", existingImage);
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
        <div className="flex flex-col w-full">
          <label htmlFor="description" className="text-zinc-200 text-sm mb-1">
            Descrição do produto
          </label>
          <textarea
            className="w-full p-2 rounded-lg bg-zinc-800 text-zinc-200 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-600"
            rows={4}
            {...register("description")}
          />
        </div>
        <small className="text-red-500">{errors.description?.message}</small>
        <div className="flex items-center justify-between mt-5">
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
              onClick={deleteProduct}
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

export default EditProduct;
