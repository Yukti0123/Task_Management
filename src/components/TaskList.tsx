import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TaskListProps from "../../props";
import SortAndFilter from "./SortandFilter.tsx";

// interface TaskListProps {
//   tasks: Task[];
//   setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
// }

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks }) => {
  const { state } = useLocation();

  const [filter, setFilter] = useState(
    state?.filter || { isComplete: "", priority: "" }
  );

  type SortOrder = "asc" | "desc";

  const [sortOrder, setSortOrder] = useState<SortOrder>(
    state?.sortOrder || "asc"
  );

  const navigate = useNavigate();

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

  const updateTaskCompletion = (taskId: number, isComplete: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isComplete } : task
      )
    );
  };

  const handleTaskCompletion = (taskId: number, isComplete: boolean) => {
    updateTaskCompletion(taskId, isComplete);
  };

  return (
    <div>
      <h2>Task List</h2>

      {/* Filter Section */}
      <SortAndFilter
        filter={filter}
        setFilter={setFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
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
                <td>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/task-detail", { state: { task } });
                    }}
                  >
                    {task.name}
                  </a>
                </td>
                <td>{task.description}</td>
                <td>{task.priority}</td>
                <td>{task.isComplete ? "Completed" : "Not Completed"}</td>
                <td>
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
