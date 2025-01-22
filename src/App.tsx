import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskForm from "./components/TaskForm.tsx";
import TaskDetail from "./components/TaskDetail.tsx";
import TaskList from "./components/TaskList.tsx";
import Task from "../interface.tsx";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

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

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const updateTaskCompletion = (taskId: number, isComplete: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isComplete } : task
      )
    );
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<TaskForm tasks={tasks} addTask={addTask} />}
        />

        <Route
          path="/task-detail"
          element={<TaskDetail updateTask={updateTask} />}
        />

        <Route
          path="/tasks"
          element={
            <TaskList
              tasks={tasks}
              updateTaskCompletion={updateTaskCompletion}
            />
          }
        />
      </Routes>
    </Router>
  );
};
export default App;
