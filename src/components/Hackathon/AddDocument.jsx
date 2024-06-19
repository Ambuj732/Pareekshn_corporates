import React, { useState, useEffect } from "react";
import arrowLeft from "/arrowLeft.png";
import { FaEye } from "react-icons/fa6";
import CorporateHackathonSidebar from "./CorporateHackathonSidebar";
import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import addDocumentWeb from "../../actions/Dashboard/addDocumentWeb";
import fetchAllDocument from "../../actions/Dashboard/fetchAllDocument";

const AddDocument = () => {
  const { register, handleSubmit } = useForm();
  const [alldocument, setAllDocument] = useState([]);
  const formSubmitHandler = async (formData) => {
    try {
      console.log(formData);
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("user:", user);

      const file = formData?.attachment[0];
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

      console.log("Data", data);
      await addDocumentWeb(data);
      console.log("Data", data);
    } catch (error) {
      console.log("Error while logging with formData :: ", error);
    }
  };
  const getAllDocuments = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("user:", user);
      const data = {
        id_corp: user.id,
        usercode: user?.token,
      };
      const response = await fetchAllDocument(data);
      console.log(" data", response);
      if (response?.data?.code === 1000)
        setAllDocument(response?.data?.corp_docs);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  useEffect(() => {
    getAllDocuments();
  }, []);

  return (
    <div className=" w-screen h-screen flex  overflow-hidden">
      <CorporateHackathonSidebar />
      <div className="mb-4 mt-10 p-4">
        <span className="font-semibold text-nowrap text-[#1C4481] text-2xl">
          Dashboard/ Add Document
        </span>
      </div>
      <div className="flex w-screen gap-16 items-center h-screen mt-7">
        <div className="w-[39%] h-[70%] border rounded-2xl shadow-lg">
          <div className="bg-white border w-full h-16">
            <div className="flex gap-10  items-center mt-4 mx-4">
              {/* <img src={arrowLeft} /> */}
              <span className="text-black font-custom font-medium">
                Document
              </span>
            </div>
          </div>
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
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="documentType"
              >
                Document Name
              </label>
              <select
                id="documentType"
                //   value={documentType}

                className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                {...register("document_type")}
              >
                <option value="">Select Document Type</option>
                <option value="pan">PAN</option>
                <option value="tan">TAN</option>
                <option value="gst">GST</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="documentId"
              >
                Document Number/ID
              </label>
              <input
                type="text"
                id="documentId"
                //   value={documentId}
                className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Document Number/ID"
                {...register("document_number")}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="attachment"
              >
                Attachment
              </label>
              <div className="relative w-full h-12 border border-gray-300 rounded-md flex items-center justify-between px-3 shadow-sm">
                <span className="text-gray-500"></span>
                <input
                  type="file"
                  id="attachment"
                  placeholder="attachement"
                  className="absolute inset-0  opacity-0 w-full h-full cursor-pointer"
                  accept=".pdf, .jpg, .png"
                  {...register("attachment")}
                />
              </div>
              <p className="text-gray-500 text-sm mt-1">
                *pdf and jpg/png files can have max 5 MB size.
              </p>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-900 text-white px-36 py-3 rounded-full  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
        <div className="w-[35%] h-56  overflow-y-scroll bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <div className="bg-white text-white py-2 px-4 text-center">
            <h2 className="text-lg text-black font-semibold">Uploaded Docs</h2>
          </div>
          {alldocument &&
            alldocument.map((data) => (
              <div className=" mr-2">
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
  );
};

export default AddDocument;
