import React, { useState, useEffect } from "react";
import avatar from "/avatar.png";
import CorporateHackathonSidebar from "./CorporateHackathonSidebar";
import close from "../../assets/Hackathon/close.png";
import twoperson from "../../assets/Hackathon/twoperson.png";
import bannertitle from "../../assets/Hackathon/bannertitle.png";
import arrowDown from "../../assets/Hackathon/arrowDown.png";
import attach from "../../assets/Hackathon/attach.png";
import time from "../../assets/Hackathon/time.png";
import bannersize from "../../assets/Hackathon/bannersize.png";
import edit from "../../assets/Hackathon/edit.png";
import TimePicker from "./TimePicker";
import { useForm } from "react-hook-form";
import getCities from "../../actions/LoginScreens/getCities";
import getStates from "../../actions/LoginScreens/getStates";
import createHackathon from "../../actions/Dashboard/createHackathon";
import createBannerWeb from "../../actions/Dashboard/createBannerWeb";
import getSectors from "../../actions/MasterDataApi/getSectors";
import getDifficultyLevel from "../../actions/MasterDataApi/getDifficultyLevel";
import getLanguageList from "../../actions/MasterDataApi/getLanguageList";
import getCourses from "../../actions/MasterDataApi/getCourses";
import getBannerSample from "../../actions/MasterDataApi/getBannerSample";
import { useNavigate } from "react-router";
import Editor from "react-simple-wysiwyg";

const hours = [...Array(12).keys()].map((n) =>
  (n + 1).toString().padStart(2, "0")
);
const minutes = [...Array(60).keys()].map((n) => n.toString().padStart(2, "0"));
const periods = ["AM", "PM"];

