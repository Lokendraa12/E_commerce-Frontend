import API from "./api";

/* GET ALL jeans */
export const getAllJeans = () => API.get("/jeans");

/* GET jeans BY ID */
export const getJeansById = (id) => API.get(`/jeans/${id}`);
