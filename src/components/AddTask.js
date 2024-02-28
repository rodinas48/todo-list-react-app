import axios from "axios";
import React, { useRef, useState } from "react";
import "./addTask.css";
function AddTask() {
  const [task, setTask] = useState("");
  const inputRef = useRef();
  const [status, setStatus] = useState("Pending");
  const [showAlert, setShowAlert] = useState(false);
  const handleAdd = async () => {
    if (task === "") {
      setShowAlert(true);
      return;    
    }
    try {
       await axios.post("http://localhost:3000/tasks", {
        task,
        status,
      });
      setShowAlert(false);
      setTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="inputDiv col-12 col-md-11">
      <input
        ref={inputRef}
        type="text"
        id="todo-input"
        placeholder="What would you like to do?"
        onChange={(e) => setTask(e.target.value)}
      />
      {showAlert && (
        <div className="alert alert-danger w-50 mx-auto mt-2 mb-0" role="alert">
          Please Enter a Task!
        </div>
      )}
      <button
        className="btn"
        onClick={() => {
          handleAdd();
          inputRef.current.value = "";
        }}
      >
        Add
      </button>
    </div>
  );
}

export default AddTask;
