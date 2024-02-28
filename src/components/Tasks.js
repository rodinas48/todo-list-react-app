import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./tasks.css";
import axios from "axios";
function Tasks() {
  const [tasks, setTasks] = useState([]);
  const url = "http://localhost:3000/tasks";
  useEffect(() => {
    getTasks();
  }, [tasks]);
  const getTasks = async () => {
    
    try {
      const response = await axios.get(url);
      setTasks(response.data);
    } catch (error) {
      console.log("error fetching data", error);
    }
  };
  const deleteTask = async (id) => {
    if (window.confirm("Are you sure to delete this task?")) {
      try {
         await axios.delete(`${url}/${id}`);
      } catch (error) {
        console.error('error deleting data', error);
      }
    }
  }
  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Pending" ? "Completed ✅" : "Pending";
    try {
      await axios.patch(`${url}/${id}`, { status: newStatus });
      getTasks(); // Refresh tasks after updating status
    } catch (error) {
      console.error("error updating status", error);
    }
  };
  return (
    <div className="todo-list col-12 col-md-11">
      <h5>Todo List</h5>
      <table className="table ">
        <thead className="table-light ">
          <tr style={{ border: "transparent" }} className="col-12 col-md-9">
            <th scope="col" style={{ textAlign: "left" }}>
              List
            </th>
            <th scope="col">Status</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <tr
                key={task.id}
                className={`${
                  task.status === "Completed ✅" ? "completed-tr" : ""
                }`}
              >
                <td
                  style={{
                    textAlign: "left",
                    padding: "20px 50px",
                    wordBreak: "break-word",
                  }}
                >
                  {task.task}
                </td>
                <td>
                  <button
                    className={`status ${
                      task.status === "Completed ✅" ? "completed" : ""
                    }`}
                    onClick={() => toggleStatus(task.id, task.status)}
                  >
                    {task.status}
                  </button>
                </td>
                <td>
                  <button
                    className="delete"
                    onClick={() => deleteTask(task.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Tasks;
