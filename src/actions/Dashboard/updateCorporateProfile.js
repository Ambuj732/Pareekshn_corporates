import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const updateCorporateProfile = async (data) => {
  try {
    const queryString = Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join("&");
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/corporate/updateProfile?${queryString}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Fetch Corporate Update Profile response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while logging in Fetch Corporate Profile :: ", error);
    throw error;
  }
};

export default updateCorporateProfile;
