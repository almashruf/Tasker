"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { AddTaskModal } from "./add-task-modal"
import type { Task } from "@/lib/task-utils"

interface TaskBoardHeaderProps {
  selectedTasks: string[]
  onDeleteSelected: () => void
  onTaskAdded: (task: Task) => void
}

export function TaskBoardHeader({ selectedTasks, onDeleteSelected, onTaskAdded }: TaskBoardHeaderProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Your Tasks</h2>

        <div className="flex items-center gap-2">
          <AddTaskModal onTaskAdded={onTaskAdded} />

          {selectedTasks.length > 0 && (
            <Button variant="destructive" onClick={onDeleteSelected} className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Delete ({selectedTasks.length})
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
