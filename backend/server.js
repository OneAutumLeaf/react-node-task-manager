const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const EXTERNAL_API_URL = "http://122.163.123.122/CRM/Task/Task.svc/Task_List";

app.get("/api/tasks", async (req, res) => {
  try {
    console.log("Fetching all tasks from external API...");

    const response = await axios.get(EXTERNAL_API_URL);

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from external API:", error.message);
    if (error.response) {
      res.status(error.response.status).json({
        message: "Error from external API",
        details: error.response.data,
      });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
