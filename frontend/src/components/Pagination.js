import React from "react";

const Pagination = ({ tasksPerPage, totalTasks, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // if (totalPages <= 1) {
  //   return null;
  // }

  return (
    <nav className="pagination-nav">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            onClick={() => paginate(currentPage - 1)}
            className="page-link"
          >
            Previous
          </button>
        </li>

        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            onClick={() => paginate(currentPage + 1)}
            className="page-link"
          >
            Next
          </button>
        </li>
      </ul>
      <span className="page-info">
        Page {currentPage} of {totalPages}
      </span>
    </nav>
  );
};

export default Pagination;
