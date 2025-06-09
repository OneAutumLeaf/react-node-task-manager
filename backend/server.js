const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

const corsOptions = {
  origin: ['http://localhost:3000', 'https://react-node-task-manager-roan.vercel.app/'] 
};

app.use(cors(corsOptions));
app.use(express.json());

const EXTERNAL_API_URL = "http://122.163.123.122/CRM/Task/Task.svc/Task_List";

app.get("/api/tasks", async (req, res) => {
  try {
    // console.log("Fetching all tasks from external API...");

    const response = await axios.get(EXTERNAL_API_URL);

    res.json({ Task_listResult: response.data.Task_listResult || [] });
  } catch (error) {
    console.error("Error fetching data from external API:", error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
