import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Task from "../../interface";

interface TaskListProps {
  tasks: Task[];
  updateTaskCompletion: (taskId: number, isComplete: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, updateTaskCompletion }) => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [filter, setFilter] = useState(
    state?.filter || { isComplete: "", priority: "" }
  );

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
    state?.sortOrder || "asc"
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
  const handleTaskCompletion = (taskId: number, isComplete: boolean) => {
    updateTaskCompletion(taskId, isComplete);
  };

  return (
    <div>
      <h2>Task List</h2>

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

      {/* Task Table */}
      {filteredAndSortedTasks.length === 0 ? (
        <p>No tasks match your filters.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.priority}</td>
                <td>{task.isComplete ? "Completed" : "Not Completed"}</td>
                <td>
                  <button
                    onClick={() =>
                      navigate("/task-detail", { state: { task } })
                    }
                  >
                    View Details
                  </button>
                  <button
                    onClick={() =>
                      handleTaskCompletion(task.id, !task.isComplete)
                    }
                  >
                    Mark as {task.isComplete ? "Incomplete" : "Complete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};
export default TaskList;
