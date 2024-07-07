import React, { useState, useEffect, useRef } from "react";
import pen from "../../assets/Hackathon/pen.png";
import Chart from "chart.js/auto";
import CorporateHackathonSidebar from "./CorporateHackathonSidebar";
import getJobPostState from "../../actions/Dashboard/getJobPostState";
const HackathonStatistics = () => {
  const [states, setStates] = useState([]);
  const [errors, setErrors] = useState(null);
  const chartRef = useRef(null);
  const chartRefs = useRef(null);

  const getJobStaticData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        usercode: user?.token,
        id_corp: 2,
        start_date: "2024-04-03",
        end_date: "2024-05-03",
      };
      const response = await getJobPostState(data);
      console.log("completed data", response);
      if (response?.data?.code === 1000) setStates(response?.data?.jobs);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  useEffect(() => {
    getJobStaticData();
  }, []);

  useEffect(() => {
    if (states.length > 0 && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      const job = states.map((data) => data.job_title);
      const appliedCandidate = states.map((data) => data.applied_candidate);
      const labels = states.map((data, index) => `Hackathon-${index + 1}`);

      new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Jobs",
              data: job,
              borderColor: "blue",
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Applied Candidate",
              data: appliedCandidate,
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
      const appliedCandidate = states.map((data) => data.applied_candidate);
      const labels = states.map((data, index) => `Hackathon-${index + 1}`);

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Applied Candidate",
              data: appliedCandidate,
              borderColor: "green",
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
          <div className="flex justify-between items-center">
            <span>All Hackathon Lists</span>
            <div className="flex justify-around items-center gap-7 mx-4 border border-black rounded-2xl px-2 mb-3">
              <span>Date</span>
              <img src={pen} />
            </div>
          </div>
          <table className="table-auto  h-[200px]  border-2">
            <thead>
              <tr className="bg-blue-300 text-#000000">
                <th className="text-sm p-4">Job Title</th>
                <th className="text-sm p-4">Industry</th>
                <th className="text-sm p-4">Department</th>
                <th className="text-sm p-4"> Experience Range</th>
                <th className="text-sm p-4"> Salary Range</th>
                <th className="text-sm p-4"> Applied Candidate</th>
              </tr>
            </thead>
            {states &&
              states.map((data) => (
                <tbody className="border-b-[1px] border-blue-500">
                  <tr className="text-center">
                    <td>{data.job_title}</td>
                    <td>{data.industry_name}</td>
                    <td>{data.department_name}</td>
                    <td>{data.experience_range}</td>
                    <td>
                      {data.min_salary} to {data.max_salary}
                    </td>
                    <td>{data.applied_candidate}</td>
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
