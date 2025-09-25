"use client"

import { useState, useEffect, useMemo } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { SearchAndFilters } from "@/components/search-and-filters"
import { TaskBoardHeader } from "@/components/task-board-header"
import { TaskList } from "@/components/task-list"
import { EditTaskModal } from "@/components/edit-task-modal"
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog"
import { Footer } from "@/components/footer"
import { type Task, type TaskFilters, taskStorage, getUniqueValues, filterTasks } from "@/lib/task-utils"
import { useDebounce } from "@/hooks/use-debounce"

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [filters, setFilters] = useState<TaskFilters>({
    search: "",
    tag: "",
    priority: "",
    owner: "",
    status: "",
  })
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean
    taskId?: string
    isMultiple?: boolean
  }>({ open: false })

  const debouncedSearch = useDebounce(filters.search, 300)
  const debouncedFilters = { ...filters, search: debouncedSearch }

  // Load tasks on component mount
  useEffect(() => {
    setTasks(taskStorage.getTasks())
  }, [])

  const filteredTasks = useMemo(() => {
    return filterTasks(tasks, filters)
  }, [tasks, filters])

  const availableTags = useMemo(() => {
    return getUniqueValues(tasks, "tags")
  }, [tasks])

  const availableOwners = useMemo(() => {
    return getUniqueValues(tasks, "owner").filter(Boolean)
  }, [tasks])

  const handleTaskAdded = (newTask: Task) => {
    setTasks((prev) => [...prev, newTask])
  }

  const handleTaskSelect = (taskId: string, selected: boolean) => {
    setSelectedTasks((prev) => (selected ? [...prev, taskId] : prev.filter((id) => id !== taskId)))
  }

  const handleToggleFavorite = (taskId: string) => {
    const updatedTask = taskStorage.toggleFavorite(taskId)
    if (updatedTask) {
      setTasks((prev) => prev.map((task) => (task.id === taskId ? updatedTask : task)))
    }
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
  }

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks((prev) => prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
  }

  const handleDeleteTask = (taskId: string) => {
    setDeleteDialog({ open: true, taskId })
  }

  const handleDeleteSelected = () => {
    setDeleteDialog({ open: true, isMultiple: true })
  }

  const confirmDelete = () => {
    if (deleteDialog.isMultiple) {
      const deletedCount = taskStorage.deleteTasks(selectedTasks)
      if (deletedCount > 0) {
        setTasks((prev) => prev.filter((task) => !selectedTasks.includes(task.id)))
        setSelectedTasks([])
      }
    } else if (deleteDialog.taskId) {
      const success = taskStorage.deleteTask(deleteDialog.taskId)
      if (success) {
        setTasks((prev) => prev.filter((task) => task.id !== deleteDialog.taskId))
        setSelectedTasks((prev) => prev.filter((id) => id !== deleteDialog.taskId))
      }
    }
    setDeleteDialog({ open: false })
  }

  const handleStatusChange = (taskId: string, status: Task["status"]) => {
    const updatedTask = taskStorage.updateTask(taskId, { status })
    if (updatedTask) {
      setTasks((prev) => prev.map((task) => (task.id === taskId ? updatedTask : task)))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />

      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Search and Filters */}
        <SearchAndFilters
          filters={filters}
          onFiltersChange={setFilters}
          availableTags={availableTags}
          availableOwners={availableOwners}
        />

        {/* Task Board Header */}
        <TaskBoardHeader
          selectedTasks={selectedTasks}
          onDeleteSelected={handleDeleteSelected}
          onTaskAdded={handleTaskAdded}
        />

        {/* Task List */}
        <div className="bg-card border border-border rounded-lg p-4">
          <TaskList
            tasks={filteredTasks}
            selectedTasks={selectedTasks}
            onTaskSelect={handleTaskSelect}
            onToggleFavorite={handleToggleFavorite}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
        </div>
      </main>

      {/* Footer component */}
      <Footer />

      {/* Edit Task Modal */}
      <EditTaskModal
        task={editingTask}
        open={!!editingTask}
        onOpenChange={(open) => !open && setEditingTask(null)}
        onTaskUpdated={handleTaskUpdated}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open })}
        onConfirm={confirmDelete}
        title={deleteDialog.isMultiple ? "Delete Selected Tasks" : "Delete Task"}
        description={
          deleteDialog.isMultiple
            ? `Are you sure you want to delete ${selectedTasks.length} selected task(s)? This action cannot be undone.`
            : "Are you sure you want to delete this task? This action cannot be undone."
        }
      />
    </div>
  )
}
