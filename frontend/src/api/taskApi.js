// frontend/src/api/taskApi.js

import axios from "axios";

const API_BASE_URL = "http://localhost:5001";

export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/tasks`);

    return response.data.Task_listResult || [];
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};
