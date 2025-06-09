import React from "react";

const TaskList = ({ tasks }) => {

  console.log("TaskList is re-rendering...");
  return (
    <div className="task-list-container">
      <table>
        <thead>
          <tr>
            <th className="col-task-id">Task ID</th>
            <th className="col-task-name">Task Name</th>
            <th className="col-project-id">Project ID</th>
            <th className="col-project-name">Project Name</th>
            <th className="col-owner-id">Owner ID</th>
            <th className="col-owner-name">Owner</th>
            <th className="col-desc">Description</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.Task_ID}>
              <td className="col-task-id">{task.Task_ID}</td>
              <td className="col-task-name">{task.Task_Name}</td>
              <td className="col-project-id">{task.Project_ID}</td>
              <td className="col-project-name">{task.Project_Name}</td>
              <td className="col-owner-id">{task.Task_Owned_EmployeeId}</td>
              <td className="col-owner-name">{task.Task_Owned_EmployeeName}</td>
              <td className="col-desc">{task.Description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(TaskList);
