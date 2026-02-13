import API from "./api";

export const getAllShoes = () => API.get("/shoes");
export const getShoesById = (id) => API.get(`/shoes/${id}`);