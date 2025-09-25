export interface Task {
  id: string
  title: string
  description: string
  tags: string[]
  dueDate: string
  priority: "Low" | "Medium" | "High"
  owner: string
  status: "Todo" | "In Progress" | "Completed"
  isFavorite: boolean
  createdAt: string
  updatedAt: string
  userId: string // Added userId field to associate tasks with users
}

export interface TaskFilters {
  search: string
  tag: string
  priority: string
  owner: string
  status: string
}

const STORAGE_KEY = "tasker-tasks"

export const taskStorage = {
  getTasks: (userId?: string): Task[] => {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(STORAGE_KEY)
    const allTasks: Task[] = stored ? JSON.parse(stored) : []

    return userId ? allTasks.filter((task) => task.userId === userId) : allTasks
  },

  getAllTasks: (): Task[] => {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  },

  saveTasks: (tasks: Task[]): void => {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  },

  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">, userId: string): Task => {
    const allTasks = taskStorage.getAllTasks()
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId, // Set userId for the new task
    }
    allTasks.push(newTask)
    taskStorage.saveTasks(allTasks)
    return newTask
  },

  updateTask: (id: string, updates: Partial<Task>, userId: string): Task | null => {
    const allTasks = taskStorage.getAllTasks()
    const index = allTasks.findIndex((task) => task.id === id && task.userId === userId)
    if (index === -1) return null

    allTasks[index] = {
      ...allTasks[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    taskStorage.saveTasks(allTasks)
    return allTasks[index]
  },

  deleteTask: (id: string, userId: string): boolean => {
    const allTasks = taskStorage.getAllTasks()
    const filteredTasks = allTasks.filter((task) => !(task.id === id && task.userId === userId))
    if (filteredTasks.length === allTasks.length) return false
    taskStorage.saveTasks(filteredTasks)
    return true
  },

  deleteTasks: (ids: string[], userId: string): number => {
    const allTasks = taskStorage.getAllTasks()
    const filteredTasks = allTasks.filter((task) => !(ids.includes(task.id) && task.userId === userId))
    const deletedCount = allTasks.length - filteredTasks.length
    taskStorage.saveTasks(filteredTasks)
    return deletedCount
  },

  toggleFavorite: (id: string, userId: string): Task | null => {
    const allTasks = taskStorage.getAllTasks()
    const task = allTasks.find((task) => task.id === id && task.userId === userId)
    if (!task) return null

    return taskStorage.updateTask(id, { isFavorite: !task.isFavorite }, userId)
  },
}

export const getUniqueValues = (tasks: Task[], field: keyof Task): string[] => {
  const values = tasks.flatMap((task) => task[field])
  return Array.from(new Set(values.filter(Boolean))) as string[]
}

export const filterTasks = (tasks: Task[], filters: TaskFilters): Task[] => {
  return tasks.filter((task) => {
    const matchesSearch =
      !filters.search ||
      task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.tags.some((tag) => tag.toLowerCase().includes(filters.search.toLowerCase()))

    const matchesTag = !filters.tag || task.tags.includes(filters.tag)
    const matchesPriority = !filters.priority || task.priority === filters.priority
    const matchesOwner = !filters.owner || task.owner === filters.owner
    const matchesStatus = !filters.status || task.status === filters.status

    return matchesSearch && matchesTag && matchesPriority && matchesOwner && matchesStatus
  })
}
