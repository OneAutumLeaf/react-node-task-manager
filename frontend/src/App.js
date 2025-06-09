import React, { useState, useEffect } from "react";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";
import Pagination from "./components/Pagination";
import { fetchTasks } from "./api/taskApi";
import "./App.css";

function App() {
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeFilters, setActiveFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(20);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAllTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTasks();
        setAllTasks(data);
        setFilteredTasks(data);
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
    setFilteredTasks(filteredData);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setActiveFilters({});
    setFilteredTasks(allTasks);
    setCurrentPage(1);
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => {
    if (
      pageNumber > 0 &&
      pageNumber <= Math.ceil(filteredTasks.length / tasksPerPage)
    ) {
      setCurrentPage(pageNumber);
    }
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

        {loading ? (
          <p className="status-message">Loading tasks...</p>
        ) : error ? (
          <p className="status-message error">{error}</p>
        ) : filteredTasks.length > 0 ? (
          <>
            <TaskList tasks={currentTasks} />
            <Pagination
              tasksPerPage={tasksPerPage}
              totalTasks={filteredTasks.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </>
        ) : (
          <p className="status-message">No tasks found.</p>
        )}
      </main>
    </div>
  );
}

export default App;
