const functions = require("@google-cloud/functions-framework");
const mongoose = require("mongoose");

functions.http("additem", (req, res) => {
  // Connect to MongoDB Atlas
  const database = mongoose.createConnection("mongodb+srv://admin:admin@coe453.i09yrhr.mongodb.net/?retryWrites=true&w=majority&appName=COE453");

  database.on("error", () => console.log("Cannot connect to database!"));
  database.once("open", () => console.log("Connected to database..."));

  // Define the schema
  const EventSchema = new mongoose.Schema({
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    created_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
    owner_student_id: {
      type: String,
      required: true,
    },
    contact_number: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    taken: {
      type: Boolean,
      default: false,
    },
    requester_student_id: {
      type: String,
    },
    requested_at: {
      type: Date,
    },
  });

  // Create the model
  const Event = database.model("Event", EventSchema);

  // Create an example event
  const exampleEvent = new Event({
    id: req.body.id,
    created_at: req.body.created_at,
    owner_student_id: req.body.owner_student_id,
    contact_number: req.body.contact_number,
    title: req.body.title,
    description: req.body.description,
    taken: req.body.taken,
    requester_student_id: req.body.requester_student_id,
    requested_at: req.body.requested_at,
  });

  // Insert the example event
  exampleEvent
    .save()
    .then((data) => console.log("Event saved:", data))
    .catch((err) => console.log("Error:", err));

  res.send({
    id: req.body.id,
  });
});
