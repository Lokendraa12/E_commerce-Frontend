import API from "./api";

export const getAllShirts = () => API.get("/shirts");
export const getShirtById = (id) => API.get(`/shirts/${id}`);
