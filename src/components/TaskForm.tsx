import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Task from "../../interface";
import TaskFormProps from "../../props";
import SortAndFilter from "./SortandFilter.tsx";

const TaskForm: React.FC<TaskFormProps> = ({ tasks, setTasks }) => {
  const [task, setTask] = useState<Task>({
    id: Date.now(),
    name: "",
    description: "",
    priority: "Low",
    isComplete: false,
  });

  const [errors, setErrors] = useState({ name: false, description: false });

  const { state } = useLocation();

  const [filter, setFilter] = useState(
    state?.filter || { isComplete: "", priority: "" }
  );

  type Priority = "Low" | "Medium" | "High";
  type SortOrder = "asc" | "desc";

  const [sortOrder, setSortOrder] = useState<SortOrder>(
    state?.sortOrder || "desc"
  );

  const navigate = useNavigate();

  const addTask = (newTask: Omit<Task, "id">): Task | null => {
    const isDuplicate = tasks.some(
      (task) =>
        task.name.toLowerCase() === newTask.name.toLowerCase() ||
        task.description.toLowerCase() === newTask.description.toLowerCase()
    );
    if (isDuplicate) {
      alert("Task with the same name or description already exists!");
      return null;
    }
    const taskWithId: Task = { id: Date.now(), ...newTask };
    setTasks((prevTasks) => [...prevTasks, taskWithId]);
    return taskWithId;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handlePriorityChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setTask((prevTask) => ({
      ...prevTask,
      priority: e.target.value as Priority,
    }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (validateForm()) {
      addTask(task);
      navigate("/task-detail", { state: { task } });
    }
  };

  const filteredAndSortedTasks = tasks
    .filter((task) => {
      let isMatch = true;
      if (filter.isComplete !== "") {
        isMatch = isMatch && task.isComplete === (filter.isComplete === "true");
      }
      if (filter.priority) {
        isMatch = isMatch && task.priority === filter.priority;
      }
      return isMatch;
    })
    .sort((a, b) => (sortOrder === "asc" ? a.id - b.id : b.id - a.id));

  const topTasks = filteredAndSortedTasks.slice(0, 5);

  const validateForm = () => {
    const isValid = task.name.trim() !== "" && task.description.trim() !== "";
    setErrors({
      name: task.name.trim() === "",
      description: task.description.trim() === "",
    });
    return isValid;
  };

  return (
    <div>
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="task-name">Task name</label>
          <input
            type="text"
            id="task-name"
            name="name"
            value={task.name}
            onChange={handleInputChange}
          />
          {errors.name && <span className="error-message">Required</span>}
        </div>

        <div>
          <label htmlFor="task-description">Task description</label>
          <textarea
            id="task-description"
            name="description"
            value={task.description}
            onChange={handleInputChange}
          />
          {errors.description && (
            <span className="error-message">Required</span>
          )}
        </div>
        <div>
          <label htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            name="priority"
            value={task.priority}
            onChange={handlePriorityChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>

      <SortAndFilter
        filter={filter}
        setFilter={setFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {/* Table of Top 5 Tasks */}
      <div>
        <h3>Top 5 Latest Tasks</h3>
        {topTasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {topTasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/task-detail", { state: { task } });
                      }}
                      className="link-button"
                    >
                      {task.name}
                    </button>
                  </td>
                  <td>{task.description}</td>
                  <td>{task.priority}</td>
                  <td>{task.isComplete ? "Completed" : "Not Completed"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {tasks.length > 5 && (
        <button onClick={() => navigate("/tasks")}>View More</button>
      )}
    </div>
  );
};

export default TaskForm;
