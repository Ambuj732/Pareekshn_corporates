import React, { useState } from "react";
import leftBg from "/leftBg.jpg";
import arrowLeft from "/arrowLeft.png";
import tablet from "/Tablet.png";
import message from "/message.png";
import userProfile from "/userProfile.png";
import viewHideIcon from "/View_hide_light.png";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import corporateRegister from "../../actions/LoginScreens/register";

function CorporateSignUp() {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const handleback = () => {
    navigate(-1);
  };

  const corporateRegisterHandler = async (formData) => {
    try {
      console.log("form data is ", formData);
      const data = {
        password: formData?.password,
        id_city: formData?.id_city,
        corp_email: formData?.email,
        corp_userid: formData?.userId,
        corp_name: formData?.name,
        corp_mob: formData?.Number,
        id_state: formData?.id_state,
      };
      await corporateRegister(data);
    } catch (error) {
      console.log("Error while logging with formData :: ", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(corporateRegisterHandler)}
      className="min-h-screen relative w-full lg:w-1/2 flex justify-center items-center"
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
            <div className="border border-black h-14 rounded-md px-2 py-1 flex justify-between items-center">
              <div className="flex text-sm items-center gap-2 text-[#1C4481]">
                <img src={userProfile} alt="" className="h-5 w-5" />
                <input
                  className="outline-none"
                  placeholder={"Name*"}
                  {...register("name", { required: true })}
                ></input>
              </div>
            </div>
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
            <div className="border border-black h-14 rounded-md px-2 py-1 flex justify-between items-center">
              <div className="flex items-center text-sm gap-2 text-[#1C4481]">
                <img src={tablet} alt="" className="h-5 w-5" />
                <input
                  className="outline-none"
                  placeholder={"Mobile Number*"}
                  {...register("Number", { required: true })}
                ></input>
              </div>
            </div>
            <div className="border border-black h-14 rounded-md px-2 py-1 flex justify-between items-center">
              <div className="flex items-center text-sm gap-2 text-[#1C4481]">
                <img src={userProfile} alt="" className="h-5 w-5" />
                <input
                  className="outline-none"
                  placeholder={"id-city"}
                  {...register("id_city", { required: true })}
                ></input>
              </div>
            </div>
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
            <div className="border border-black h-14 rounded-md px-2 py-1 flex justify-between items-center">
              <div className="flex items-center text-sm gap-2 text-[#1C4481]">
                <img src={message} alt="" className="h-5 w-5" />
                <input
                  className="outline-none"
                  placeholder={"Password*"}
                  {...register("password", { required: true })}
                ></input>
              </div>
              <div className="flex items-center justify-between">
                <img src={viewHideIcon} alt="" className="h-5 w-5" />
              </div>
            </div>
            <div className="border border-black h-14 rounded-md px-2 py-1 flex justify-between items-center">
              <div className="flex items-center text-sm gap-2 text-[#1C4481]">
                <img src={message} alt="" className="h-5 w-5" />
                <input
                  className="outline-none"
                  placeholder={"ID State*"}
                  {...register("id_state", { required: true })}
                ></input>
              </div>
              <div className="flex items-center justify-between"></div>
            </div>
            <div className="flex justify-center items-center gap-2">
              <input type="checkbox" />
              <span className="font-semibold">
                I agree to the Terms & Conditions
              </span>
            </div>
            <div>
              <button
                type="submit"
                className="w-full h-full border rounded-full bg-blue-900 py-2"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CorporateSignUp;
