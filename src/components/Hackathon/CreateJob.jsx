import React, { useState, useEffect } from "react";
import CorporateHackathonSidebar from "./CorporateHackathonSidebar";
import { useForm } from "react-hook-form";
import { IoPerson } from "react-icons/io5";
import close from "../../assets/Hackathon/close.png";
import getCreatedJob from "../../actions/Dashboard/createJob";
import { useNavigate } from "react-router";
import arrowDown from "../../assets/Hackathon/arrowDown.png";
import getStates from "../../actions/LoginScreens/getStates";
import getCities from "../../actions/LoginScreens/getCities";
import getIndustry from "../../actions/MasterDataApi/getIndustry";
import getDepartments from "../../actions/MasterDataApi/getDepartments";
import getEmpTypes from "../../actions/MasterDataApi/getEmpTypes";
import getExperienceRange from "../../actions/MasterDataApi/getExperienceRange";
import Editor from "react-simple-wysiwyg";
const CreateJob = () => {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState(null);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [industry, setIndustry] = useState([]);
  const [department, setDepartment] = useState([]);
  const [employmenttype, setEmploymentType] = useState([]);
  const [exeperienceRange, setExeperienceRange] = useState([]);
  const navigate = useNavigate();

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

  const createJobHandler = async (formData) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      console.log("form data is ", formData);
      const data = {
        id_experience_range: Number(formData?.exeperienceRange),
        zip: Number(formData?.zip),
        street_address: formData?.street,
        represent_name: formData?.Representname,
        education: "4",
        is_company_name_hidden: 0,
        id_employment_type: Number(formData?.employmenttype),
        questions: JSON.stringify([
          { question: "question 1 is this?" },
          { question: "question 2 is this?" },
          { question: "question 2 is this?" },
        ]),
        skills: "6",
        id_corp: user?.id,
        max_salary: formData?.max_salary,
        id_city: Number(formData?.district),
        id_industry: Number(formData?.Industry),
        job_description: formData?.job_description,
        no_of_days: Number(formData?.Days),
        id_department: Number(formData?.department),
        min_salary: formData?.max_salary,
        usercode: user?.token,
        id_state: Number(selectedState),
        job_title: formData?.jobtitle,
      };
      console.log("Data:", data);
      await getCreatedJob(data);
      console.log("Data After Call Api:", data);
      // navigate("/dashboard/createnewjob");
    } catch (error) {
      console.log("Error while logging with formData :: ", error);
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

  const getDepartmentData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const response = await getDepartments();
      if (response?.data?.code === 1000)
        setDepartment(response?.data?.departments);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const getEmpTypesData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const response = await getEmpTypes();
      if (response?.data?.code === 1000)
        setEmploymentType(response?.data?.emp_types);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const getExpRangeData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const response = await getExperienceRange();
      if (response?.data?.code === 1000)
        setExeperienceRange(response?.data?.experience_range);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const [html, setHtml] = useState("");
  function onChange(e) {
    setHtml(e.target.value);
  }
  useEffect(() => {
    preData();
    getIndustryData();
    getDepartmentData();
    getEmpTypesData();
    getExpRangeData();
  }, []);

  return (
    <div className="h-screen flex overflow-hidden font-custom">
      <CorporateHackathonSidebar />
      <div className="h-screen w-screen  border rounded-2xl p-5 m-5 bg-[#e0e9f6] overflow-y-scroll no-scrollbar ">
        <div className="h-screen border rounded-2xl shadow-xl p-4 bg-white overflow-y-scroll no-scrollbar">
          <span className="text-[#1C4481] font-custom mx-4 py-10">
            Create Jobs
          </span>
          <form onSubmit={handleSubmit(createJobHandler)}>
            <div className="flex gap-5 justify-around px-5 mt-2">
              <div className="relative h-12 w-1/2">
                <div>
                  <input
                    type="text"
                    id="floating_filled"
                    className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                    placeholder=""
                    {...register("jobtitle", {
                      required: true,
                    })}
                  />
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                    <label htmlFor="" className="pl-2">
                      Job Title
                    </label>
                  </div>
                </div>
              </div>
              <div className="relative h-12 w-1/2">
                <div>
                  <input
                    type="text"
                    id="floating_filled"
                    className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                    placeholder=""
                    {...register("Representname", {
                      required: true,
                    })}
                  />
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                    <label htmlFor="" className="pl-2">
                      Represent Name
                    </label>
                  </div>
                </div>
              </div>
              <div className="relative h-12 w-1/2">
                <select
                  id_industry="select_industry"
                  className="pl-8 pr-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                  defaultValue=""
                  {...register("Industry")}
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
            </div>
            <div className="flex gap-5 justify-around px-5 mt-10">
              <div className="relative h-12 w-1/2">
                <div>
                  <select
                    id="floating_filled"
                    className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                    placeholder=""
                    {...register("department", {
                      required: true,
                    })}
                  >
                    <option value="">Select Department</option>
                    {department?.map((data) => (
                      <option key={data?.id} value={data.id}>
                        {data.department_name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <img src={arrowDown} alt="Arrow Down" className="h-4 w-4" />
                  </div>
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                    <label htmlFor="" className="pl-2">
                      Department
                    </label>
                  </div>
                </div>
              </div>
              <div className="relative h-12 mb-3 w-1/2">
                <div>
                  <select
                    id="qualification_select"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    defaultValue=""
                    {...register("employmenttype")}
                  >
                    <option value="">Select Employment</option>
                    {employmenttype &&
                      employmenttype.map((data) => (
                        <option key={data?.id} value={data?.id}>
                          {data.employment_type}
                        </option>
                      ))}
                  </select>
                  <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                    <img src={arrowDown} />
                  </div>
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <img src={close} alt="" className="h-5 w-5" />
                    <label htmlFor="" className="pl-2">
                      Employment type
                    </label>
                  </div>
                </div>
              </div>
              <div className="relative h-12 mb-3 w-1/2">
                <div>
                  <select
                    id="qualification_select"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    defaultValue=""
                    {...register("exeperienceRange")}
                  >
                    <option value="">Select Exeperience Range</option>
                    {exeperienceRange &&
                      exeperienceRange.map((data) => (
                        <option key={data?.id} value={data?.id}>
                          {" "}
                          {data.experience_range}
                        </option>
                      ))}
                  </select>
                  <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                    <img src={arrowDown} />
                  </div>
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <img src={close} alt="" className="h-5 w-5" />
                    <label htmlFor="" className="pl-2">
                      Exeperience Range
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-5 px-5 mt-10">
              <div className="relative h-12 mb-3 w-[325px]">
                <div>
                  <select
                    id="min-salary"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    {...register("min_salary")}
                  >
                    <option>Select Salary</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <img src={arrowDown} alt="Arrow Down" className="h-4 w-4" />
                  </div>
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <label htmlFor="" className="pl-2">
                      Min. Salary(Lakhs)
                    </label>
                  </div>
                </div>
              </div>
              <div className="relative h-12 mb-3 w-[325px]">
                <div>
                  <select
                    id="max-salary"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    {...register("max_salary")}
                  >
                    <option>Select Salary</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <img src={arrowDown} alt="Arrow Down" className="h-4 w-4" />
                  </div>
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <label htmlFor="" className="pl-2">
                      Max. Salary(Lakhs)
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="  border rounded-2xl w-full h-[250px] shadow-xl mt-4 overflow-hidden ">
              <span className=" m-7 text-blue-600">Description</span>
              <Editor
                value={html}
                onChange={onChange}
                className="fixed z-50 px-5 border-none outline-none h-full"
              />
            </div>
            <div className="flex gap-5 px-5 mt-10">
              <div className="relative h-12 mb-3 w-[325px]">
                <div>
                  <input
                    type="text"
                    id="days"
                    className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                    defaultValue=""
                    {...register("Days", { required: true })}
                  />

                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <label htmlFor="" className="pl-2">
                      Job Acitve Days
                    </label>
                  </div>
                </div>
              </div>
              <div className="relative h-12 mb-3 w-[325px]">
                <div>
                  <select
                    id="state_select"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    defaultValue=""
                    onChange={(e) => handleStateChange(e)}
                  >
                    <option value="" disabled hidden>
                      Select State
                    </option>
                    {states?.map((state) => (
                      <option key={state?.id_state} value={state.id_state}>
                        {state.state}
                      </option>
                    ))}
                  </select>
                  <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                    <img src={arrowDown} />
                  </div>
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <img src={close} alt="" className="h-5 w-5" />
                    <label htmlFor="" className="pl-2">
                      State
                    </label>
                  </div>
                </div>
              </div>
              <div className="relative h-12 mb-3 w-[325px]">
                <div>
                  <select
                    id="state_select"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    defaultValue=""
                    {...register("district")}
                  >
                    <option value="" disabled hidden>
                      Select District
                    </option>
                    {districts?.map((district) => (
                      <option key={district?.id_city} value={district.id_city}>
                        {district?.city}
                      </option>
                    ))}
                  </select>
                  <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                    <img src={arrowDown} />
                  </div>
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <img src={close} alt="" className="h-5 w-5" />
                    <label htmlFor="" className="pl-2">
                      District
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-5 px-5 mt-10">
              <div className="relative h-12 mb-3 w-[325px]">
                <div>
                  <input
                    type="text"
                    id="zip"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    defaultValue=""
                    {...register("zip", { required: true })}
                  />
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <label htmlFor="" className="pl-2">
                      Zip
                    </label>
                  </div>
                </div>
              </div>
              <div className="relative h-12 mb-3 w-[325px]">
                <div>
                  <input
                    type="text"
                    id="street"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    defaultValue=""
                    {...register("street", { required: true })}
                  />
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <label htmlFor="" className="pl-2">
                      street
                    </label>
                  </div>
                </div>
              </div>
              <div className="relative h-12 mb-3 w-[325px]">
                <div>
                  <input
                    type="text"
                    id="job_description"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    defaultValue=""
                    {...register("job_description", { required: true })}
                  />
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <label htmlFor="" className="pl-2">
                      Job Description
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-12 w-1/2 mt-10 mx-4">
              <div>
                <input
                  type="text"
                  id="floating_filled"
                  className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                  {...register("skills", { required: true })}
                />
                <div
                  htmlFor="floating_filled"
                  className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                >
                  <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                  <label htmlFor="" className="pl-2">
                    Skills
                  </label>
                </div>
              </div>

              <div className="border border-black rounded-3xl w-[550px] h-[300px] shadow-2xl mt-5">
                <div className="flex gap-4 mx-6 mt-4">
                  <span className="text-[#1C4481]">Questionnarie</span>
                  <span className="text-[#939292] font-custom">
                    (Questionnarie is not mandatory)
                  </span>
                </div>
                <div className="flex justify-between mx-4 mt-4 mb-5 font-custom">
                  <div className="flex gap-3">
                    <img className="w-5 h-5" src={close} />
                    <span className="text-[#000000]">
                      What is your strength
                    </span>
                  </div>
                  <img src={close} className="w-5 h-5 mt-1" />
                </div>
                <div className="flex justify-between mx-4 mt-4 font-custom">
                  <div className="flex gap-3">
                    <img className="w-5 h-5" src={close} />
                    <span className="text-[#000000]">
                      What is your strength
                    </span>
                  </div>
                  <img src={close} className="w-5 h-5 mt-1" />
                </div>
                <div className="mt-4">
                  <div>
                    <span className="text-[#848484] mx-4 mt-4">
                      write a Question here
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    className="border rounded-xl w-[450px] h-[90px] shadow-sm mx-4 px-5 outline-none"
                    {...register("question", { required: true })}
                  />
                </div>
                <button className="bg-white text-[#1C4481] border rounded-3xl px-5 mt-5 mx-4 py-1">
                  Add more Questions
                </button>
              </div>
              <button
                type="submit"
                className="border rounded-3xl py-1 px-6 bg-[#1C4481] text-white font-custom mt-9 mb-7"
              >
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
