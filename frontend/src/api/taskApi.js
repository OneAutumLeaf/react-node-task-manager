import axios from "axios";

const API_BASE_URL = "https://my-task-manager-api.onrender.com";

export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/tasks`);

    return response.data.Task_listResult || [];
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};
