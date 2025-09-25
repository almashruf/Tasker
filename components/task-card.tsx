"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, Edit, Trash2, Calendar, User } from "lucide-react"
import type { Task } from "@/lib/task-utils"
import { cn } from "@/lib/utils"

interface TaskCardProps {
  task: Task
  isSelected: boolean
  onSelect: (taskId: string, selected: boolean) => void
  onToggleFavorite: (taskId: string) => void
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  onStatusChange: (taskId: string, status: Task["status"]) => void
}

export function TaskCard({
  task,
  isSelected,
  onSelect,
  onToggleFavorite,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500 text-white"
      case "Medium":
        return "bg-yellow-500 text-white"
      case "Low":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Todo":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getTagColors = (index: number) => {
    const colors = [
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    ]
    return colors[index % colors.length]
  }

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md border-border bg-card",
        isSelected && "ring-2 ring-blue-500",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Selection checkbox */}
          <Checkbox checked={isSelected} onCheckedChange={(checked) => onSelect(task.id, !!checked)} className="mt-1" />

          {/* Favorite star */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleFavorite(task.id)}
            className={cn(
              "p-1 h-auto",
              task.isFavorite ? "text-yellow-500" : "text-muted-foreground hover:text-yellow-500",
            )}
          >
            <Star className={cn("w-4 h-4", task.isFavorite && "fill-current")} />
          </Button>

          {/* Task content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-foreground text-sm leading-tight">{task.title}</h3>

              {/* Action buttons - show on hover */}
              {isHovered && (
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(task)}
                    className="p-1 h-auto text-muted-foreground hover:text-foreground"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(task.id)}
                    className="p-1 h-auto text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>

            {task.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{task.description}</p>}

            {/* Tags */}
            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {task.tags.map((tag, index) => (
                  <Badge key={tag} variant="secondary" className={cn("text-xs px-2 py-0.5", getTagColors(index))}>
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Priority and Status */}
            <div className="flex items-center gap-2 mt-2">
              <Badge className={cn("text-xs px-2 py-0.5", getPriorityColor(task.priority))}>{task.priority}</Badge>
              <Badge className={cn("text-xs px-2 py-0.5", getStatusColor(task.status))}>{task.status}</Badge>
            </div>

            {/* Owner and Due Date */}
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              {task.owner && (
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{task.owner}</span>
                </div>
              )}
              {task.dueDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
