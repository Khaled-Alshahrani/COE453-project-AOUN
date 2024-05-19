const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion } = require("mongodb");

app.get("/list", async (req, res) => {
  const mongoUrl = "mongodb+srv://aziz:aziz@coe453.i09yrhr.mongodb.net/?retryWrites=true&w=majority&appName=COE453";
  const client = new MongoClient(mongoUrl, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    const db = client.db("items"); // Replace 'FinalProject' with your database name
    const collection = db.collection("items"); // Replace 'BMI records' with your collection name

    const records = await collection.find().toArray();
    res.status(200).json(records);
  } catch (error) {
    console.error("Error retrieving items records:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
