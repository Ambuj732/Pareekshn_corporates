import React from "react";
import pen from "../../assets/Hackathon/pen.png";

import CorporateHackathonSidebar from "./CorporateHackathonSidebar";

const HackathonStatistics = () => {
  return (
    <div className="h-screen flex overflow-hidden">
      <CorporateHackathonSidebar />
      <div className="h-screen w-screen flex flex-col  border rounded-2xl p-5 m-5 bg-[#e0e9f6] ">
        <div className="flex justify-between items-center gap-4 mb-5 p-1">
          <div className="border  rounded-xl  shadow-lg w-3/5 bg-white h-[300px]"></div>
          <div className="border rounded-xl shadow-lg bg-white w-2/5 h-[300px]">
            {" "}
          </div>
        </div>
        <div className=" flex flex-col border  rounded-2xl bg-white shadow-lg p-4 ">
          <div className="flex justify-between">
            <span>All Hackathon Lists</span>
            <div className="flex justify-around gap-7 mx-2 border border-black rounded-2xl px-2 mb-3">
              <span>Date</span>
              <img src={pen} />
            </div>
          </div>
          <table className="table-auto  h-[200px] p-2 border-2 ">
            <thead>
              <tr className="bg-blue-300 text-#000000">
                <th className="text-sm p-4">Past Hackathon</th>
                <th className="text-sm p-4"> Total No of applicants</th>
                <th className="text-sm p-4">
                  Total No of applicants given exam
                </th>
                <th className="text-sm p-4"> Total No of applicants passed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HackathonStatistics;
