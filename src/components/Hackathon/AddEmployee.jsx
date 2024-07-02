import React, { useState, useEffect } from "react";
import CorporateHackathonSidebar from "./CorporateHackathonSidebar";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import twoperson from "../../assets/Hackathon/twoperson.png";
import edits from "../../assets/Hackathon/edits.png";
import { FaEdit } from "react-icons/fa";
import attach from "../../assets/Hackathon/attach.png";
import addEmployee from "../../actions/Dashboard/addEmployee";
import getAddEmployee from "../../actions/Dashboard/getAddEmployee";
const AddEmployee = () => {
  const { register, handleSubmit } = useForm();
  const [employee, setEmployee] = useState([]);
  const [errors, setErrors] = useState(null);

  const addEmployeeHandler = async (formData) => {
    setErrors([]);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("data is", formData);
      const file = formData?.attachment;

      const data = {
        id_corp: user?.id,
        usercode: user?.token,
        emp_name: formData?.employee_name,
        emp_designation: formData?.designation,
        about_emp: formData?.description,
        attachment: 1,
        req_by: 1,
        file: file,
      };

      console.log(data);
      await addEmployee(data);
      console.log(data);
    } catch (error) {
      setErrors([error.message]);
    }
  };

  const getAllEmployee = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const data = {
        id_corp: user.id,
        usercode: user?.token,
      };
      const response = await getAddEmployee(data);
      if (response?.data?.code === 1000) {
        setEmployee(response?.data?.about_us.about_emp);
        console.log("Employee", employee);
      }
    } catch (error) {
      setErrors([error.message]);
    }
  };
  useEffect(() => {
    getAllEmployee();
  }, []);
  return (
    <div className="w-screen h-screen flex   overflow-hidden">
      <CorporateHackathonSidebar />

      <div className="bg-[#EDF2FF] min-h-screen w-screen m-3 flex  rounded-3xl">
        <div className="bg-white min-h-screen  flex items-center gap-6  w-full m-7 rounded-3xl">
          <div className="w-[39%] h-[80%] mx-10">
            <div className="bg-white  w-full h-16">
              <div className="flex gap-10 items-center mt-4 mx-4">
                <span className="text-black font-custom font-medium">
                  Team Members
                </span>
              </div>
            </div>
            <div className="flex flex-col ml-4 ">
              <span className="font-custom font-medium">Add Employee</span>
              <span className="font-custom text-gray-500">
                Add your Employee info
              </span>
            </div>
            <form
              onSubmit={handleSubmit(addEmployeeHandler)}
              className="p-4 max-w-lg mx-auto"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="documentId"
                >
                  Employee Name
                </label>
                <input
                  type="text"
                  id="floating_filled"
                  className="block pl-2 text-black h-14 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer items-center"
                  placeholder="Employee Name"
                  {...register("employee_name", { required: true })}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="documentId"
                >
                  Designation
                </label>
                <input
                  type="text"
                  id="documentId"
                  className="block pl-2 text-black h-14 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                  placeholder="Designation"
                  {...register("designation", { required: true })}
                />
              </div>
              <div className="mb-7">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  placeholder="Add Description"
                  className="block pl-2 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer items-center"
                  {...register("description", { required: true })}
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 "
                  htmlFor="attachment"
                >
                  Photo
                </label>
                <div className="relative w-full h-14 p-2 border border-black rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500  flex items-center  gap-3 px-3 shadow-sm">
                  <img src={attach} className="w-5 h-5" />
                  <span className="text-gray-500">Attachment</span>
                  <input
                    type="file"
                    id="attachment"
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer  "
                    accept=".pdf, .jpg, .png"
                    {...register("attachment", { required: true })}
                  />
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  photo files can have max 1MB size
                </p>
              </div>

              <div className="flex justify-center mt-4 ">
                <button
                  type="submit"
                  className="bg-blue-900 text-white px-36 py-3 rounded-full "
                >
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className=" border-black border my-28  h-[600px]"></div>
          <div className="w-[39%] h-[80%]  flex flex-col items-center overflow-y-scroll ">
            {employee.length > 0 &&
              employee?.map((data) => {
                console.log(data);
                return (
                  <div className="border rounded-2xl flex flex-col mb-7 border-green-400 w-4/5 h-auto gap-4">
                    <div className="flex justify-between items-center mx-4 ">
                      <div className="flex gap-5 justify-center items-center ">
                        <div className="border border-gray-500 rounded-full w-7 h-7">
                          <img src={data.emp_image} />
                        </div>
                        <div className="flex flex-col">
                          <span>{data.emp_name}</span>
                          <span>{data.emp_designation}</span>
                        </div>
                      </div>
                      <FaEdit />
                    </div>
                    <div className="flex items-center mx-4">
                      <span>{data.about_emp}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
