import React, { useState } from "react";
import { createTask } from "../services/api";
import type { Task } from "../types/task";

interface Props {
  close: () => void;
  refresh: () => void;
}

const AddTaskModal: React.FC<Props> = ({ close, refresh }) => {
  const [title, setTitle] = useState<string>("");
  const [targetDate, setTargetDate] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const handleSubmit = async () => {
    const newTask: Task = {
      title,
      targetDate,
      notes,
      createdAt: new Date().toLocaleDateString(),
      completed: false,
    };

    await createTask(newTask);
    refresh();
    close();
  };

  return (
    <div className="modalOverlay">
      <div className="modal">
        <h3>Add New Task</h3>

        <input
          placeholder="Task Title"
          style={{
            color: "black",
          }}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          style={{
            color: "black",
          }}
          onChange={(e) => setTargetDate(e.target.value)}
        />
        <textarea
          placeholder="Notes"
          style={{
            color: "black",
          }}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button onClick={handleSubmit} style={{ marginRight: "1rem" }}>
          Add Task
        </button>
        <button onClick={close}>Cancel</button>
      </div>
    </div>
  );
};

export default AddTaskModal;
