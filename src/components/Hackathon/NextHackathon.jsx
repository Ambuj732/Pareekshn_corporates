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
import upComingHackathon from "../../actions/Hackathon/upComingHackathon";

function NextHackathon() {
  const [upComingHackathonData, setupComingHackathonData] = useState([]);

  const getupComingHackathonData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        usercode: user?.token,
        id_corp: 2,
        status: 3,
      };
      const response = await upComingHackathon(data);
      console.log("Upcoming Hackathon data", response);
      if (response?.data?.code === 1000)
        setupComingHackathonData(response?.data?.hackathons);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };
  useEffect(() => {
    getupComingHackathonData();
  }, []);

  return (
    <div className="min-h-screen flex">
      <CorporateHackathonSidebar />
      <div className="w-5/6 p-4">
        <div className="flex items-center justify-between mb-4 p-4">
          <span className="font-semibold text-[#1C4481] text-2xl">
            Dashboard/{" "}
            <span className="text-[18px] text-black">Upcoming Hackathon</span>
          </span>
        </div>
        <div className="bg-[#EDF2FF]  flex flex-col py-4 gap-8 rounded-3xl overflow-y-scroll">
          {upComingHackathonData.map((data) => (
            <div
              key={data.id}
              className={`w-[calc(100%-40px)] h-fit mx-auto rounded-3xl ${
                data.paid_type
                  ? "bg-gradient-to-br from-yellow-300 to-yellow-600"
                  : "bg-[#FFFFFF]"
              }`}
            >
              <div className="flex h-1/2 items-center justify-between relative p-6">
                {data.paid_type && (
                  <img
                    src={paidcorner}
                    alt=""
                    className="absolute top-10 left-10 transform -translate-x-1/2 -translate-y-1/2"
                  />
                )}
                <div className="flex w-2/3 gap-2 px-12">
                  <img
                    src={data.banner_pic}
                    alt="blank"
                    className="h-1/6 w-1/6"
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
                {!data.paid_type && (
                  <div className="flex items-center bg-[#1C4481] h-10 w-28 rounded-full justify-center">
                    <span className="text-white">Free</span>
                  </div>
                )}
                {data.paid_type && (
                  <div className="flex items-center h-10 w-28 rounded-full justify-center">
                    <span className="font-semibold text-2xl">
                      Rs.{data.amount}
                    </span>
                  </div>
                )}
              </div>
              <hr className="border-t-[1px] border-[#1C4481]" />
              <div
                className={`p-4 ${
                  data.paid_type
                    ? "bg-gradient-to-br from-yellow-300 to-yellow-600"
                    : ""
                } rounded-b-3xl`}
              >
                <div className="flex bg-white justify-between text-[#1C4481] rounded-xl p-2">
                  <div className="flex items-center gap-2">
                    <img src={date} alt="" className="h-8" />
                    <div className="flex flex-col text-[12px]">
                      <span>Date & Time</span>
                      <span className="font-semibold">
                        {data.date_of_exam} | {data.exam_start_time}
                      </span>
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
                        {data.state}, {data.city}
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default NextHackathon;
