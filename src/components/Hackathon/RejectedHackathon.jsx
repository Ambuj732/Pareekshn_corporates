import React, { useState, useEffect } from "react";
import avatar from "/avatar.png";
import profileComletion from "/profileCompletion.png";
import CorporateHackathonSidebar from "./CorporateHackathonSidebar";
import mock from "/mock.png";
import start from "/start.png";
import pack from "/pack.png";
import code from "/code.png";
import duration from "/duration.png";
import passcode from "/passcode.png";
import banner1 from "/banner1.png";
import digital from "/digital.png";
import gamer from "/gamer.png";
import topad from "../../assets/Hackathon/topad.png";
import social from "../../assets/Hackathon/social.png";
import paid from "../../assets/Hackathon/paid.png";
import free from "../../assets/Hackathon/free.png";
import hackathon from "../../assets/Hackathon/hackathon.png";
import date from "../../assets/Hackathon/date.png";
import sector from "../../assets/Hackathon/sector.png";
import location from "../../assets/Hackathon/location.png";
import level from "../../assets/Hackathon/level.png";
import bottom from "../../assets/Hackathon/bottom.png";
import paidcorner from "../../assets/Hackathon/paidcorner.png";
import rejectedHackathonData from "../../actions/Hackathon/rejectedHackathon";

function RejectedHackathon() {
  const [rejectedHackathon, setRejectedHackathon] = useState([]);
  const [errors, setErrors] = useState(null);

  const getRejectedHackathon = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User Data is :", user);
      const data = {
        usercode: user?.usercode,
        id_corp: 2,
        status: 2,
      };
      const response = await rejectedHackathonData(data);
      if (response?.data?.code === 1000)
        setRejectedHackathon(response?.data?.hackathons);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };
  useEffect(() => {
    getRejectedHackathon();
  }, []);

  return (
    <div className="min-h-screen flex">
      <CorporateHackathonSidebar />
      <div className="w-5/6 p-4">
        <div className="flex items-center justify-between mb-4 p-4">
          <span className="font-semibold text-[#1C4481] text-2xl">
            Dashboard/{" "}
            <span className="text-[18px] text-black">Rejected Hackathon</span>
          </span>
        </div>
        {rejectedHackathon &&
          rejectedHackathon.map((data) => (
            <div className="bg-[#EDF2FF] min-h-screen flex flex-col py-4 gap-8 rounded-3xl">
              <div
                className={`w-[calc(100%-40px)] h-fit mx-auto bg-white rounded-3xl`}
              >
                <div className="flex h-1/2 items-center justify-between p-6">
                  <div className="flex w-2/3 gap-2">
                    <img
                      src={data.banner_pic}
                      alt="blank"
                      className="h-1/6 w-1/6 "
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#1C4481] text-lg">
                        {data.hackthon_title}
                      </span>
                      <span className="text-sm text-[#1C4481] font-medium">
                        {data.sector_name}
                      </span>
                      <span className="text-sm text-[#7B7B7B]">
                        Level-{data.level_difficulty_name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center flex-col gap-2">
                    <div className="flex items-center border border-[#D13C0C] h-8 w-fit px-4 rounded-md bg-[#D13C0C] cursor-pointer">
                      <div className="flex items-center gap-2 ">
                        <span className="text-white text-sm">Rejected</span>
                      </div>
                    </div>
                    <div className="flex items-center bg-[#1C4481] h-10 w-28 rounded-full justify-center cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span className="text-white ">Free</span>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="border-t-[1px] border-[#1C4481]" />
                <div className="flex justify-between p-6  text-[#1C4481]">
                  <div className="flex items-center gap-2">
                    <img src={date} alt="" className="h-8" />
                    <div className="flex flex-col text-[12px]">
                      <span>Date & Time</span>
                      <span className="font-semibold">{data.date_of_exam}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={sector} alt="" className="h-8" />
                    <div className="flex flex-col text-[12px]">
                      <span>Sector</span>
                      <span className="font-semibold">{data.sector_name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={location} alt="" className="h-8" />
                    <div className="flex flex-col text-[12px]">
                      <span>Location</span>
                      <span className="font-semibold">
                        {data.city},{data.state}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={level} alt="" className="h-8" />
                    <div className="flex flex-col text-[12px]">
                      <span>Level</span>
                      <span className="font-semibold">
                        {data.level_difficulty_name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`w-[calc(100%-40px)] h-fit mx-auto rounded-3xl bg-gradient-to-br from-yellow-300 to-yellow-600`}
              >
                <div className="flex h-1/2 items-center justify-between relative p-6">
                  <img
                    src={paidcorner}
                    alt=""
                    className="absolute top-10 left-10 transform -translate-x-1/2 -translate-y-1/2"
                  />
                  <div className="flex w-2/3 gap-2 px-12">
                    <img
                      src={data.banner_pic}
                      alt="blank"
                      className="h-1/6 w-1/6 "
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#1C4481] text-lg">
                        {data.hackthon_title}
                      </span>
                      <span className="text-sm text-[#1C4481] font-medium">
                        {data.sector_name}
                      </span>
                      <span className="text-sm text-[#7B7B7B]">
                        Level-{data.level_difficulty_name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center flex-col gap-2">
                    <div className="flex items-center border border-[#D13C0C] h-8 w-fit px-4 rounded-md bg-[#D13C0C] cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span className="text-white text-sm">Rejected</span>
                      </div>
                    </div>
                    <div className="flex items-center h-10 w-28 rounded-full justify-center">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-2xl">Rs.100</span>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="border-t-[1px] border-[#1C4481]" />
                <div className="bg-gradient-to-br from-yellow-300 p-4 to-yellow-600 rounded-b-3xl ">
                  <div className="flex bg-white justify-between text-[#1C4481] rounded-xl p-2">
                    <div className="flex items-center gap-2">
                      <img src={date} alt="" className="h-8" />
                      <div className="flex flex-col text-[12px]">
                        <span>Date & Time</span>
                        <span className="font-semibold">
                          {data.date_of_exam},{data.exam_start_time}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={sector} alt="" className="h-8" />
                      <div className="flex flex-col text-[12px]">
                        <span>Sector</span>
                        <span className="font-semibold">
                          {data.sector_name}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={location} alt="" className="h-8" />
                      <div className="flex flex-col text-[12px]">
                        <span>Location</span>
                        <span className="font-semibold">
                          {data.city},{data.state}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={level} alt="" className="h-8" />
                      <div className="flex flex-col text-[12px]">
                        <span>Level</span>
                        <span className="font-semibold">
                          {data.level_difficulty_name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RejectedHackathon;
