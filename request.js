const functions = require("@google-cloud/functions-framework");
const { MongoClient, ServerApiVersion } = require("mongodb");

functions.http("getitem", async (req, res) => {
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
    const db = client.db("items"); 
    const collection = db.collection("items");

    const update = {
      $set: {
        taken: true,
        requester_student_id: req.body.requesterId,
        requested_at: new Date(),
      },
    };


    const response = await collection.findOneAndUpdate({ id: req.body.id }, update, { returnOriginal: false });
    res.status(200).json(response.value);
  } catch (error) {
    console.error("Error retrieving item records:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
});
