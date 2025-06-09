import React, { useState } from "react";

const TaskFilter = ({ onFilter, onReset, activeFilters }) => {
  const [filters, setFilters] = useState({
    Task_ID: "",
    Task_Name: "",
    Project_ID: "",
    Task_Owned_EmployeeId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== "")
    );
    onFilter(activeFilters);
  };

  const handleReset = () => {
    setFilters({
      Task_ID: "",
      Task_Name: "",
      Project_ID: "",
      Task_Owned_EmployeeId: "",
    });
    onReset();
  };

  const isFilterActive = Object.keys(activeFilters).length > 0;

  return (
    <form onSubmit={handleSubmit} className="filter-form">
      <input
        type="text"
        name="Task_ID"
        placeholder="Filter by Task ID"
        value={filters.Task_ID}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Task_Name"
        placeholder="Filter by Task Name"
        value={filters.Task_Name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Project_ID"
        placeholder="Filter by Project ID"
        value={filters.Project_ID}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Task_Owned_EmployeeId"
        placeholder="Filter by Employee ID"
        value={filters.Task_Owned_EmployeeId}
        onChange={handleChange}
      />
      <button type="submit">Apply Filters</button>

      {isFilterActive && (
        <button
          type="button"
          onClick={handleReset}
          className="reset-button"
          title="Reset Filters"
        >
          ×
        </button>
      )}
    </form>
  );
};

export default TaskFilter;
