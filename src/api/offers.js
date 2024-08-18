import axios from "axios";

const BASE_URL = "https://api.deepspacestore.com/offers";

export const getOffer = async (offerCode) => {
  try {
    const response = await axios.get(`${BASE_URL}/${offerCode}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar oferta:", error);
    throw error;
  }
};

export const postOffer = async (offerCode, payload) => {
  try {
    const response = await axios.post(
      `https://api.deepspacestore.com/offers/${offerCode}/create_order`,
      payload,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return response;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else {
      throw new Error("Erro desconhecido");
    }
  }
};

export const getOrder = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/1`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    throw error;
  }
};
