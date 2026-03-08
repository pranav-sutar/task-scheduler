import { useEffect, useMemo, useState } from "react";
import type { Task } from "../types/task";
import { getTasks } from "../services/api";
import TaskCard from "../components/TaskCard";
import AddTaskModal from "../components/AddTaskModal";
import Header from "../components/Header";
import "../MainPage.css";

const MainPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAdd, setShowAdd] = useState(false);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data.reverse());
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  /* ===== Priority Sorting ===== */
  const sortedTasks = useMemo(() => {
    const priorityOrder: Record<string, number> = {
      high: 1,
      medium: 2,
      low: 3,
    };

    return [...tasks].sort((a, b) => {
      const aPriority = priorityOrder[a.priority ?? "low"];
      const bPriority = priorityOrder[b.priority ?? "low"];
      return aPriority - bPriority;
    });
  }, [tasks]);

  /* ===== Task Stats ===== */
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="container">
      <Header />

      {/* ===== Task Summary ===== */}
      <div className="taskSummary">
        <div className="summaryCard total">
          <span className="summaryLabel">Total</span>
          <span className="summaryValue">{totalTasks}</span>
        </div>

        <div className="summaryCard pending">
          <span className="summaryLabel">Pending</span>
          <span className="summaryValue">{pendingTasks}</span>
        </div>

        <div className="summaryCard done">
          <span className="summaryLabel">Done</span>
          <span className="summaryValue">{completedTasks}</span>
        </div>
      </div>

      {/* ===== Add Button ===== */}
      <button className="addBtn" onClick={() => setShowAdd(true)}>
        + Add Task
      </button>

      {/* ===== Task List ===== */}
      {sortedTasks.length === 0 ? (
        <p className="emptyState">No tasks yet. Add one!</p>
      ) : (
        sortedTasks.map((task) => (
          <TaskCard key={task.id} task={task} refresh={fetchTasks} />
        ))
      )}

      {/* ===== Add Modal ===== */}
      {showAdd && (
        <AddTaskModal close={() => setShowAdd(false)} refresh={fetchTasks} />
      )}
    </div>
  );
};

export default MainPage;
