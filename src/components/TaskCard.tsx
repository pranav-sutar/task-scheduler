import React, { useState } from "react";
import type { Task } from "../types/task";
import TaskModal from "./TaskModal";

interface Props {
  task: Task;
  refresh: () => void;
}

const TaskCard: React.FC<Props> = ({ task, refresh }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className={`taskCard ${task.completed ? "done" : ""}`}>
        <div>
          <h4>{task.title}</h4>
          <p>Target: {task.targetDate}</p>
        </div>

        <button onClick={() => setOpen(true)} style={{ marginLeft: "20px" }}>
          View Details
        </button>
      </div>

      {open && (
        <TaskModal task={task} close={() => setOpen(false)} refresh={refresh} />
      )}
    </>
  );
};

export default TaskCard;
