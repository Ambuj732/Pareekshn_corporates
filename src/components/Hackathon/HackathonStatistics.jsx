import React, { useState, useEffect, useRef } from "react";
import pen from "../../assets/Hackathon/pen.png";
import Chart from "chart.js/auto";
import CorporateHackathonSidebar from "./CorporateHackathonSidebar";
import getHackathonState from "../../actions/Dashboard/getHackathonState";
const HackathonStatistics = () => {
  const [states, setStates] = useState([]);
  const [errors, setErrors] = useState(null);
  const chartRef = useRef(null);
  const chartRefs = useRef(null);
  const getStaticData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        usercode: user?.token,
        id_corp: 2,
        start_date: "2024-05-03",
        end_date: "2024-06-03",
      };
      const response = await getHackathonState(data);
      console.log("completed data", response);
      if (response?.data?.code === 1000) setStates(response?.data?.hackathons);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  useEffect(() => {
    getStaticData();
  }, []);

  useEffect(() => {
    if (states.length > 0 && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      const enrolledStudents = states.map((data) => data.enrolled_student);
      const passedStudents = states.map((data) => data.passed_candidate);
      const labels = states.map((data, index) => `Hackathon-${index + 1}`);

      new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Enrolled Students",
              data: enrolledStudents,
              borderColor: "blue",
              borderWidth: 2,
              fill: false,
              showLine: true,
            },
            {
              label: "Passed Students",
              data: passedStudents,
              borderColor: "green",
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                display: false,
              },
            },
          },
        },
      });
    }
  }, [states]);

  useEffect(() => {
    if (states.length > 0 && chartRefs.current) {
      const ctx = chartRefs.current.getContext("2d");
      const enrolledStudents = states.map((data) => data.enrolled_student);
      const labels = states.map((data, index) => `Hackathon-${index + 1}`);

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Total No of Applicants",
              data: enrolledStudents,
              borderColor: "blue",
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(201, 203, 207, 0.2)",
              ],
              fill: false,
              showLine: true,
              barThickness: 20,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                display: false,
              },
            },
          },
        },
      });
    }
  }, [states]);

  return (
    <div className="h-screen flex overflow-hidden">
      <CorporateHackathonSidebar />
      <div className="h-screen w-screen flex flex-col  border rounded-2xl p-5 m-5 bg-[#e0e9f6] ">
        <div className="flex justify-between items-center gap-4 mb-5 p-1">
          <div className="border  rounded-xl  shadow-lg w-3/5 bg-white h-[300px]">
            <canvas ref={chartRef}></canvas>
          </div>
          <div className="border rounded-xl shadow-lg bg-white w-2/5 h-[300px]">
            <canvas ref={chartRefs}></canvas>
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
            {states &&
              states.map((data) => (
                <tbody className="border-b-[1px] border-blue-500">
                  <tr className="text-center">
                    <td>1</td>
                    <td>{data.enrolled_student}</td>
                    <td>{data.attempted_candidate}</td>
                    <td>{data.passed_candidate}</td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default HackathonStatistics;
