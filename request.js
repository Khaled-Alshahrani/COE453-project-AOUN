const functions = require("@google-cloud/functions-framework");
const mongoose = require("mongoose");

functions.http("get", "/get-event/:id", async (req, res) => {
  try {
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

    const eventId = req.params.id;

    // Find event by ID
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).send("Event not found");
    }

    res.json(event);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});
