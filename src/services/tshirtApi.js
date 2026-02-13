import API from "./api";

// Public
export const getAllTshirts = () => API.get("/tshirts");
export const getTshirtById = (id) => API.get(`/tshirts/${id}`);

// Admin (token required)