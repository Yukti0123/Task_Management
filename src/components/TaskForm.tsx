import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Task from "../../interface";

interface TaskFormProps {
  tasks: Task[];
  addTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ tasks, addTask }) => {
  const [task, setTask] = useState<Task>({
    id: Date.now(),
    name: "",
    description: "",
    priority: "Low",
    isComplete: false,
  });

  const navigate = useNavigate();
  const { state } = useLocation();

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
      priority: e.target.value as "Low" | "Medium" | "High",
    }));
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTask((prevTask) => ({
      ...prevTask,
      isComplete: e.target.checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    addTask(task);
    navigate("/task-detail", { state: { task } });
  };

  const [filter, setFilter] = useState(
    state?.filter || { isComplete: "", priority: "" }
  );

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
    state?.sortOrder || "desc"
  );

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

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as "asc" | "desc");
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
            required
          />
        </div>
        <div>
          <label htmlFor="task-description">Task description</label>
          <textarea
            id="task-description"
            name="description"
            value={task.description}
            onChange={handleInputChange}
            required
          />
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

        <div className="checkbox-container">
          <label htmlFor="task-complete">Task Complete</label>
          <input
            type="checkbox"
            id="task-complete"
            name="isComplete"
            checked={task.isComplete}
            onChange={handleCheckboxChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

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
                  <td>{task.name}</td>
                  <td>{task.description}</td>
                  <td>{task.priority}</td>
                  <td>{task.isComplete ? "Completed" : "Not Completed"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Filter Section */}
      <div className="filter-sort-section">
        <h3>Filter Tasks</h3>
        <div>
          <label htmlFor="filter-priority">Priority</label>
          <select
            id="filter-priority"
            name="priority"
            value={filter.priority}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label htmlFor="filter-complete">Completion Status</label>
          <select
            id="filter-complete"
            name="isComplete"
            value={filter.isComplete}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="true">Completed</option>
            <option value="false">Not Completed</option>
          </select>
        </div>
      </div>

      {/* Sorting Section */}
      <div className="filter-sort-section">
        <h3>Sort Tasks</h3>
        <label htmlFor="sort-order">Sort By</label>
        <select id="sort-order" value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => navigate("/tasks")}
          style={{
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
          }}
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
