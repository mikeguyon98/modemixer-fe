import axios from "axios";

const base_url = "http://127.0.0.1:8000";

export const get_collections = async (limit, offset) => {
  try {
    const response = await axios.get(`${base_url}/collections`, {
      params: {
        limit,
        offset
      }
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
};

export const generate_collection = async (collection_name, collection_description) => {
  try {
    const response = await axios.post(`${base_url}/collections/generate_collection`, {
      name: collection_name,
      description: collection_description
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error generating collection:", error);
    throw error;
  }
};

export const check_endpoint_status = async (collection_id) => {
  try {
    const response = await axios.get(`${base_url}/collections/${collection_id}/status`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error checking collection status:", error);
    throw error;
  }
};

export const generate_collection_description = async (collection_title) => {
  console.log(collection_title)
  try {
    const response = await axios.post(`${base_url}/collections/generate_collection_description`, {
      name: collection_title
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error generating collection description:", error);
    throw error;
  }
};

export const get_items = async (collection_id) => {
  try {
    const response = await axios.get(`${base_url}/items`,
      {
        params: {
          collection_id: collection_id
        }
      });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
};
