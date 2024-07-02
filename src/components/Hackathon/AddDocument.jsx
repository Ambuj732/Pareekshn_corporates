import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa6";
import CorporateHackathonSidebar from "./CorporateHackathonSidebar";
import { useForm } from "react-hook-form";
import addDocumentWeb from "../../actions/Dashboard/addDocumentWeb";
import fetchAllDocument from "../../actions/Dashboard/fetchAllDocument";
import attach from "../../assets/Hackathon/attach.png";

const AddDocument = () => {
  const { register, handleSubmit, reset } = useForm();
  const [alldocument, setAllDocument] = useState([]);
  const [errors, setErrors] = useState([]);

  const formSubmitHandler = async (formData) => {
    setErrors([]);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const file = formData?.attachment[0];

      // File size validation
      if (file && file.size > 5 * 1024 * 1024) {
        setErrors(["File size exceeds 5MB."]);
        return;
      }

      let fileType = 1;
      if (file.type === "application/pdf") {
        fileType = 1;
      } else if (file.type.startsWith("image/")) {
        fileType = 2;
      }

      const data = {
        id_corp: user?.id,
        usercode: user?.token,
        file_type: fileType,
        doc_no: formData?.document_number,
        id_req_doc: 1,
        file: file,
        file_name: formData?.document_type,
      };

      await addDocumentWeb(data);
      reset();
      getAllDocuments();
    } catch (error) {
      setErrors([error.message]);
    }
  };

  const getAllDocuments = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const data = {
        id_corp: user.id,
        usercode: user?.token,
      };
      const response = await fetchAllDocument(data);
      if (response?.data?.code === 1000) {
        setAllDocument(response?.data?.corp_docs);
      }
    } catch (error) {
      setErrors([error.message]);
    }
  };

  useEffect(() => {
    getAllDocuments();
  }, []);

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <CorporateHackathonSidebar />

      <div className="bg-[#EDF2FF] min-h-screen w-screen m-3 flex  rounded-3xl">
        <div className="bg-white min-h-screen flex items-center  gap-6  w-full m-7 rounded-3xl">
          <div className="w-[39%] h-[70%] mx-10">
            {/* <div className="bg-white  w-full h-16">
              <div className="flex gap-10 items-center mt-4 mx-4">
                <span className="text-black font-custom font-medium">
                  Document
                </span>
              </div>
            </div> */}
            <div className="flex flex-col ml-4 ">
              <span className="font-custom font-medium">Documents</span>
              <span className="font-custom text-gray-500">
                Add Document to authentication
              </span>
            </div>
            <form
              onSubmit={handleSubmit(formSubmitHandler)}
              className="p-4 max-w-lg mx-auto"
            >
              <div className="mb-7">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="documentType"
                >
                  Document Name
                </label>
                <select
                  id="documentType"
                  className="block pl-2 h-14 w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer "
                  {...register("document_type", { required: true })}
                >
                  <option value="">Select Document Type</option>
                  <option value="pan">PAN</option>
                  <option value="tan">TAN</option>
                  <option value="gst">GST</option>
                </select>
              </div>

              <div className="mb-7">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="documentId"
                >
                  Document Number/ID
                </label>
                <input
                  type="text"
                  id="documentId"
                  className="block pl-2 text-black  h-14 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer items-center"
                  placeholder="Document Number/ID"
                  {...register("document_number", { required: true })}
                />
              </div>

              <div className="mb-7">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="attachment"
                >
                  Attachment
                </label>
                <div className="relative w-full h-14  border border-black rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500  flex items-center  gap-3 px-3 shadow-sm">
                  <img src={attach} className="w-5 h-5" />
                  <span className="text-gray-500">attachment</span>
                  <input
                    type="file"
                    id="attachment"
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    accept=".pdf, .jpg, .png"
                    {...register("attachment", { required: true })}
                  />
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  *pdf and jpg/png files can have max 5 MB size.
                </p>
              </div>

              {errors.length > 0 && (
                <div className="text-red-500 text-sm mb-4">
                  {errors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}

              <div className="flex justify-center mt-14">
                <button
                  type="submit"
                  className="bg-blue-900 text-white px-36 py-3 rounded-full "
                >
                  Upload
                </button>
              </div>
            </form>
          </div>

          <div className=" border-black border my-28  h-[600px]"></div>

          <div className="w-[35%] -mt-56 mx-10 h-72 overflow-y-scroll bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <div className="bg-white text-white py-2 px-4 text-center">
              <h2 className="text-lg text-black font-semibold">
                Uploaded Docs
              </h2>
            </div>
            {alldocument &&
              alldocument.map((data, index) => (
                <div className="mr-2" key={index}>
                  <div className="flex items-center justify-between bg-gray-100 p-3 mb-2 rounded-md shadow-md">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 mr-4">
                        {data.doc_name}
                      </span>
                      <span>{data.doc_no}</span>
                      <span className="text-gray-500"></span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaEye />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDocument;
