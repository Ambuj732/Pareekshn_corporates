import React, { useState, useEffect } from "react";
import leftBg from "/leftBg.jpg";
import arrowLeft from "/arrowLeft.png";
import arrowDown from "../../assets/Hackathon/arrowDown.png";
import tablet from "/Tablet.png";
import message from "/message.png";
import userProfile from "/userProfile.png";
import viewHideIcon from "/View_hide_light.png";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import corporateRegister from "../../actions/LoginScreens/register";
import getCities from "../../actions/LoginScreens/getCities";
import getStates from "../../actions/LoginScreens/getStates";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import * as Yup from "yup";

function CorporateSignUp() {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const corporateSignupSchema = Yup.object({
    corp_name: Yup.string().required("Name is required"),
    corp_email: Yup.string()
      .required("Email is Required")
      .email(" Enter valid email address"),
    corp_mob: Yup.string()
      .matches(/^\d{10}$/, "Phone Number must be 10 digits")
      .required(),
    corp_userid: Yup.string()
      .required("UserId is required")
      .min(6, "UserID should be atleast 6 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(6, " Password should be atleast 6 characters"),
    id_state: Yup.string().required("State is required"),
    id_city: Yup.string().required("City is required"),
  });

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
      const response = await getCities(data);
      setDistricts(response?.data?.cities);
      console.log("Cities :: ", response?.data?.cities);
    } catch (error) {
      console.log("Error while getting cities :: ", error);
    }
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    getCitiesHandler(e.target.value);
    console.log("State :: ", e.target.value);
  };

  useEffect(() => {
    preData();
  }, []);

  const handleback = () => {
    navigate(-1);
  };

  const corporateRegisterHandler = async (formData) => {
    try {
      console.log("form data is ", formData);
      const data = {
        password: formData?.password,
        id_city: Number(formData?.district),
        corp_email: formData?.email,
        corp_userid: formData?.userId,
        corp_name: formData?.name,
        corp_mob: formData?.Number,
        id_state: Number(selectedState),
      };
      await corporateSignupSchema.validate(data, { abortEarly: false });
      const response = await corporateRegister(data);
      if (response?.data?.code === 1000) {
        toast.success("You have successfully registered!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error("User already exits");
      }
    } catch (error) {
      console.log("Error while signup :: ", error);
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      console.log("Error ", newErrors);
      setErrors(newErrors);
      toast.error("Error while Signup");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="min-h-screen relative w-full lg:w-1/2 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(corporateRegisterHandler)}
        className=" w-full flex justify-center items-center"
      >
        <div className="absolute inset-0 z-[-1] overflow-hidden min-h-screen">
          <img
            src={leftBg}
            alt=""
            className="w-full h-full absolute inset-0 object-fill"
          />
        </div>
        <div className="bg-[#ffffff] h-[460px] w-3/4 lg:w-4/5 xl:w-2/3 rounded-3xl p-6 flex flex-col gap-4 relative z-10">
          <div className="flex flex-col gap-6 overflow-y-scroll px-2">
            <div className="flex justify-between items-center">
              <img
                src={arrowLeft}
                alt=""
                className="bg-[#1C4481] w-6 h-6 rounded-full"
                onClick={handleback}
              />
              <div className="flex flex-col items-end">
                <span className="font-semibold text-[#AFAFAF]">Create</span>
                <span className="font-semibold text-[#222222]">an Account</span>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <div className="border border-black h-14 rounded-md px-2 py-1 flex justify-between items-center">
                  <div className="flex text-sm items-center gap-2 text-[#1C4481]">
                    <img src={userProfile} alt="" className="h-5 w-5" />
                    <input
                      className="outline-none"
                      placeholder={"Name*"}
                      {...register("name")}
                    />
                  </div>
                </div>
                {errors.corp_name && (
                  <div className="error text-red-600 font-medium text-sm">
                    {errors?.corp_name}
                  </div>
                )}
              </div>

              <div>
                <div className="border border-black h-14 rounded-md px-2 py-1 flex justify-between items-center">
                  <div className="flex items-center text-sm gap-2 text-[#1C4481]">
                    <img src={message} alt="" className="h-5 w-5" />
                    <input
                      className="outline-none"
                      placeholder={"Email*"}
                      {...register("email", { required: true })}
                    ></input>
                  </div>
                </div>
                {errors.corp_email && (
                  <div className="error text-red-600 font-medium text-sm">
                    {errors?.corp_email}
                  </div>
                )}
              </div>
              <div>
                <div className="border border-black h-14 rounded-md px-2 py-1 flex justify-between items-center">
                  <div className="flex items-center text-sm gap-2 text-[#1C4481]">
                    <img src={tablet} alt="" className="h-5 w-5" />
                    <input
                      type="tel"
                      className="outline-none"
                      placeholder={"Mobile Number*"}
                      {...register("Number", { required: true })}
                    ></input>
                  </div>
                </div>
                {errors.corp_mob && (
                  <div className="error text-red-600 font-medium text-sm">
                    {errors?.corp_mob}
                  </div>
                )}
              </div>

              <div>
                <div className="border border-black h-14 rounded-md px-2 py-1 flex justify-between items-center">
                  <div className="flex items-center text-sm gap-2 text-[#1C4481]">
                    <img src={userProfile} alt="" className="h-5 w-5" />
                    <input
                      className="outline-none"
                      placeholder={"User ID*"}
                      {...register("userId", { required: true })}
                    ></input>
                  </div>
                </div>
                {errors.corp_userid && (
                  <div className="error text-red-600 font-medium text-sm">
                    {errors?.corp_userid}
                  </div>
                )}
              </div>
              <div>
                <div className="border border-black h-14 rounded-md px-2 py-1 flex justify-between items-center">
                  <div className="flex items-center justify-between text-sm gap-2 text-[#1C4481]">
                    <img src={message} alt="" className="h-5 w-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="outline-none"
                      placeholder={"Password*"}
                      {...register("password", { required: true })}
                    />
                  </div>
                  <button type="button" onClick={togglePasswordVisibility}>
                    {showPassword ? <VscEyeClosed /> : <VscEye />}
                  </button>
                </div>
                {errors.password && (
                  <div className="error text-red-600 font-medium text-sm">
                    {errors?.password}
                  </div>
                )}
              </div>

              <div className="relative h-12 mb-3 w-full">
                <div>
                  <select
                    id="state_select"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    onChange={(e) => handleStateChange(e)}
                  >
                    <option value="">Select State</option>
                    {states?.map((state) => (
                      <option key={state?.id_state} value={state.id_state}>
                        {state.state}
                      </option>
                    ))}
                  </select>

                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <img src={message} alt="" className="h-5 w-5" />
                    <label htmlFor="" className="pl-2">
                      State
                    </label>
                  </div>
                </div>
                {errors.id_state && (
                  <div className="error text-red-600 font-medium text-sm">
                    {errors?.id_state}
                  </div>
                )}
              </div>
              <div className="relative h-12 mb-3 w-full">
                <div>
                  <select
                    id="state_select"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    defaultValue=""
                    {...register("district", { required: true })}
                  >
                    <option value="" disabled hidden>
                      Select City
                    </option>
                    {districts?.map((district) => (
                      <option key={district?.id_city} value={district.id_city}>
                        {district?.city}
                      </option>
                    ))}
                  </select>

                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <img src={message} alt="" className="h-5 w-5" />
                    <label htmlFor="" className="pl-2">
                      City
                    </label>
                  </div>
                </div>
                {errors.id_city && (
                  <div className="error text-red-600 font-medium text-sm">
                    {errors?.id_city}
                  </div>
                )}
              </div>

              <div className="flex justify-center items-center gap-2">
                <input
                  type="checkbox"
                  {...register("checkbox", { required: true })}
                />
                <span className="font-semibold">
                  I agree to the Terms & Conditions
                </span>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full h-full border rounded-full text-white bg-[#1C4481] py-2"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default CorporateSignUp;
