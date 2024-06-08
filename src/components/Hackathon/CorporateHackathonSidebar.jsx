import React, { useState } from "react";
import logo from "/logo.png";
import dashboard from "/Dashboard.png";
import user from "/userDashboard.png";
import stat from "/Stat.png";
import signout from "/signout.png";
import leftBanner from "/leftBanner.png";
import { Link, useNavigate } from "react-router-dom";

function CorporateHackathonSidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpen1, setIsMenuOpen1] = useState(false);
  const [isMenuOpen2, setIsMenuOpen2] = useState(false);
  const navigate = useNavigate();

  const handelLogout = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    navigate("/login");
  };

  return (
    <div className="bg-[#1C4481] h-screen w-1/5 flex flex-col justify-between">
      <div>
        <img src={logo} alt="" className="h-20" />
        <div className="py-4 flex flex-col">
          <Link to={"/dashboard"}>
            <div className="flex items-center w-4/5 cursor-pointer h-12 rounded-e-full bg-white text-[#1C4481] gap-2 py-2 px-4">
              <img src={dashboard} alt="" />
              <span className="font-semibold">Dashboard</span>
            </div>
          </Link>
          <Link to={"/dashboard/corporate-profile"}>
            <div className="flex items-center w-4/5 h-12s cursor-pointer rounded-e-full text-white gap-2 py-2 px-4">
              <img src={user} alt="" />
              <span className="">Profile</span>
            </div>
          </Link>
          <div
            onClick={() => {
              const open = isMenuOpen;
              setIsMenuOpen(!open);
            }}
            className="flex items-center cursor-pointer w-4/5 h-12 rounded-e-full text-white gap-2 py-2 px-4"
          >
            <img src={stat} alt="" />
            <span className="">Hackathon Status</span>
          </div>
          {isMenuOpen && (
            <div className="flex flex-col items-center">
              <Link to={"/next-hackathon"} className="w-4/5 h-12">
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="">Upcoming Hackathon</span>
                  </div>
                </div>
              </Link>
              <Link to={"/completed-hackathon"} className="w-4/5 h-12">
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="">Completed Hackathon</span>
                  </div>
                </div>
              </Link>
              <Link to={"/pending-hackathon"} className="w-4/5 h-12">
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="">Pending Hackathon</span>
                  </div>
                </div>
              </Link>
              <Link to={"/rejected-hackathon"} className="w-4/5 h-12">
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="">Rejected Hackathon</span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          <div
            onClick={() => {
              const open = isMenuOpen1;
              setIsMenuOpen1(!open);
            }}
            className="flex items-center cursor-pointer w-4/5 h-12 rounded-e-full text-white gap-2 py-2 px-4"
          >
            <img src={user} alt="" />
            <span className="">Jobs</span>
          </div>

          {isMenuOpen1 && (
            <div className="flex flex-col items-center">
              <Link to={"/dashboard/postedjob"} className="w-4/5 h-12">
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="">Published Job</span>
                  </div>
                </div>
              </Link>
              <Link to={"/dashboard/createnewjob"} className="w-4/5 h-12">
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="">Create New Job</span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          <div
            onClick={() => {
              const open = isMenuOpen2;
              setIsMenuOpen2(!open);
            }}
            className="flex items-center cursor-pointer w-4/5 h-12 rounded-e-full text-white gap-2 py-2 px-4"
          >
            <img src={user} alt="" />
            <span className="">Statics</span>
          </div>

          {isMenuOpen2 && (
            <div className="flex flex-col items-center">
              <Link
                to={"/dashboard/hackathonstatistics"}
                className="w-4/5 h-12"
              >
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="">Hackathon Statics</span>
                  </div>
                </div>
              </Link>
              <Link
                to={"/dashboard/hackathonstatistics"}
                className="w-4/5 h-12"
              >
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className=""> job Statics</span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          <div className="flex items-center cursor-pointer w-4/5 h-12 rounded-e-full text-white gap-2 py-2 px-4">
            <img src={signout} alt="" />
            <span className=" " onClick={handelLogout}>
              Logout
            </span>
          </div>
        </div>
      </div>
      <img src={leftBanner} alt="" className="p-4" />
    </div>
  );
}

export default CorporateHackathonSidebar;
