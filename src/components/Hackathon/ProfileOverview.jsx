import React, { useState, useEffect } from "react";
import CorporateHackathonSidebar from "./CorporateHackathonSidebar";
import { useForm } from "react-hook-form";
import edits from "../../assets/Hackathon/edits.png";
import parekshn from "../../assets/Hackathon/parekshn.png";
import addAboutUs from "../../actions/Dashboard/addAboutUsImage";
import addAboutVideo from "../../actions/Dashboard/addAboutUsVideo";
import getAddEmployee from "../../actions/Dashboard/getAddEmployee";
const ProfileOverview = () => {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState(null);
  const [selectedOption, setSelectedOption] = useState("image");
  const [profileData, setProfileData] = useState([]);
  const addAboutUsHandler = async (formData) => {
    setErrors([]);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("USER:", user);
      console.log("data is", formData);
      const file = formData.attachment;
      const imageData = {
        id_corp: user?.id,
        usercode: user?.token,
        type: 1,
        title: formData?.title,
        detail: formData?.description,
        attachment: 1,
        req_by: 1,
        file: file,
      };
      const videoData = {
        id_corp: user?.id,
        usercode: user?.token,
        type: 1,
        title: formData?.title,
        detail: formData?.description,
        topic_url: formData?.video,
      };

      if (selectedOption === "image") {
        await addAboutUs(imageData);
      } else if (selectedOption === "video") {
        await addAboutVideo(videoData);
      }

      console.log(imageData);
      console.log(videoData);
    } catch (error) {
      setErrors([error.message]);
    }
  };

  const getAboutUsData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("USER:", user);
      const data = {
        id_corp: user.id,
        usercode: user.token,
      };
      console.log(data);
      const response = await getAddEmployee(data);
      if (response.data.code === 1000) {
        setProfileData(response?.data?.about_us.about);
      }
    } catch (error) {
      console.log("data did not fetch", error);
      setErrors([error.message]);
    }
  };

  useEffect(() => {
    getAboutUsData();
  }, []);

  const extractVideoId = (url) => {
    let videoId = "";
    if (url.includes("youtu.be")) {
      videoId = url.split("/")?.pop();
      console.log(videoId);
    }
    return videoId;
  };

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <CorporateHackathonSidebar />

      <div className="bg-[#EDF2FF] min-h-screen w-screen m-3 flex rounded-3xl">
        <div className="bg-white min-h-screen flex items-center gap-16 w-full m-7">
          <div className="w-[39%] h-[80%] mx-4">
            <div className="bg-white w-full h-16">
              <div className="flex gap-10 items-center mt-4 mx-4">
                <span className="text-black font-custom font-medium">
                  Profile overview
                </span>
              </div>
            </div>
            <div className="flex flex-col ml-4">
              <span className="font-custom font-medium">Detail</span>
              <span className="font-custom text-gray-500">
                Add your info in Detail
              </span>
            </div>
            <form
              onSubmit={handleSubmit(addAboutUsHandler)}
              className="p-4 max-w-lg mx-auto"
            >
              <div className="mb-7">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="block pl-2 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer items-center"
                  placeholder="Title"
                  {...register("title")}
                />
              </div>

              <div className="mb-7">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  className="block pl-2 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer items-center"
                  placeholder="Description"
                  {...register("description")}
                />
              </div>

              <div className="flex justify-around items-center mt-10">
                <div className="flex gap-5">
                  <input
                    id="radio1"
                    type="radio"
                    name="media"
                    value="image"
                    checked={selectedOption === "image"}
                    onChange={() => setSelectedOption("image")}
                    className="w-5 h-5 border-black rounded"
                  />
                  <label htmlFor="radio1">Image</label>
                </div>
                <div className="flex gap-5">
                  <input
                    id="radio2"
                    type="radio"
                    name="media"
                    value="video"
                    checked={selectedOption === "video"}
                    onChange={() => setSelectedOption("video")}
                    className="w-5 h-5 border-black rounded"
                  />
                  <label htmlFor="radio2">Video</label>
                </div>
              </div>

              {selectedOption === "video" && (
                <div className="flex mt-7">
                  <input
                    type="text"
                    placeholder="Video URL"
                    className="w-full border-b-2 cursor-pointer focus:outline-none border-gray-500"
                    {...register("video")}
                  />
                </div>
              )}
              {selectedOption === "image" && (
                <div className="flex mt-7">
                  <input
                    type="file"
                    placeholder="attachment"
                    className="w-full border-b-2 cursor-pointer focus:outline-none border-gray-500"
                    {...register("attachment")}
                  />
                </div>
              )}

              <div className="flex justify-center mt-16">
                <button
                  type="submit"
                  className="bg-blue-900 text-white px-36 py-3 rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="border-black border my-28 h-[600px]"></div>

          <div className="w-[39%] h-[80%] flex flex-col gap-10 overflow-y-scroll">
            {profileData.length > 0 &&
              profileData.map((data) => {
                if (profileData && data?.media_type === 1) {
                  console.log(data.topic_url);
                  const imgUrl = data?.topic_url;
                  return (
                    <div className="border rounded-2xl flex flex-col mb-1 border-green-400 w-4/5 h-52">
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-2 m-2">
                          <span className="text-lg">{data.topic_title}</span>
                          {imgUrl && <img src={imgUrl} alt="blank" />}
                        </div>
                        <img src={edits} className="w-10 h-7" alt="Edit" />
                      </div>
                      <div className="flex items-center mx-4 mb-2">
                        <span className="font-normal text-gray-500">
                          {data.topic_detail}
                        </span>
                      </div>
                    </div>
                  );
                }
              })}

            {profileData.length > 0 &&
              profileData.map((data) => {
                if (profileData && data.media_type === 2) {
                  const videoUrl = data.topic_url;
                  console.log("videoUrl", videoUrl);
                  const videoId = extractVideoId(videoUrl);
                  console.log(videoId);
                  return (
                    <div className="border rounded-2xl flex flex-col mb-1 border-green-400 w-4/5 h-auto">
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-2 m-2">
                          <span className="text-lg text-red-600">
                            {data.topic_title}
                          </span>
                          <iframe
                            width="280"
                            height="160"
                            className="border rounded-lg"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen
                          ></iframe>
                        </div>
                        <img src={edits} className="w-10 h-7" alt="Edit" />
                      </div>
                      <div className="flex items-center mx-4 mb-2">
                        <span className="font-normal text-gray-500">
                          {data.topic_detail}
                        </span>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
