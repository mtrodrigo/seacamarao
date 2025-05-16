import axios from "axios";

export default axios.create({
  baseURL: "https://seacamarao-api.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});
