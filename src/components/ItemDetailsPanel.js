import React, { useState } from "react";

export default function ItemDetailsPanel({
  title,
  description,
  onUpdate,
  gender,
  setGender,
}) {
  const [editMode, setEditMode] = useState(false);
  const [editableTitle, setEditableTitle] = useState(title);
  const [editableDescription, setEditableDescription] = useState(description);

  const handleTitleChange = (event) => {
    setEditableTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setEditableDescription(event.target.value);
  };

  const saveChanges = () => {
    onUpdate(editableTitle, editableDescription);
    setEditMode(false);
  };

  return (
    <div className="space-y-4">
      {editMode ? (
        <>
          <input
            type="text"
            value={editableTitle}
            onChange={handleTitleChange}
            className="w-full p-2 text-2xl font-semibold rounded"
          />
          <textarea
            value={editableDescription}
            onChange={handleDescriptionChange}
            className="w-full p-2 text-base rounded"
            rows="4"
          />
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={() => setGender(false)}
              className={`px-4 py-2 text-lg rounded-full font-semibold ${
                !gender
                  ? "bg-blue-500 text-white"
                  : "text-blue-500 border border-blue-500"
              }`}
            >
              Womenswear
            </button>
            <button
              onClick={() => setGender(true)}
              className={`px-4 py-2 text-lg rounded-full font-semibold ${
                gender
                  ? "bg-blue-500 text-white"
                  : "text-blue-500 border border-blue-500"
              }`}
            >
              Menswear
            </button>
          </div>
          <button
            onClick={saveChanges}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h1 className="text-3xl">{editableTitle}</h1>
          <p>{editableDescription}</p>
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
}
