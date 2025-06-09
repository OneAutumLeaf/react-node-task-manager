import React, { useState, useEffect } from "react";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";
import { fetchTasks } from "./api/taskApi";
import "./App.css";

function App() {
  const [allTasks, setAllTasks] = useState([]);
  const [displayedTasks, setDisplayedTasks] = useState([]);

  const [activeFilters, setActiveFilters] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAllTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTasks();
        setAllTasks(data);
        setDisplayedTasks(data);
      } catch (err) {
        setError(
          "Failed to fetch tasks. Please ensure the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };
    loadAllTasks();
  }, []);

  const handleFilter = (filters) => {
    setActiveFilters(filters);

    let filteredData = [...allTasks];
    const exactMatchKeys = ["Task_ID", "Project_ID", "Task_Owned_EmployeeId"];

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filteredData = filteredData.filter((task) => {
          const taskValue = task[key];
          if (exactMatchKeys.includes(key)) {
            return taskValue === value;
          } else {
            const stringTaskValue = taskValue ? String(taskValue) : "";
            return stringTaskValue.toLowerCase().includes(value.toLowerCase());
          }
        });
      }
    });
    setDisplayedTasks(filteredData);
  };

  const handleReset = () => {
    setActiveFilters({});
    setDisplayedTasks(allTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Management</h1>
      </header>
      <main>
        <TaskFilter
          onFilter={handleFilter}
          onReset={handleReset}
          activeFilters={activeFilters}
        />
        <TaskList tasks={displayedTasks} loading={loading} error={error} />
      </main>
    </div>
  );
}

export default App;
