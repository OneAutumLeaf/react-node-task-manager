const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT =  5001;

const corsOptions = {
  origin: [
    "http://localhost:3000",
  ],
};

app.use(cors(corsOptions));



app.get("/api/tasks", async (req, res) => {
  try {
    const EXTERNAL_API_URL = 'http://122.163.123.122/CRM/Task/Task.svc/Task_List';
    console.log('Backend received request. Fetching from external API...');
    const response = await axios.get(EXTERNAL_API_URL);

    console.log('Successfully fetched data from external API.');
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching data from external API:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend server is running and listening on http://localhost:${PORT}`);
  console.log('Ready to accept requests from the frontend.');
});
