import { useState } from "react";
import type { Task, Priority } from "../types/task";
import { updateTask, deleteTask } from "../services/api";

interface Props {
  task: Task;
  close: () => void;
  refresh: () => void;
}

const TaskModal: React.FC<Props> = ({ task, close, refresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [targetDate, setTargetDate] = useState(task.targetDate);
  const [notes, setNotes] = useState(task.notes);
  const [priority, setPriority] = useState<Priority | "">(task.priority ?? "");

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

  const handleSave = async () => {
    if (!task.id) return;

    const updatedTask: Task = {
      ...task,
      title,
      targetDate,
      notes,
      priority: priority || null, // allow no priority
    };

    await updateTask(task.id, updatedTask);
    refresh();
    setIsEditing(false);
  };

  return (
    <div className="modalOverlay">
      <div className="modal">
        {isEditing ? (
          <>
            <h3>Edit Task</h3>

            <input
              className="modalInput"
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
          </>
        ) : (
          <>
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

            {/* Show priority only if exists */}
            {task.priority && (
              <p>
                <b>Priority:</b>{" "}
                <span className={`priorityBadge ${task.priority}`}>
                  {task.priority.toUpperCase()}
                </span>
              </p>
            )}
          </>
        )}

        <div className="modalBtns">
          {isEditing ? (
            <>
              <button className="primaryBtn" onClick={handleSave}>
                Save
              </button>
              <button
                className="secondaryBtn"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={toggleStatus}>
                {task.completed ? "Mark Undone" : "Mark Done"}
              </button>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={close}>Close</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
