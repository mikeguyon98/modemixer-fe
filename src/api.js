import axios from "axios";

const base_url = "http://127.0.0.1:8000";

export const get_collections = async () => {
  try {
    const response = await axios.get(`${base_url}/collections`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
};

export const get_items = async () => {
  try {
    const response = await axios.get(`${base_url}/items`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
};
