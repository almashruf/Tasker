"use client"

import type { Task } from "@/lib/task-utils"
import { TaskCard } from "./task-card"

interface TaskListProps {
  tasks: Task[]
  selectedTasks: string[]
  onTaskSelect: (taskId: string, selected: boolean) => void
  onToggleFavorite: (taskId: string) => void
  onEditTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
  onStatusChange: (taskId: string, status: Task["status"]) => void
}

export function TaskList({
  tasks,
  selectedTasks,
  onTaskSelect,
  onToggleFavorite,
  onEditTask,
  onDeleteTask,
  onStatusChange,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground text-lg mb-2">No Task Found</div>
        <p className="text-sm text-muted-foreground">
          Create your first task to get started with your productivity journey.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          isSelected={selectedTasks.includes(task.id)}
          onSelect={onTaskSelect}
          onToggleFavorite={onToggleFavorite}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  )
}
