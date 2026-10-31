export interface ChecklistProgress {
  id: number;
  done: boolean;
}

export function restoreChecklistProgress<T extends ChecklistProgress>(key: string, tasks: T[]): T[] {
  try {
    if (typeof localStorage === 'undefined') return tasks;
    const serialized = localStorage.getItem(key);
    if (!serialized) return tasks;

    const saved: unknown = JSON.parse(serialized);
    if (typeof saved !== 'object' || saved === null || Array.isArray(saved)) return tasks;
    const progress = saved as Record<string, unknown>;
    return tasks.map(task => ({
      ...task,
      done: typeof progress[String(task.id)] === 'boolean' ? progress[String(task.id)] as boolean : task.done,
    }));
  } catch {
    return tasks;
  }
}

export function saveChecklistProgress<T extends ChecklistProgress>(key: string, tasks: T[]): boolean {
  try {
    if (typeof localStorage === 'undefined') return false;
    const progress = Object.fromEntries(tasks.map(task => [String(task.id), task.done]));
    localStorage.setItem(key, JSON.stringify(progress));
    return true;
  } catch {
    return false;
  }
}
