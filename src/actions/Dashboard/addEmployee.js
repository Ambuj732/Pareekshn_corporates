import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const addEmployee = async (data) => {
  try {
    console.log(data);
    const formData = new FormData();
    formData.append("file", data?.file);
    formData.append("id_corp", data.id_corp);
    formData.append("usercode", data.usercode);
    formData.append("emp_name", data.emp_name);
    formData.append("emp_designation", data.emp_designation);
    formData.append("about_emp", data.about_emp);
    formData.append("attachment", data.attachment);
    formData.append("req_by", data.req_by);

    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/corporate/addEmployee?`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log(" Add Employee  response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while logging in Adding Employee :: ", error);
    throw error;
  }
};

export default addEmployee;
