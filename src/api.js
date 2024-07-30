import axios from "axios";

const base_url = "http://127.0.0.1:8000";
// const base_url = "https://modemixerapi.azurewebsites.net";

export const get_collections = async (limit, offset) => {
  try {
    const response = await axios.get(`${base_url}/collections`, {
      params: {
        limit,
        offset,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
};

export const generate_collection = async (
  collection_name,
  collection_description
) => {
  try {
    const response = await axios.post(
      `${base_url}/collections/generate_collection`,
      {
        name: collection_name,
        description: collection_description,
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error generating collection:", error);
    throw error;
  }
};

export const check_endpoint_status = async (collection_id) => {
  try {
    const response = await axios.get(
      `${base_url}/collections/${collection_id}/status`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error checking collection status:", error);
    throw error;
  }
};

export const generate_collection_description = async (collection_title) => {
  console.log(collection_title);
  try {
    const response = await axios.post(
      `${base_url}/collections/generate_collection_description`,
      {
        name: collection_title,
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error generating collection description:", error);
    throw error;
  }
};

export const get_items = async (collection_id) => {
  try {
    const response = await axios.get(`${base_url}/items`, {
      params: {
        collection_id: collection_id,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
};

export const get_items_by_id = async (item_id) => {
  try {
    const response = await axios.get(`${base_url}/items`, {
      params: {
        item_id: item_id,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
};

export const deleteCollection = async (collection_id) => {
  try {
    const response = await axios.delete(`${base_url}/collections`, {
      params: {
        collection_id: collection_id,
      },
    });
    console.log("Collection deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting collection:", error);
    throw error;
  }
};

export const deleteItem = async (item_id) => {
  try {
    const response = await axios.delete(`${base_url}/items`, {
      params: {
        item_id: item_id,
      },
    });
    console.log("Item deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};

export const generate_item = async (
  item_name,
  item_description,
  womanswear,
  item_id
) => {
  try {
    console.log(item_id);
    console.log(item_name);
    console.log(item_description);
    console.log(womanswear);
    const response = await axios.put(`${base_url}/items/generate`, {
      title: item_name,
      description: item_description,
      womanswear: womanswear,
      id: item_id,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error generating item:", error);
    throw error;
  }
};

export const generate_techpack = async (
  item_name,
  item_description,
  womanswear,
  item_id,
  image_urls
) => {
  try {
    console.log(item_id);
    console.log(item_name);
    console.log(item_description);
    console.log(womanswear);
    const response = await axios.put(`${base_url}/items/generate_techpack`, {
      title: item_name,
      description: item_description,
      womanswear: womanswear,
      id: item_id,
      image_urls: image_urls,
    });
    console.log("RESPONSE");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error generating item:", error);
    throw error;
  }
};
