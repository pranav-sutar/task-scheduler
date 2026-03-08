export type Priority = "low" | "medium" | "high";

export interface Task {
    id?: string;
    title: string;
    targetDate: string;
    notes: string;
    createdAt: string;
    completed: boolean;
    priority?: Priority | null;
}