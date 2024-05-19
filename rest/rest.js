const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch")
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET endpoint to get item
app.post("/getItem", async (req, res) => {
  try {
    const response = await fetch("https://us-central1-coe453-hw2-414917.cloudfunctions.net/getitem", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();
    res.send(responseData);
  } catch (error) {
    console.error("Error while fetching item data:", error);
    res.status(500).send({ error: error.message });
  }
});

// POST endpoint to add item
app.post("/addItem", async (req, res) => {
  try {
    const fetch = (await import('node-fetch')).default;
    const { owner_student_id, contact_number, title, description } = req.body;

    const response = await fetch("https://us-central1-coe453-hw2-414917.cloudfunctions.net/additem", {

      method: "POST",
      body: JSON.stringify({ owner_student_id, contact_number, title, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // const responseData = await response.json();
    res.send(response.body);
  } catch (error) {
    console.error("Error while adding item:", error);
    res.status(500).send({ error: error.message });
  }
});

// GET endpoint to list items
app.get("/list", async (req, res) => {
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch("https://list-u4spqkug2q-uc.a.run.app/list");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();
    res.send(responseData);
  } catch (error) {
    console.error("Error while listing items:", error);
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
