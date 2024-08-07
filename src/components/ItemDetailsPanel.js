// src/components/ItemDetailsPanel.js
import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import EditIcon from "./EditIcon";
import SpinnerComp from "./SpinnerComp";
import { generate_item, generate_techpack } from "../api";

import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function ItemDetailsPanel({
  title,
  description,
  onUpdate,
  onItemDataUpdate,
  techpack_url,
  gender,
  setGender,
  item_id,
  setLoading,
  img_urls,
}) {
  const [editMode, setEditMode] = useState(false);
  const [editableTitle, setEditableTitle] = useState(title);
  const [editableDescription, setEditableDescription] = useState(description);
  const [editableGender, setEditableGender] = useState(gender);
  const [localTechpackUrl, setLocalTechpackUrl] = useState(techpack_url);
  const [loading, setLocalLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowDownloadButton, setShouldShowDownloadButton] = useState(
    localTechpackUrl && localTechpackUrl.trim() !== ""
  );
  const navigate = useNavigate();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleImage1Change = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const uniqueId = uuidv4();
    console.log(img_urls[0]);
    navigate(`/loading/${uniqueId}`, {
      state: { file: selectedFile, clothing: img_urls[0], uniqueId },
    });
  };

  useEffect(() => {
    setEditableTitle(title);
    setEditableDescription(description);
    setLocalTechpackUrl(techpack_url);
  }, [title, description, techpack_url]);

  const handleTitleChange = (event) => {
    setEditableTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setEditableDescription(event.target.value);
  };

  const saveChanges = async () => {
    onUpdate(editableTitle, editableDescription, editableGender);
    console.log(editableGender);
    setEditMode(false);
    setLocalLoading(true);
    setLoading(true);
    const generatedData = await generate_item(
      editableTitle,
      editableDescription,
      editableGender,
      item_id
    );
    console.log("Generated New Item:", generatedData);
    onItemDataUpdate(generatedData);
    setLocalLoading(false);
  };

  const handleDownloadTechpack = () => {
    window.open(localTechpackUrl, "_blank");
  };

  const handleGenerateTechpack = async () => {
    setLocalLoading(true);
    const newTechpackData = await generate_techpack(
      editableTitle,
      editableDescription,
      gender,
      item_id,
      img_urls
    );
    if (newTechpackData && newTechpackData.techpack_url) {
      setLocalTechpackUrl(newTechpackData.techpack_url);
      onItemDataUpdate(newTechpackData);
    }
    console.log("Generated Techpack:", newTechpackData.techpack_url);
    setLocalLoading(false);
    setShouldShowDownloadButton(true);
  };

  return (
    <div className="space-y-6 mt-20">
      {editMode ? (
        <>
          <input
            type="text"
            value={editableTitle}
            onChange={handleTitleChange}
            className="w-full p-2 text-3xl rounded border border-black"
          />
          <textarea
            type="text"
            value={editableDescription}
            onChange={handleDescriptionChange}
            className="w-full p-2 text-base border border-black rounded"
            rows="6"
          />
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={() => setEditableGender(true)}
              className={`px-4 py-2 text-lg rounded-full font-semibold ${
                editableGender
                  ? "bg-black text-white"
                  : "text-black border border-white"
              }`}
            >
              Womenswear
            </button>
            <button
              onClick={() => setEditableGender(false)}
              className={`px-4 py-2 text-lg rounded-full font-semibold ${
                !editableGender
                  ? "bg-black text-white"
                  : "text-black border border-white"
              }`}
            >
              Menswear
            </button>
          </div>
          <Button onClick={saveChanges} color="green" className="px-4 py-2">
            {loading ? <SpinnerComp /> : "Save"}
          </Button>
          <Button onClick={() => setEditMode(false)} className="ml-4 px-4 py-2">
            Cancel
          </Button>
        </>
      ) : (
        <>
          <h1 className="text-3xl">{editableTitle}</h1>
          <p>{editableDescription}</p>
          <div></div>
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-3 bg-black text-white rounded hover:bg-black"
          >
            <div className="flex flex-row justify-between">
              <p className="mr-2">Edit Item Details</p>
              <EditIcon />
            </div>
          </button>
        </>
      )}
      <div className="flex flex-col gap-5 my-5">
        <Button
          color="green"
          onClick={handleGenerateTechpack}
          className="flex items-center gap-3 justify-center"
        >
          {loading ? <SpinnerComp /> : "Generate Techpack"}
          {!loading && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.455L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
              />
            </svg>
          )}
        </Button>
        {shouldShowDownloadButton && (
          <Button
            className="flex items-center gap-3 justify-center"
            onClick={handleDownloadTechpack}
          >
            Download Techpack
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </Button>
        )}
        <div className="max-w-md mt-5 ">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div
              className="cursor-pointer p-6 bg-blue-500 text-white flex justify-between items-center"
              onClick={toggleExpand}
            >
              <h3 className="text-lg font-semibold">Virtual Try-On Tool</h3>
              <svg
                className={`w-6 h-6 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {isExpanded && (
              <div className="text-center p-4 bg-gray-100">
                <p className="text-sm text-gray-700 mb-4">
                  This tool allows you to visualize how different top-wear
                  items, such as jackets and shirts, look on you or on any
                  model. Simply upload an image of a person—whether it's
                  yourself or a stock photo—and our tool will digitally fit the
                  selected clothing item onto the image. Please note, this
                  feature is optimized for top wear and may not support pants or
                  other garments.
                </p>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="file-upload"
                >
                  Upload Your Image
                </label>
                <div className="relative flex items-center justify-center px-4 py-3 bg-gray-300 text-black rounded hover:bg-gray-300 transition-colors cursor-pointer">
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleImage1Change}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 9V6a3 3 0 00-3-3H7a3 3 0 00-3 3v8a3 3 0 003 3h2"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 15H21M16.5 10.5l4.5 4.5m0 0l-4.5 4.5m4.5-4.5H9.75"
                    />
                  </svg>
                  <span>Choose File</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
