import axios from "axios";

const URL_API = process.env.URL_API

export default axios.create({
  baseURL: URL_API,
  headers: {
    "Content-Type": "application/json",
  },
});
