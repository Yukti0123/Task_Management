import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Task from "../../interface";

interface TaskDetailProps {
  updateTask: (updatedTask: Task) => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ updateTask }) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const initialTask = state?.task;

  const [task, setTask] = useState<Task | null>(initialTask || null);

  useEffect(() => {
    if (initialTask) {
      setTask(initialTask);
    }
  }, [initialTask]);

  if (!task) {
    return <div>Task not found</div>;
  }

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

  const handleSaveChanges = () => {
    if (task) {
      updateTask(task);
      navigate("/tasks");
    }
  };

  return (
    <div className="task-detail-container">
      <h2>Task Detail</h2>

      <div>
        <label htmlFor="task-name">Task Name</label>
        <input
          type="text"
          id="task-name"
          name="name"
          value={task.name}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="task-description">Task Description</label>
        <textarea
          id="task-description"
          name="description"
          value={task.description}
          onChange={handleInputChange}
        />
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

      <div>
        <label htmlFor="task-complete">
          <input
            type="checkbox"
            id="task-complete"
            name="isComplete"
            checked={task.isComplete}
            onChange={handleCheckboxChange}
          />
          Task Complete
        </label>
      </div>

      <button onClick={handleSaveChanges}>Save</button>

      <button onClick={() => navigate("/tasks")}>Back to Task List</button>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default TaskDetail;
