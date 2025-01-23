import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Task from "../../interface";
import TaskDetailProps from "../../props";
// interface TaskDetailProps {
//   tasks: Task[];
//   setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
// }
const TaskDetail: React.FC<TaskDetailProps> = ({ tasks, setTasks }) => {
  const { state } = useLocation();
  const initialTask = state?.task || null;
  const [task, setTask] = useState<Task | null>(initialTask);
  const [errors, setErrors] = useState({ name: false, description: false });
  const navigate = useNavigate();
  // Redirect if the task is not found
  useEffect(() => {
    if (!initialTask) {
      alert("Task not found!");
      navigate("/tasks");
    }
  }, [initialTask, navigate]);
  if (!task) {
    return null;
  }
  const validateForm = (): boolean => {
    const isValid = task.name.trim() !== "" && task.description.trim() !== "";
    setErrors({
      name: task.name.trim() === "",
      description: task.description.trim() === "",
    });
    return isValid;
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask!,
      [name]: value,
    }));
  };
  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask!,
      [name]: value,
    }));
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask((prevTask) => ({
      ...prevTask!,
      isComplete: e.target.checked,
    }));
  };
  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && task) {
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? task : t))
      );
      navigate("/tasks");
    }
  };
  return (
    <div className="task-detail-container">
      <h2>Task Detail</h2>
      <form onSubmit={handleSaveChanges}>
        <div>
          <label htmlFor="task-name">Task Name</label>
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
          <label htmlFor="task-description">Task Description</label>
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
            onChange={handleSelectChange}
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
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate("/tasks")}>
          Back to Task List
        </button>
        <button type="button" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </form>
    </div>
  );
};
export default TaskDetail;
