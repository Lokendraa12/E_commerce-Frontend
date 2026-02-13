import API from "./api";

/* GET ALL TROUSERS */
export const getAllTrousers = () => API.get("/trousers");

/* GET TROUSER BY ID */
export const getTrouserById = (id) => API.get(`/trousers/${id}`);
