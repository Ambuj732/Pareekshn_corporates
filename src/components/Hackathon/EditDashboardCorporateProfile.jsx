import React, { useState, useEffect } from "react";
import arrowDown from "../../assets/Hackathon/arrowDown.png";
import close from "../../assets/Hackathon/close.png";
import { useForm } from "react-hook-form";
import { IoPerson } from "react-icons/io5";
import getCities from "../../actions/LoginScreens/getCities";
import getStates from "../../actions/LoginScreens/getStates";
import getCorporateSizeData from "../../actions/Dashboard/getCorporateSize";
import getIndustry from "../../actions/MasterDataApi/getIndustry";
import getCorporateStageData from "../../actions/Dashboard/getCorporateStage";
import updateCorporateProfile from "../../actions/Dashboard/updateCorporateProfile";
import updateUsernameAndUserId from "../../actions/Dashboard/updateUsernameAndUserId";
import changeEmail from "../../actions/Dashboard/changeEmail";
import verifyEmailOTP from "../../actions/Dashboard/verifyEmailOTP";
import changeMobile from "../../actions/Dashboard/changeMobile";
import verifyOTPMobile from "../../actions/Dashboard/verifyOTPMobile";
const EditDashboardCorporateProfile = ({ closeModal }) => {
  const { register, handleSubmit } = useForm();
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [corporateSize, setCoporateSize] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [corporateStage, setCorporateStage] = useState([]);
  const [erros, setErrors] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpSent2, setOtpSent2] = useState(false);
  const preData = async () => {
    try {
      const indianStates = await getStates();
      setStates(indianStates?.data?.states);
    } catch (error) {
      console.log(
        "Error while getting highest qualification or states :: ",
        error
      );
    }
  };

  const getCitiesHandler = async (id) => {
    try {
      console.log("Id :: ", id);
      const data = {
        id_state: id,
      };
      console.log(data);
      const response = await getCities(data);
      setDistricts(response?.data?.cities);
      console.log("Cities :: ", response?.data?.cities);
    } catch (error) {
      console.log("Error while getting cities :: ", error);
    }
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    console.log(stateId);
    setSelectedState(stateId);
    getCitiesHandler(stateId);
    console.log("State :: ", stateId);
  };

  const getCorporateSize = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("user:", user);
      const response = await getCorporateSizeData();
      console.log("Corporate Size res", response);
      if (response?.data?.code === 1000)
        setCoporateSize(response?.data?.corp_size);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const getIndustryData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const response = await getIndustry();
      console.log("Sector data", response);
      if (response?.data?.code === 1000)
        setIndustry(response?.data?.industries);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const getCorporateStage = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("user:", user);
      const response = await getCorporateStageData();
      console.log("Corporate Stage res", response);
      if (response?.data?.code === 1000)
        setCorporateStage(response?.data?.stages);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const corporateEditHandler = async (formData) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      console.log("form data is ", formData);
      const data = {
        id_corp: user.id,
        usercode: user.token,
        id_city: Number(formData?.district),
        id_industry: Number(formData?.industry_related),
        founded_year: Number(formData?.founded_year),
        corporate_location: formData?.location,
        id_corporate_stage: Number(formData?.corporate_stage),
        id_state: Number(formData?.state),
        id_corporate_size: Number(formData?.corporate_size),
      };
      await updateCorporateProfile(data);
      console.log("Data", data);
    } catch (error) {
      console.log("Error while logging with formData :: ", error);
    }
  };

  const userNameAndUserIdHandler = async (formData) => {
    try {
      console.log(formData);
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        id_corp: user?.id,
        usercode: user?.usercode,
        name: formData?.Corporate_name,
        userID: formData?.userid,
        password: formData?.password,
      };
      await updateUsernameAndUserId(data);
      console.log("Data", data);
    } catch (error) {
      console.log("Error while logging with formData :: ", error);
    }
  };

  const changeEmailIdHandler = async (formData) => {
    try {
      console.log(formData);
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        id_corp: user?.id,
        usercode: user?.token,
        email: formData?.email,
        type: 2,
      };
      await changeEmail(data);
      console.log("Data:", data);
      setOtpSent(true);
    } catch (error) {
      console.log("Error while logging with formData :: ", error);
    }
  };
  const changeMobileHandler = async (formData) => {
    try {
      console.log(formData);
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        id_corp: user?.id,
        usercode: user?.token,
        mobile: formData?.phoneNumber,
        type: 1,
      };
      await changeMobile(data);
      console.log("Data:", data);
      setOtpSent2(true);
    } catch (error) {
      console.log("Error while logging with formData :: ", error);
    }
  };

  const handleOtpSubmit = async (formData) => {
    try {
      console.log(formData);
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        id_corp: user?.id,
        usercode: user?.token,
        email: formData?.email,
        otp: formData?.otp,
      };
      console.log("Data", data);
      await verifyEmailOTP(data);
      console.log("Data", data);
    } catch (error) {
      console.log("Error while logging with formData :: ", error);
    }
  };
  const handlePhoneOtpSubmit = async (formData) => {
    try {
      console.log(formData);
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        id_corp: user?.id,
        usercode: user?.token,
        mobile: formData?.phoneNumber,
        otp: formData?.otp,
      };
      console.log("Data", data);
      await verifyOTPMobile(data);
      console.log("Data", data);
    } catch (error) {
      console.log("Error while logging with formData :: ", error);
    }
  };

  useEffect(() => {
    preData();
    getCorporateSize();
    getIndustryData();
    getCorporateStage();
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center fixed top-0 left-0 z-50 bg-black bg-opacity-50">
      <div className="  w-1/2 h-4/5 bg-white overflow-y-scroll  rounded-lg shadow-lg relative">
        <div className="flex justify-between items-center bg-blue-100 rounded-t-md h-12">
          <span className=" mx-4 text-lg font-medium ">Edit Profile</span>
          <button className="absolute top-2 right-2">
            <img
              src={close}
              onClick={closeModal}
              alt="Close"
              className="w-6 h-6"
            />
          </button>
        </div>
        <form onSubmit={handleSubmit(corporateEditHandler)}>
          <div className="flex gap-5 px-5 mt-7">
            <div className="relative h-12 w-1/2">
              <select
                id_state="state_select"
                className="pl-8 pr-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                // defaultValue=""
                {...register("state")}
                onChange={(e) => handleStateChange(e)}
              >
                <option value="">Select State</option>
                {states?.map((data) => (
                  <option key={data?.id_state} value={data?.id_state}>
                    {data.state}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <img src={arrowDown} alt="Arrow Down" className="h-4 w-4" />
              </div>
            </div>
            <div className="relative h-12 w-1/2">
              <select
                id_state="level_select"
                className="pl-8 pr-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                // defaultValue=""
                {...register("district")}
              >
                <option value="">Select City</option>
                {districts?.map((district) => (
                  <option key={district?.id_city} value={district.id_city}>
                    {district?.city}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <img src={arrowDown} alt="Arrow Down" className="h-4 w-4" />
              </div>
            </div>
          </div>
          <div className="flex gap-5 px-5 mt-7">
            <div className="relative h-12 w-1/2">
              <select
                id_state="founded_year"
                className="pl-8 pr-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                defaultValue=""
                {...register("founded_year")}
              >
                <option value="">Select Year</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <img src={arrowDown} alt="Arrow Down" className="h-4 w-4" />
              </div>
            </div>
            <div className="relative h-12 w-1/2">
              <select
                id_state="corporate_size"
                className="pl-8 pr-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                // defaultValue=""
                {...register("corporate_size")}
              >
                <option value="">Corporate Size</option>

                {corporateSize?.map((size) => (
                  <option key={size?.id} value={size.id}>
                    {size?.size_from} to {size?.size_to}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <img src={arrowDown} alt="Arrow Down" className="h-4 w-4" />
              </div>
            </div>
          </div>
          <div className="flex gap-5 px-5 mt-7">
            <div className="relative h-12 w-1/2">
              <select
                id="industry_related"
                className="pl-8 pr-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                defaultValue=""
                {...register("industry_related")}
              >
                <option value="">Select Industry</option>
                {industry?.map((data) => (
                  <option key={data?.id} value={data.id}>
                    {data.industry_name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <img src={arrowDown} alt="Arrow Down" className="h-4 w-4" />
              </div>
            </div>
            <div className="relative h-12 w-1/2">
              <select
                id_state="corporate_stage"
                className="pl-8 pr-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                // defaultValue=""
                {...register("corporate_stage")}
              >
                <option value="">Corporate Stage</option>
                {corporateStage?.map((data) => (
                  <option key={data?.id} value={data?.id}>
                    {data.stage}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <img src={arrowDown} alt="Arrow Down" className="h-4 w-4" />
              </div>
            </div>
          </div>
          <div className="flex mt-7">
            <div className="relative h-12 w-1/2 mx-4 ">
              <div>
                <input
                  type="text"
                  id="floating_filled"
                  className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#0b0b0b] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                  placeholder=""
                  {...register("location", {
                    required: true,
                  })}
                />
                <div
                  htmlFor="floating_filled"
                  className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                >
                  <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                  <label htmlFor="" className="pl-2">
                    Location
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-10">
            <button
              id="btn1"
              type="submit"
              className="border rounded-3xl bg-blue-700 px-10 py-2"
            >
              Update1
            </button>
          </div>
        </form>

        <hr className="border border-gray-500 mx-10 mt-10"></hr>
        <form onSubmit={handleSubmit(userNameAndUserIdHandler)}>
          <div className="flex gap-5 px-5 mt-7">
            <div className="relative h-12 w-1/2">
              <div>
                <input
                  type="text"
                  id="floating_filled"
                  className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#0b0b0b] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                  placeholder=""
                  {...register("Corporate_name", {
                    required: true,
                  })}
                />
                <div
                  htmlFor="floating_filled"
                  className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                >
                  <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                  <label htmlFor="" className="pl-2">
                    Corporate Name
                  </label>
                </div>
              </div>
            </div>
            <div className="relative h-12 w-1/2">
              <div>
                <input
                  type="useid"
                  id="floating_filled"
                  className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                  placeholder=""
                  {...register("userid", {
                    required: true,
                  })}
                />
                <div
                  htmlFor="floating_filled"
                  className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                >
                  <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                  <label htmlFor="" className="pl-2">
                    Userid
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-5 px-5 mt-7">
            <div className="relative h-12 w-1/2">
              <div>
                <input
                  type="password"
                  id="floating_filled"
                  className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                  placeholder=""
                  {...register("password", {
                    required: true,
                  })}
                />
                <div
                  htmlFor="floating_filled"
                  className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                >
                  <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                  <label htmlFor="" className="pl-2">
                    Enter Current Password
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-10">
            <button
              type="submit"
              className="border rounded-3xl bg-blue-800 px-10 py-2"
            >
              Update2
            </button>
          </div>
        </form>
        <hr className="border border-gray-500 mx-10 mt-4 "></hr>
        <div>
          <form onSubmit={handleSubmit(changeEmailIdHandler)}>
            <div className="flex gap-5 px-5 mt-7 mb-7">
              <div className="relative h-12 w-1/2">
                <div>
                  <input
                    type="text"
                    id="email"
                    className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#0b0b0b] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                    placeholder=""
                    {...register("email", {
                      required: true,
                    })}
                  />
                  <div
                    htmlFor="email"
                    className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                    <label htmlFor="email" className="pl-2">
                      Email
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-10">
              <button
                type="submit"
                className="border rounded-3xl bg-blue-800 px-10 py-2"
              >
                Send OTP
              </button>
            </div>
          </form>

          {otpSent && (
            <form onSubmit={handleSubmit(handleOtpSubmit)}>
              <div className="flex px-5 mt-7 mb-7">
                <div className="relative h-12 w-1/2">
                  <div>
                    <input
                      type="text"
                      id="otp"
                      className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#0b0b0b] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                      placeholder=""
                      {...register("otp", {
                        required: true,
                      })}
                    />
                    <div
                      htmlFor="otp"
                      className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                    >
                      <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                      <label htmlFor="otp" className="pl-2">
                        Enter OTP
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center mt-10">
                <button
                  type="submit"
                  className="border rounded-3xl bg-blue-800 px-10 mb-10 py-2"
                >
                  Update4
                </button>
              </div>
            </form>
          )}
        </div>
        <div>
          <form onSubmit={handleSubmit(changeMobileHandler)}>
            <div className="flex gap-5 px-5 mt-7 mb-7">
              <div className="relative h-12 w-1/2">
                <div>
                  <input
                    type="text"
                    id="mobile_number"
                    className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#0b0b0b] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                    placeholder=""
                    {...register("phoneNumber", {
                      required: true,
                    })}
                  />
                  <div
                    htmlFor="email"
                    className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                    <label htmlFor="email" className="pl-2">
                      Mobile Number
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-10">
              <button
                type="submit"
                className="border rounded-3xl bg-blue-800 px-10 py-2"
              >
                Send OTP
              </button>
            </div>
          </form>

          {otpSent2 && (
            <form onSubmit={handleSubmit(handlePhoneOtpSubmit)}>
              <div className="flex px-5 mt-7 mb-7">
                <div className="relative h-12 w-1/2">
                  <div>
                    <input
                      type="text"
                      id="otp"
                      className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#0b0b0b] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                      placeholder=""
                      {...register("otp", {
                        required: true,
                      })}
                    />
                    <div
                      htmlFor="otp"
                      className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                    >
                      <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                      <label htmlFor="otp" className="pl-2">
                        Enter OTP
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center mt-10">
                <button
                  type="submit"
                  className="border rounded-3xl bg-blue-800 px-10 mb-10 py-2"
                >
                  Update3
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditDashboardCorporateProfile;
