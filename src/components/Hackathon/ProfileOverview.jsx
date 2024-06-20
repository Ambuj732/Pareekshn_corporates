import React, { useState } from "react";
import CorporateHackathonSidebar from "./CorporateHackathonSidebar";
import { useForm } from "react-hook-form";
import twoperson from "../../assets/Hackathon/twoperson.png";
import edits from "../../assets/Hackathon/edits.png";
const ProfileOverview = () => {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState(null);

  return (
    <div className="w-screen h-screen flex   overflow-hidden">
      <CorporateHackathonSidebar />

      <div className="bg-[#EDF2FF] min-h-screen w-screen m-3 flex  rounded-3xl">
        <div className="bg-white min-h-screen  flex justify-center items-center gap-6  w-full m-7 rounded-3xl">
          <div className="w-[39%] h-[80%] border rounded-2xl shadow-lg">
            <div className="bg-white border w-full h-16">
              <div className="flex gap-10 items-center mt-4 mx-4">
                <span className="text-black font-custom font-medium">
                  Profile overview
                </span>
              </div>
            </div>
            <div className="flex flex-col ml-4 ">
              <span className="font-custom font-medium">Detail</span>
              <span className="font-custom text-gray-500">
                Add your info in Detail
              </span>
            </div>
            <form className="p-4 max-w-lg mx-auto">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="documentId"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="documentId"
                  className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Employee Name"
                  {...register("employee_name")}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="documentId"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="documentId"
                  className="block w-full bg-white border border-gray-300 rounded-md  h-20 px-3 shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Description"
                  {...register("description")}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="attachment"
                >
                  Photo
                </label>
                <div className="relative w-full h-12 border border-gray-300 rounded-md flex items-center justify-between px-3 shadow-sm">
                  <span className="text-gray-500"></span>
                  <input
                    type="file"
                    id="attachment"
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    accept=".pdf, .jpg, .png"
                    {...register("attachment")}
                  />
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  photo files can have max 1MB size
                </p>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-blue-900 text-white px-36 py-3 rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="w-[39%] h-[80%] border flex flex-col justify-center items-center rounded-2xl shadow-lg">
            <div className="border rounded-2xl flex flex-col mb-4 border-green-400 w-4/5 h-32 gap-7">
              <div className="flex justify-between items-center ">
                <div className="flex gap-5 justify-center items-center mx-4">
                  <div className="border border-gray-500 rounded-full w-7 h-7">
                    <img src={twoperson} />
                  </div>
                  <div className="flex flex-col">
                    <span>Kuldeep bhutt</span>
                    <span>Android Developer</span>
                  </div>
                </div>
                <img src={edits} className="w-10 h-7" />
              </div>
              <div className="flex items-center justify-center mx-4">
                <span>
                  Description: 5 years plus in designing. developing and
                  maintaining Page
                </span>
              </div>
            </div>
            <div className="border rounded-2xl flex flex-col mb-4 border-green-400 w-4/5 h-32 gap-7">
              <div className="flex justify-between items-center ">
                <div className="flex gap-5 justify-center items-center mx-4">
                  <div className="border border-gray-500 rounded-full w-7 h-7">
                    <img src={twoperson} />
                  </div>
                  <div className="flex flex-col">
                    <span>Kuldeep bhutt</span>
                    <span>Android Developer</span>
                  </div>
                </div>
                <img src={edits} className="w-10 h-7" />
              </div>
              <div className="flex items-center justify-center mx-4">
                <span>
                  Description: 5 years plus in designing. developing and
                  maintaining Page
                </span>
              </div>
            </div>
            <div className="border rounded-2xl flex flex-col mb-4 border-green-400 w-4/5 h-32 gap-7">
              <div className="flex justify-between items-center ">
                <div className="flex gap-5 justify-center items-center mx-4">
                  <div className="border border-gray-500 rounded-full w-7 h-7">
                    <img src={twoperson} />
                  </div>
                  <div className="flex flex-col">
                    <span>Kuldeep bhutt</span>
                    <span>Android Developer</span>
                  </div>
                </div>
                <img src={edits} className="w-10 h-7" />
              </div>
              <div className="flex items-center justify-center mx-4">
                <span>
                  Description: 5 years plus in designing. developing and
                  maintaining Page
                </span>
              </div>
            </div>
            <div className="border rounded-2xl flex flex-col border-green-400 w-4/5 h-32 gap-7">
              <div className="flex justify-between items-center ">
                <div className="flex gap-5 justify-center items-center mx-4">
                  <div className="border border-gray-500 rounded-full w-7 h-7">
                    <img src={twoperson} />
                  </div>
                  <div className="flex flex-col">
                    <span>Kuldeep bhutt</span>
                    <span>Android Developer</span>
                  </div>
                </div>
                <img src={edits} className="w-10 h-7" />
              </div>
              <div className="flex items-center justify-center mx-4">
                <span>
                  Description: 5 years plus in designing. developing and
                  maintaining Page
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
