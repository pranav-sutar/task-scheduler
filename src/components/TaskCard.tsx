import { useState } from "react";
import type { Task } from "../types/task";
import TaskModal from "./TaskModal";

interface Props {
  task: Task;
  refresh: () => void;
}

const TaskCard: React.FC<Props> = ({ task, refresh }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`taskCard ${task.completed ? "done" : ""}`}>
        <div className="taskContent">
          <h4>{task.title}</h4>
          <p>
            Last Date:{" "}
            {new Date(task.targetDate).toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>

          {/* Show priority only if exists */}
          {task.priority && (
            <span className={`priorityBadge ${task.priority}`}>
              {task.priority.toUpperCase()}
            </span>
          )}
        </div>

        <button className="viewBtn" onClick={() => setOpen(true)}>
          View
        </button>
      </div>

      {open && (
        <TaskModal task={task} close={() => setOpen(false)} refresh={refresh} />
      )}
    </>
  );
};

export default TaskCard;
