import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskForm from "./components/TaskForm.tsx";
import TaskDetail from "./components/TaskDetail.tsx";
import TaskList from "./components/TaskList.tsx";
import Task from "../interface.tsx";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<TaskForm tasks={tasks} setTasks={setTasks} />}
        />

        <Route
          path="/task-detail"
          element={<TaskDetail tasks={tasks} setTasks={setTasks} />}
        />

        <Route
          path="/tasks"
          element={<TaskList tasks={tasks} setTasks={setTasks} />}
        />
      </Routes>
    </Router>
  );
};
export default App;
