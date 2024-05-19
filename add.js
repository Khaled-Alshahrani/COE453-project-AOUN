const functions = require("@google-cloud/functions-framework");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

functions.http("additem", async (req, res) => {

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }
  try {
    client = await MongoClient.connect("mongodb+srv://aziz:aziz@coe453.i09yrhr.mongodb.net/?retryWrites=true&w=majority&appName=COE453");

    let desiredLength = 10;
    let itemId = uuidv4().toString().substring(0, desiredLength);

    let createdAt = new Date(); // Set createdAt to the current datetime

    let ownerStudentId = req.body.owner_student_id;
    let contactNumber = req.body.contact_number;
    let title = req.body.title;
    let description = req.body.description;

    let taken = false; // Set taken to false
    let requesterStudentId = null; // Set requesterStudentId to null
    let requestedAt = null; // Set requestedAt to null

    let item = {
      id: itemId,
      created_at: createdAt,
      owner_student_id: ownerStudentId,
      contact_number: contactNumber,
      title: title,
      description: description,
      taken: taken,
      requester_student_id: requesterStudentId,
      requested_at: requestedAt,
    };

    const db = client.db("items");
    const collection = db.collection("items");
    const result = await collection.insertOne(item);
    res.status(201).send("1")
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await client.close();
  }
});