function CreateHackathon() {
  const { register, handleSubmit, setValue } = useForm();
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [sector, setSector] = useState([]);
  const [difficultyLevel, setDifficultyLevel] = useState([]);
  const [user, setUser] = useState({});
  const [language, setLanguage] = useState([]);
  const [selectedTime, setSelectedTime] = useState(0);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(0);
  const [bannerfile, setBannerFile] = useState();
  const [logofile, setLogoFile] = useState();
  const [bannerData, setBannerData] = useState([]);
  const [html, setHtml] = useState("");

  const handleBannerChange = (e) => {
    setBannerFile(e.target.files[0]);
  };
  const handleLogoChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const onChange = (value) => {
    setHtml(value);
    setValue("description", value);
  };

  const preData = async () => {
    try {
      const indianStates = await getStates();
      setStates(indianStates?.data?.states);
      const allCourses = await getCourses();
      //console.log(allCourses?.data?.courses);
      setCourses(allCourses?.data?.courses);
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
      // console.log("Cities :: ", response?.data?.cities);
    } catch (error) {
      console.log("Error while getting cities :: ", error);
    }
  };

  const getBannerSampleData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User:", user);
      const data = {
        id_corp: 2,
        usercode: user?.usercode,
      };
      const response = await getBannerSample(data);
      console.log(response);
      if (response?.data?.code === 1000) setBannerData(response?.data?.banners);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    //console.log(stateId);
    setSelectedState(stateId);
    getCitiesHandler(stateId);
    console.log("State :: ", stateId);
  };

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    //console.log(courseId);
    setSelectedCourse(courseId);
  };

  const getSectorData = async () => {
    try {
      const data = {
        usercode: user?.usercode,
        id_self_student: 1,
      };
      const response = await getSectors(data);
      //console.log("Sector data", response);
      if (response?.data?.code === 1000) setSector(response?.data?.sector);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const getDifficultyLevelData = async () => {
    try {
      const response = await getDifficultyLevel();
      //console.log("Sector data", response);
      if (response?.data?.code === 1000) setDifficultyLevel(response?.data?.dl);
      ///console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const getLanguageListData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      //console.log("User :: ", user);
      const response = await getLanguageList();
      //console.log("Sector data", response);
      if (response?.data?.code === 1000) setLanguage(response?.data?.lang_list);
      //console.log(response);
    } catch (error) {
      //console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // Define the onload event handler
      reader.onload = () => resolve(reader.result);

      // Define the onerror event handler
      reader.onerror = (error) => reject(error);

      // Read the file as a data URL
      reader.readAsDataURL(file);
    });
  }

  const createHackathonHandler = async (formData) => {
    //console.log(formData);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const logoImage = await fileToBase64(logofile);
      const data = {
        exam_start_time: formData?.hackathonTime + ":00",
        paid: formData?.planType === "paid" ? 1 : 0,
        amount: Number(formData?.amount) || 0,
        id_course: Number(formData?.course),
        hackthon_title: formData?.title,
        id_level_difficulty: Number(formData?.level),
        id_corp: user?.id,
        id_lang: Number(formData?.language),
        negative: formData?.negative === "yes" ? 1 : 0,
        id_state: Number(selectedState),
        id_city: Number(formData?.district),
        id_sector: Number(formData?.sector),
        date_of_exam: formData?.examDate,
        passing_percentage: Number(formData?.passPercent),
        usercode: user?.token,
        file: logoImage,
      };

      // Create Hackathon
      const response = await createHackathon(data);
      const id_hackathon = response?.data?.id_hackathon;
      if (response.status == 200) {
        const code = response?.data?.code;
        if (code == 1000 || code == 1004) {
          const bannerImage = await fileToBase64(bannerfile);
          // Create Banner
          const bannerData = {
            id_corp: user?.id,
            display_start_time: "13:56:00",
            display_end_time: "13:57:00",
            display_start_date: "2024-05-22",
            display_end_date: "2024-05-26",
            banner_title: "banner 1st",
            id_banner_size: 4,
            id_hackthon: id_hackathon,
            usercode: user?.token,
            banner_description:
              "description of banner. this is the banner for this hackthon.",
            file: bannerImage,
          };
          //console.log(bannerData);
          const response = await createBannerWeb(bannerData);
          //console.log(res);
          if (response?.status == 200) {
            const code = response?.data?.code;
            if (code == 1000) {
              setError("The hackathon has been created and banner uploaded.");
              navigate("/next-hackathon");
            }
          }
        } else {
          setError(
            "Please try again. There is an error in creating hackathon."
          );
          return;
        }
      } else {
        setError("Please try again.");
        return;
      }
    } catch (error) {
      console.log(
        "Please try again. There is an error in creating hackathon. :: ",
        error
      );
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    preData();
    getSectorData();
    getDifficultyLevelData();
    getLanguageListData();
    getBannerSampleData();
  }, []);

  return (
    <div className="h-screen flex overflow-hidden">
      <CorporateHackathonSidebar />
      <div className="w-5/6 p-4 overflow-y-scroll no-scrollbar">
        <div className="flex items-center justify-between mb-14">
          <span className="font-semibold text-[#1C4481] text-2xl">
            Dashboard
          </span>
          <div className="flex items-center w-1/5 justify-between">
            <div className="flex items-center gap-2 w-full h-14 border-2 border-[#1C4481] px-1 rounded-[100px]">
              <img src={avatar} alt="" className="h-10 m-1" />
              <div className="flex flex-col text-sm">
                <span className="font-semibold text-[#305187]">Welcome</span>
                <span className="font-medium">User TP</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#EDF2FF] min-h-screen flex justify-center items-center rounded-3xl">
          <div className="bg-white min-h-screen ps-8 flex flex-col gap-6 py-4 pe-4 w-full m-4 rounded-3xl">
            <div className="w-full flex justify-between items-center">
              <span className="text-xl font-medium text-[#1C4481]">
                Create Hackathon
              </span>
            </div>
            <form onSubmit={handleSubmit(createHackathonHandler)}>
              <div className="flex flex-col gap-6">
                <div className="flex gap-10 justify-around px-5 mb-4">
                  <div className="h-16 w-1/2">
                    <span className="font-semibold ml-1">Add Title</span>
                    <div className="w-full h-full flex gap-4 items-center border rounded-lg">
                      <img src={twoperson} alt="" className="h-5 w-5 ml-4" />
                      <input
                        type="text"
                        placeholder="Add title"
                        className=" outline-none w-[90%] "
                        {...register("title", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="h-16 w-1/2  ">
                    <span className="font-semibold ml-1">Select Course</span>
                    <div className="w-full h-full  flex  gap-4 items-center border rounded-lg">
                      <img src={twoperson} alt="" className="h-5 w-5 ml-4" />
                      <select
                        id_state="sector_select"
                        className=" outline-none w-[90%] mr-4 "
                        {...register("course", { required: true })}
                      >
                        {courses?.map((data) => (
                          <option key={data?.id} value={data.id}>
                            {data.course_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="h-16 w-1/2  ">
                    <span className="font-semibold ml-1">Date of Exam</span>
                    <div className="w-full h-full  flex  gap-4 items-center border rounded-lg">
                      <img src={twoperson} alt="" className="h-5 w-5 ml-4" />
                      <input
                        type="date"
                        placeholder="Add Date of Exam"
                        className=" outline-none w-[90%] mr-4 "
                        {...register("examDate", { required: true })}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-10 justify-around px-5 mt-4 mb-4">
                  <div className=" h-16 w-1/2 ">
                    <span className="font-semibold ml-1">Exam Start Time</span>
                    <div className="w-full h-full  flex  gap-4 items-center border rounded-lg">
                      <img src={twoperson} alt="" className="h-5 w-5 ml-4" />
                      <input
                        type="time"
                        placeholder="Add Hackathon Time"
                        className=" outline-none w-[90%] mr-4"
                        {...register("hackathonTime", { required: true })}
                      />
                    </div>
                  </div>
                  <div className=" h-16 w-1/2 ">
                    <span className="font-semibold ml-1">
                      Passing Percentage
                    </span>
                    <div className="w-full h-full  flex  gap-4 items-center border rounded-lg">
                      <img src={twoperson} alt="" className="h-5 w-5 ml-4" />
                      <input
                        type="Number"
                        placeholder="Add Passing Percentage"
                        className=" outline-none w-[90%] "
                        {...register("passPercent", { required: true })}
                      />
                    </div>
                  </div>
                  <div className=" h-16 w-1/2 ">
                    <span className="font-semibold ml-1">Negative</span>
                    <div className="w-full h-full  flex  gap-4 items-center border rounded-lg">
                      <img
                        src={twoperson}
                        alt="Two Person Icon"
                        className="h-5 w-5 ml-4"
                      />
                      <select
                        className=" outline-none w-[90%] mr-4 "
                        {...register("negative", { required: true })}
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center w-2/3 justify-start gap-20 px-5 mt-6 mb-6">
                  <div className="flex items-center mb-4 gap-3">
                    <input
                      id_state="free"
                      type="radio"
                      value="free"
                      name="value"
                      className="w-6 h-6 text-blue-600"
                      {...register("planType", { required: true })}
                    />
                    <label
                      for="default-radio-1"
                      className="ms-2 text-xl text-semibold"
                    >
                      Free
                    </label>
                  </div>
                  <div className="flex items-center mb-4 gap-3">
                    <input
                      id_state="paid"
                      type="radio"
                      value="paid"
                      name="planType"
                      className="w-6 h-6 text-blue-600"
                      {...register("planType", { required: true })}
                    />
                    <label
                      for="default-radio-1"
                      className="ms-2 text-xl text-semibold"
                    >
                      Paid
                    </label>
                  </div>
                  {
                    <div className="flex  justify-center ">
                      <input
                        type="number "
                        placeholder="Rs. "
                        className="px-7 no-spinner border-2  w-full py-3 rounded-md  outline-none"
                        {...register("amount", { required: true })}
                      />
                    </div>
                  }
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-2">
                <div className="bg-[#E7F0FF] px-4 py-2 rounded-md text-[#1C4481] font-medium">
                  <span>Add Banner</span>
                </div>

                <div className="flex gap-10 justify-around px-5 mt-4 mb-4">
                  <div className=" h-16 w-1/2 ">
                    <span className="font-semibold ml-1">Banner Title</span>
                    <div className="w-full h-full  flex  gap-4 items-center border rounded-lg">
                      <img src={bannertitle} alt="" className="h-4 w-5 ml-4" />
                      <input
                        type="text"
                        placeholder="Banner Title"
                        className=" outline-none w-[90%] "
                        {...register("bannerTitle", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="">
                    <span className="font-semibold ml-1">Time</span>

                    <TimePicker setSelectedTime={setSelectedTime} />
                  </div>
                  <div className=" h-16 w-1/2 ">
                    <span className="font-semibold ml-1">Start Date</span>
                    <div className="w-full h-full  flex  gap-4 items-center border rounded-lg">
                      <img src={twoperson} alt="" className="h-5 w-5 ml-4" />
                      <input
                        type="date"
                        placeholder="Add Display Start Date"
                        className=" outline-none w-[90%] mr-4"
                        {...register("display_start_date", { required: true })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-10 justify-around px-5  mb-4">
                  <div className=" h-16 w-1/2">
                    <span className="font-semibold ml-1">Start Time</span>
                    <div className="w-full h-full  flex  gap-4 items-center  border rounded-lg">
                      <img src={twoperson} alt="" className="h-5 w-5 ml-4" />
                      <input
                        type="time"
                        placeholder="Add Display Start Time"
                        className=" outline-none w-[90%] mr-4 "
                        {...register("display_start_time", { required: true })}
                      />
                    </div>
                  </div>

                  <div className=" h-16 w-1/2 ">
                    <span className="font-semibold ml-1">End Date</span>
                    <div className="w-full h-full  flex  gap-4 items-center border rounded-lg">
                      <img src={twoperson} alt="" className="h-5 w-5 ml-4" />
                      <input
                        type="date"
                        placeholder="Add Display end Date"
                        className=" outline-none w-[90%] mr-4"
                        {...register("display_end_date", { required: true })}
                      />
                    </div>
                  </div>
                  <div className=" h-16 w-1/2 ">
                    <span className="font-semibold ml-1">End Time</span>

                    <div className="w-full h-full  flex  gap-4 items-center border rounded-lg">
                      <img src={twoperson} alt="" className="h-5 w-5 ml-4" />
                      <input
                        type="time"
                        placeholder="Add Display End Time"
                        className=" outline-none w-[90%] mr-4"
                        {...register("display_end_time", { required: true })}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-10 mb-4 h-32 w-[97%]">
                  <Editor
                    value={html}
                    onChange={onChange}
                    className="fixed z-50 px-5 border-none outline-none h-full"
                  />
                  {/* <textarea
                    placeholder="Add Description"
                    className="pl-2 pb-2.5 pt-5 text-base border focus:outline-none focus:ring-0 peer items-center mx-4 px-5 mt-2 mb-4 h-32 w-full rounded-lg"
                    {...register("description", { required: true })}
                  ></textarea> */}
                </div>

                <span className="font-medium mt-3">Banner Image</span>
                <div className="flex gap-10 justify-around px-5 mt-2 ">
                  <div className=" h-16 w-1/2 ">
                    <span className="font-semibold ml-1">
                      Select Banner Size
                    </span>
                    <div className="w-full h-full flex justify-center items-center gap-2 border rounded-lg p-2">
                      <img src={bannersize} alt="" className="h-4 w-5" />
                      <div className="flex w-full">
                        <div className="flex  w-full ">
                          <select
                            id_state="banner-size-selection"
                            className=" outline-none w-full  "
                          >
                            {bannerData?.map((data) => (
                              <option key={data?.id} value={data.id}>
                                {data.width}x{data.height}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="  h-28 w-1/2 flex flex-col">
                    <div className=" h-full w-full flex flex-col ">
                      <span className="font-semibold ml-1">Choose Banner</span>
                      <div className="h-full w-full flex border rounded-lg justify-center items-center">
                        <img src={attach} className="w-5 h-5 ml-4" />
                        <div className="cursor-pointer ml-2">
                          <input
                            type="file"
                            id="attachment"
                            onChange={(e) => handleBannerChange(e)}
                            className=" w-full h-full ml-2"
                            accept="image/*"
                            /* {...register("banner")} */
                          />
                        </div>
                      </div>
                    </div>
                    <span className="text-[12px] mt-2 text-[#848484]">
                      Supported formats PNG, JPEG and File size max.5 mb
                    </span>
                  </div>

                  <div className=" h-16 w-1/2 ">
                    <span className="font-semibold ml-1">
                      Download Sample Banner
                    </span>
                    <div className="w-full h-full  flex items-center gap-4 p-2 border rounded-lg">
                      <img src={bannersize} alt="" className="h-4 w-5 ml-4" />
                      <span className="text-sm text-[#1C4481] justify-between">
                        Sample Banner
                      </span>
                    </div>
                  </div>
                </div>

                {/* <div>
                  <div className="flex mb-7">
                    <img src={edit} alt="" className="h-4 w-5" />
                    <span className="text-sm text-[#1C4481] justify-between">
                      Add Description
                    </span>
                  </div>
                  <input
                    type="text"
                    className="flex w-4/5 h-[65px] border rounded-xl p-2 px-6 flex-col justify-center outline-none"
                    {...register("description")}
                  />
                </div> */}

                {/* <div className="mx-4 px-5 mt-4 mb-4 h-32 w-2/5 border rounded-lg">
                  <textarea
                    placeholder="Add Description"
                    className="outline-none w-[90%] items-center pt-10 resize-none h-full"
                    {...register("description")}
                  ></textarea>
                </div> */}
              </div>
              <div className="flex gap-10 justify-around px-5 mt-7 mb-4">
                <div className="h-16 w-1/2">
                  <span className="font-semibold ml-1">Select Level</span>
                  <div className=" h-full w-full border rounded-lg flex items-center justify-center">
                    <select
                      id_state="difficulty_select"
                      className=" outline-none w-[90%] mr-4"
                      defaultValue=""
                      {...register("level", { required: true })}
                    >
                      {difficultyLevel?.map((data) => (
                        <option key={data?.id} value={data.id}>
                          {data.level_difficulty_name}
                        </option>
                      ))}
                    </select>
                    {/* <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <img src={arrowDown} alt="Arrow Down" className="h-4 w-4" />
                  </div> */}
                  </div>
                </div>

                <div className="h-16 w-1/2">
                  <span className="font-semibold ml-1">Select Sector</span>
                  <div className=" h-16 w-full border rounded-lg flex items-center justify-center">
                    <select
                      id_state="sector_select"
                      className=" outline-none w-[90%] mr-4"
                      // defaultValue=""
                      {...register("sector", { required: true })}
                    >
                      {sector?.map((data) => (
                        <option key={data?.id_sector} value={data.id_sector}>
                          {data.sector_name}
                        </option>
                      ))}
                    </select>
                    {/* <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <img src={arrowDown} alt="Arrow Down" className="h-4 w-4" />
                  </div> */}
                  </div>
                </div>

                <div className="h-16 w-1/2">
                  <span className="font-semibold ml-1">Select Language</span>
                  <div className=" h-16 w-full border rounded-lg flex items-center justify-center">
                    <select
                      id_state="language_select"
                      className=" outline-none w-[90%] mr-4"
                      {...register("language", { required: true })}
                    >
                      {language?.map((data) => (
                        <option key={data?.id} value={data?.id}>
                          {data.lang_name}
                        </option>
                      ))}
                    </select>
                    {/* <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <img src={arrowDown} alt="Arrow Down" className="h-4 w-4" />
                  </div> */}
                  </div>
                </div>
              </div>

              <div className="flex gap-10 justify-around px-5 mt-16 mb-4">
                <div className="h-16 w-1/2">
                  <span className="font-semibold ml-1">Select State</span>
                  <div className=" h-16 w-full border rounded-lg flex items-center justify-center">
                    <select
                      id_state="state_select"
                      className=" outline-none w-[90%] mr-4"
                      // defaultValue=""
                      onChange={(e) => handleStateChange(e)}
                    >
                      {states?.map((data) => (
                        <option key={data?.id_state} value={data?.id_state}>
                          {data.state}
                        </option>
                      ))}
                    </select>
                    {/* <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <img src={arrowDown} alt="Arrow Down" className="h-4 w-4" />
                  </div> */}
                  </div>
                </div>

                <div className="h-16 w-1/2">
                  <span className="font-semibold ml-1">Select City</span>
                  <div className=" h-16 w-full border rounded-lg flex items-center justify-center">
                    <select
                      id_state="level_select"
                      className=" outline-none w-[90%] mr-4"
                      // defaultValue=""
                      {...register("district", { required: true })}
                    >
                      {districts?.map((district) => (
                        <option
                          key={district?.id_city}
                          value={district.id_city}
                        >
                          {district?.city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="  h-28 w-1/2 flex flex-col">
                  <div className=" h-full w-full flex flex-col ">
                    <span className="font-semibold ml-1">Choose Banner</span>
                    <div className="h-full w-full flex border rounded-lg justify-center items-center cursor-pointer">
                      <img src={attach} className="w-5 h-5 ml-4" />
                      <div className="cursor-pointer ml-2">
                        <input
                          type="file"
                          id="attachment"
                          onChange={(e) => handleBannerChange(e)}
                          className=" w-full h-full ml-2 cursor-pointer"
                          accept="image/*"
                          /* {...register("banner")} */
                        />
                      </div>
                    </div>
                  </div>
                  <span className="text-[12px] mt-2 text-[#848484]">
                    Supported formats PNG, JPEG and File size max.5 mb
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center mt-10">
                <button
                  type="submit"
                  className="border rounded-full bg-blue-900 py-3 w-[200px] text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateHackathon;
