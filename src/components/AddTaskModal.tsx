import { useState } from "react";
import { createTask } from "../services/api";
import type { Task, Priority } from "../types/task";

interface Props {
  close: () => void;
  refresh: () => void;
}

const AddTaskModal: React.FC<Props> = ({ close, refresh }) => {
  const [title, setTitle] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState<Priority | "">(""); // "" = no priority

  const handleSubmit = async () => {
    if (!title.trim()) return;

    const newTask: Task = {
      title,
      targetDate,
      notes,
      createdAt: new Date().toLocaleDateString(),
      completed: false,
      priority: priority || undefined, // ✅ send undefined if empty
    };

    await createTask(newTask);
    refresh();
    close();
  };

  return (
    <div className="modalOverlay">
      <div className="modal">
        <h3 className="modalTitle">Add New Task</h3>

        <div className="modalBody">
          <input
            className="modalInput"
            placeholder="Task Title"
            value={title}
            style={{
              color: "black",
            }}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="modalInput"
            type="date"
            style={{
              color: "black",
            }}
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
          />

          <textarea
            className="modalTextarea"
            placeholder="Notes"
            value={notes}
            style={{
              color: "black",
            }}
            onChange={(e) => setNotes(e.target.value)}
          />

          {/* Priority Selector */}
          <select
            className="modalSelect"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority | "")}
          >
            <option value="">⚪ No Priority</option>
            <option value="low">🟢 Low Priority</option>
            <option value="medium">🟡 Medium Priority</option>
            <option value="high">🔴 High Priority</option>
          </select>
        </div>

        <div className="modalBtns">
          <button className="primaryBtn" onClick={handleSubmit}>
            Add Task
          </button>
          <button className="secondaryBtn" onClick={close}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
