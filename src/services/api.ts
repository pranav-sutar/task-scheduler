import type { Task } from "../types/task";

const BASE_URL = "https://659244febb129707198f9b65.mockapi.io/React/trial";

export const getTasks = async (): Promise<Task[]> => {
    const res = await fetch(BASE_URL);
    return res.json();
};

export const createTask = async (task: Task): Promise<Task> => {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
    return res.json();
};

export const updateTask = async (id: string, task: Task): Promise<Task> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
    return res.json();
};

export const deleteTask = async (id: string): Promise<void> => {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
};