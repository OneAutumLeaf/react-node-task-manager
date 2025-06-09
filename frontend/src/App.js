import React, { useState, useEffect, useMemo, useCallback } from "react";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";
import Pagination from "./components/Pagination";
import { fetchTasks } from "./api/taskApi";
import "./App.css";

function App() {
  const [allTasks, setAllTasks] = useState([]);
  const [activeFilters, setActiveFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(20);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAllTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTasks();
        if (Array.isArray(data)) {
          setAllTasks(data);
        } else {
          console.error("API did not return an array.");
          setAllTasks([]);
        }
      } catch (err) {
        console.error("Error during fetch:", err);
        setError(
          "Failed to fetch tasks. Please ensure the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };
    loadAllTasks();
  }, []);

  const handleFilter = useCallback((filters) => {
    setActiveFilters(filters);
    setCurrentPage(1);
  }, []);

  const handleReset = useCallback(() => {
    setActiveFilters({});
    setCurrentPage(1);
  }, []);

  const filteredTasks = useMemo(() => {
    if (Object.keys(activeFilters).length === 0) {
      return allTasks;
    }

    return allTasks.filter((task) => {
      return Object.entries(activeFilters).every(([key, value]) => {
        if (!value) return true;

        const taskValue = task[key];
        const exactMatchKeys = [
          "Task_ID",
          "Project_ID",
          "Task_Owned_EmployeeId",
        ];

        if (exactMatchKeys.includes(key)) {
          return taskValue === value;
        } else {
          const stringTaskValue = taskValue ? String(taskValue) : "";
          return stringTaskValue.toLowerCase().includes(value.toLowerCase());
        }
      });
    });
  }, [allTasks, activeFilters]);

  const currentTasks = useMemo(() => {
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    return filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  }, [currentPage, tasksPerPage, filteredTasks]);

  const paginate = useCallback(
    (pageNumber) => {
      const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
      if (pageNumber > 0 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      }
    },
    [filteredTasks.length, tasksPerPage]
  );

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
        ) : (
          <>
            {filteredTasks.length > 0 ? (
              <TaskList tasks={currentTasks} />
            ) : (
              <p className="status-message">No tasks found.</p>
            )}
            <Pagination
              tasksPerPage={tasksPerPage}
              totalTasks={filteredTasks.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
