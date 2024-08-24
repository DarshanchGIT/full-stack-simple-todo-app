import "./CreateTodo.css";
import { useState } from "react";

const url = "http://localhost:3000/todo";

export const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Input handlers
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleOnClick = async () => {
    // Create a body to parse
    const payLoad = {
      title,
      description,
    };

    try {
      //soemthing new, focus on this
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payLoad),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Clear input fields
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>Add todo</h2>
      <div className="container">
        <input
          className="input-title-divs "
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          className="input-description-divs "
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <button type="button" className="form-btn" onClick={handleOnClick}>
          Create
        </button>
      </div>
    </>
  );
};
