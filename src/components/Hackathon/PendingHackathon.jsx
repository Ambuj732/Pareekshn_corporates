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
import PendingHackathonData from "../../actions/Hackathon/pendingHackathon";
function PendingHackathon() {
  const [pendingData, setPendingData] = useState([]);
  const [errors, setErrors] = useState(null);

  const getPendingHackathonData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User Data is :", user);
      const data = {
        usercode: user?.usercode,
        id_corp: 2,
        status: 1,
      };
      const response = await PendingHackathonData(data);
      if (response?.data?.code === 1000)
        setPendingData(response?.data?.hackathons);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };
  useEffect(() => {
    getPendingHackathonData();
  }, []);
  return (
    <div className="min-h-screen flex">
      <CorporateHackathonSidebar />
      <div className="w-5/6 p-4">
        <div className="flex items-center justify-between mb-4 p-4">
          <span className="font-semibold text-[#1C4481] text-2xl">
            Dashboard/{" "}
            <span className="text-[18px] text-black">Pending Hackathon</span>
          </span>
        </div>
        {pendingData &&
          pendingData.map((data) => (
            <>
              <div className="bg-[#EDF2FF] min-h-screen flex flex-col py-4 gap-8 rounded-3xl">
                <div
                  className={`w-[calc(100%-40px)] h-fit mx-auto bg-white rounded-3xl`}
                >
                  <div className="flex h-1/2 items-center justify-between p-6">
                    <div className="flex w-2/3 gap-2">
                      <img src={hackathon} alt="" className="h-1/6 w-1/6 " />
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#1C4481] text-lg">
                          {data.hackthon_title}
                        </span>
                        <span className="text-sm text-[#1C4481] font-medium">
                          UI/UX Designer
                        </span>
                        <span className="text-sm text-[#7B7B7B]">
                          Level-Easy
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center flex-col gap-2">
                      <div className="flex items-center border border-[#6F1818] h-8 w-fit px-4 rounded-md bg-[#FFDAB8]">
                        <div className="flex items-center gap-2">
                          <span className="text-[#6F1818] text-sm">
                            Pending for Approval
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center bg-[#1C4481] h-10 w-28 rounded-full justify-center">
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
                        <span className="font-semibold">
                          12-07-2023 | 12:30 PM
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
            </>
          ))}
      </div>
    </div>
  );
}

export default PendingHackathon;
