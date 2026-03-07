import React, { useEffect, useState } from "react";
import type { Task } from "../types/task";
import { getTasks } from "../services/api";
import TaskCard from "../components/TaskCard";
import AddTaskModal from "../components/AddTaskModal";
import "../MainPage.css";
import Header from "../components/Header";

const MainPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAdd, setShowAdd] = useState<boolean>(false);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data.reverse());
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <Header />

      <button className="addBtn" onClick={() => setShowAdd(true)}>
        + Add Task
      </button>

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} refresh={fetchTasks} />
      ))}

      {showAdd && (
        <AddTaskModal close={() => setShowAdd(false)} refresh={fetchTasks} />
      )}
    </div>
  );
};

export default MainPage;
