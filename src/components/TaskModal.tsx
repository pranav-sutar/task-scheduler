import React from "react";
import type { Task } from "../types/task";
import { updateTask, deleteTask } from "../services/api";

interface Props {
  task: Task;
  close: () => void;
  refresh: () => void;
}

const TaskModal: React.FC<Props> = ({ task, close, refresh }) => {
  const toggleStatus = async () => {
    if (!task.id) return;
    await updateTask(task.id, { ...task, completed: !task.completed });
    refresh();
    close();
  };

  const handleDelete = async () => {
    if (!task.id) return;
    await deleteTask(task.id);
    refresh();
    close();
  };

  return (
    <div className="modalOverlay">
      <div className="modal">
        <h3>{task.title}</h3>
        <p>
          <b>Added:</b> {task.createdAt}
        </p>
        <p>
          <b>Target:</b> {task.targetDate}
        </p>
        <p>
          <b>Notes:</b> {task.notes}
        </p>

        <div className="modalBtns">
          <button onClick={toggleStatus}>
            {task.completed ? "Mark Undone" : "Mark Done"}
          </button>
          <button>Edit</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={close}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
