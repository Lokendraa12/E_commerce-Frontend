import API from "./api";    

export const getAllInnerwear = () => API.get("/innerwear");

export const getInnerwearById = (id) => API.get(`/innerwear/${id}`);