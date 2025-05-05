import { useEffect, useState } from "react";
import api from "../../utils/api";
import { CircularProgress } from "@mui/material";
import { ProductCardDetail } from "../../components/cards/ProductCardDetail";
import { useParams } from "react-router-dom";
import { ProductsProps } from "../home/Home";

const Details = () => {
    const { id } = useParams()
    const [product, setProduct] = useState<ProductsProps | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        api.get(`/products/${id}`)
        .then((response) => {
            setProduct(response.data)
            setLoading(false)
        })
        .catch((error) => {
            console.error("Error: ", error);
        })
    }, [])

    if (loading) {
        return <CircularProgress style={{ color: "#e4e4e7" }} size={40} />;
    }

    return(
            <ProductCardDetail 
                src={product?.image || ""}
                name={product?.name || ""}
                price={typeof product?.price === "number" ? product.price : parseFloat(product?.price || "0")}
                description={product?.description || ""}
            />
    )
}

export default Details