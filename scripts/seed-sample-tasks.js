// Sample data to populate the Tasker application with demo tasks
const sampleTasks = [
  {
    title: "Integration API",
    description:
      "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently",
    tags: ["Python", "API"],
    dueDate: "2024-12-31",
    priority: "High",
    owner: "Suresh",
    status: "Todo",
    isFavorite: true,
  },
  {
    title: "API Data Synchronization with Python",
    description:
      "Implement a Python solution to synchronize data between an API and a third-party database securely, optimizing data exchange",
    tags: ["Python", "API", "Data Sync"],
    dueDate: "2024-12-25",
    priority: "High",
    owner: "Suresh",
    status: "In Progress",
    isFavorite: false,
  },
  {
    title: "Efficient Web API Connectivity in Python",
    description:
      "Develop a Python-based solution for efficient data handling and secure database connectivity, focusing on efficient data handling and",
    tags: ["Python", "API"],
    dueDate: "2024-12-20",
    priority: "Medium",
    owner: "Alex",
    status: "Todo",
    isFavorite: false,
  },
  {
    title: "Data Handling",
    description:
      "Integrate a web API with a third-party database using secure methods, focusing on seamless data exchange and",
    tags: ["Backend", "Python", "Database"],
    dueDate: "2024-12-15",
    priority: "High",
    owner: "Suresh",
    status: "Completed",
    isFavorite: false,
  },
]

// Function to seed the localStorage with sample tasks
function seedSampleTasks() {
  const existingTasks = JSON.parse(localStorage.getItem("tasker-tasks") || "[]")

  if (existingTasks.length === 0) {
    const tasksWithIds = sampleTasks.map((task) => ({
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))

    localStorage.setItem("tasker-tasks", JSON.stringify(tasksWithIds))
    console.log("Sample tasks seeded successfully!")
  } else {
    console.log("Tasks already exist, skipping seed.")
  }
}

// Run the seed function
seedSampleTasks()
