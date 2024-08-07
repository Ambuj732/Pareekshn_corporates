import React, { useState, useEffect } from "react";
import pen from "../../assets/Hackathon/pen.png";
import pack from "/pack.png";
import duration from "/duration.png";
import passcode from "/passcode.png";
import code from "/code.png";
import getFetchCreatedJob from "../../actions/Dashboard/getFetchCreatedJob";
import getPublishJob from "../../actions/Dashboard/getPublishJob";
import CorporateHackathonSidebar from "./CorporateHackathonSidebar";
import publishJobPost from "../../actions/Dashboard/publishJobPost";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const PostedJob = () => {
  const [fetchCreatedJob, setFetchCreatedJob] = useState([]);
  const [errors, setErrors] = useState(null);
  const [postedPage, setPostedPage] = useState(false);
  const [publishJobData, setPublishJobData] = useState([]);
  const navigate = useNavigate();

  const getFetchCreatedData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        usercode: user?.token,
        id_corp: user?.id,
      };
      const response = await getFetchCreatedJob(data);
      console.log("completed data", response);
      if (response?.data?.code === 1000)
        setFetchCreatedJob(response?.data?.jobs);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const getFetchPublishData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        usercode: user?.token,
        id_corp: user?.id,
      };
      const response = await getPublishJob(data);
      console.log("completed data", response);
      if (response?.data?.code === 1000)
        setPublishJobData(response?.data?.jobs);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const publishJobHandler = async (id) => {
    try {
      console.log(id);
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        usercode: user?.token,
        id_corp: user?.id,
        id_job_post: id,
      };
      const response = await publishJobPost(data);
      console.log("Publish Job Post data", response);
    } catch (error) {
      console.log("Error while Publishing Job :: ", error);
      setErrors([error.message]);
    }
  };

  const goToPage = () => {
    navigate("/dashboard/appliescandidate");
  };

  useEffect(() => {
    getFetchCreatedData();
    getFetchPublishData();
  }, []);
  return (
    <div className="h-screen flex overflow-hidden ">
      <CorporateHackathonSidebar />
      <div className="h-screen w-screen flex flex-col  border rounded-2xl p-5 m-5 bg-[#e0e9f6] overflow-y-scroll no-ascrollbar">
        <div className="flex items-center justify-center gap-7 mt-7">
          <div
            className={`"border p-2 px-7 rounded-3xl cursor-pointer ${
              postedPage
                ? "bg-[#1C4481] text-white"
                : " text-[#1C4481] bg-white border-[#1C4481] "
            }`}
          >
            <span
              className=" font-medium"
              onClick={() => {
                setPostedPage(true);
              }}
            >
              Published Jobs
            </span>
          </div>
          <div
            className={`"border p-2 px-10 rounded-3xl cursor-pointer ${
              postedPage
                ? "bg-white text-[#1C4481] border-[#1C4481]"
                : "bg-[#1C4481] text-white"
            }`}
          >
            <span
              className=" font-medium"
              onClick={() => {
                setPostedPage(false);
              }}
            >
              Unpublished Jobs
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end px-4 mt-3 mb-7">
          {/* <span className="text-blue-600"> Published Jobs</span> */}
          <Link to={"/dashboard/createnewjob"}>
            <button className="  text-white border p-2 px-7 rounded-3xl bg-blue-800">
              Posted New Jobs
            </button>
          </Link>
        </div>
        {publishJobData &&
          publishJobData.map(
            (data) =>
              data.is_publish == true &&
              postedPage == true && (
                <>
                  <div className="w-full h-60 bg-white rounded-3xl mb-7">
                    <div className="flex h-1/2 items-center justify-between p-6">
                      <div className="flex flex-col mt-2">
                        <span className="text-[#1C4481] font-bold">
                          {data.job_title}
                        </span>
                        <span className="text-sm text-[#1C4481] font-medium">
                          Industry-{data.id_industry}
                        </span>
                        <span className="#292929 text-sm">
                          {data.job_description}
                        </span>
                        <span className="#292929 text-sm">
                          {data.industry_name}
                        </span>
                        <span className="#292929 text-sm">
                          {data.skill.skill_name},
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <button
                          className="border border-blue-950 p-2 px-4 rounded-3xl  text-blue-700 bg-white "
                          onClick={goToPage}
                        >
                          View Candidate
                        </button>
                        <button className="border p-2 px-8 rounded-3xl  text-white bg-green-600">
                          Published
                        </button>
                      </div>
                    </div>
                    <hr class="border-t-[1px] border-[#1C4481]" />
                    <div className="flex justify-between p-6  text-[#1C4481]">
                      <div className="flex items-center gap-2">
                        <img src={pack} alt="" className="h-8" />
                        <div className="flex flex-col text-[12px]">
                          <span className="text-#1C4481  font-bold">
                            Created Date
                          </span>
                          <span className="font-semibold">{data.add_date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src={code} alt="" className="h-8" />
                        <div className="flex flex-col text-[12px]">
                          <span className="text-#1C4481 font-bold">
                            Department
                          </span>
                          <span className="font-semibold">
                            {data.department_name}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src={duration} alt="" className="h-8" />
                        <div className="flex flex-col text-[12px]">
                          <span className="text-#1C4481 font-bold">
                            Exeperience Range
                          </span>
                          <span className="font-semibold">
                            {data.experience_range}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src={passcode} alt="" className="h-8" />
                        <div className="flex flex-col text-[12px]">
                          <span className="text-#1C4481 font-bold">
                            Active Days
                          </span>
                          <span className="font-semibold">
                            {data.no_of_days}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
          )}

        {fetchCreatedJob &&
          fetchCreatedJob.map((data) => {
            console.log(data);
            return (
              data.is_publish == false &&
              postedPage == false && (
                <>
                  <div className="w-full h-60 bg-white rounded-3xl mb-7">
                    <div className="flex h-1/2 items-center justify-between p-6">
                      <div className="flex flex-col mt-2">
                        <span className="text-[#1C4481] font-bold">
                          {data.job_title}
                        </span>
                        <span className="text-sm text-[#1C4481] font-medium">
                          Industry-{data.id_industry}
                        </span>
                        <span className="#292929 text-sm">
                          This job has many responsivities
                        </span>
                        <span className="#292929 text-sm">UI Design</span>
                        <span className="#292929 text-sm">
                          Android Studio Knowledge
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className=" flex border border-blue-950 p-2 px-4 rounded-3xl  text-blue-700 bg-white gap-3">
                          Edit
                          <img src={pen} className="w-5 h-5" />
                        </div>
                        <button
                          className="border p-2 px-8 rounded-3xl  text-white bg-blue-950"
                          onClick={() => publishJobHandler(data?.id)}
                        >
                          Publish Job
                        </button>
                      </div>
                    </div>
                    <hr class="border-t-[1px] border-[#1C4481]" />
                    <div className="flex justify-between p-6  text-[#1C4481]">
                      <div className="flex items-center gap-2">
                        <img src={pack} alt="" className="h-8" />
                        <div className="flex flex-col text-[12px]">
                          <span className="text-#1C4481  font-bold">
                            Created Date
                          </span>
                          <span className="font-semibold">{data.add_date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src={code} alt="" className="h-8" />
                        <div className="flex flex-col text-[12px]">
                          <span className="text-#1C4481 font-bold">
                            Department-
                          </span>
                          <span className="font-semibold">
                            {data.department_name}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src={duration} alt="" className="h-8" />
                        <div className="flex flex-col text-[12px]">
                          <span className="text-#1C4481 font-bold">
                            Exeperience Range
                          </span>
                          <span className="font-semibold">
                            {data.experience_range}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src={passcode} alt="" className="h-8" />
                        <div className="flex flex-col text-[12px]">
                          <span className="text-#1C4481 font-bold">
                            Active Days
                          </span>
                          <span className="font-semibold">
                            {data.no_of_days}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            );
          })}
      </div>
    </div>
  );
};

export default PostedJob;
