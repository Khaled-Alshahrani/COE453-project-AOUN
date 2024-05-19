const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const fetch = require("node-fetch"); // For making HTTP requests
const { buildSchema } = require("graphql");

const app = express();
const port = 3000;

// Construct a schema using GraphQL schema language
const schema = buildSchema(`
type Query {
  getItem: String
  listItems: [Item]
}

type Mutation {
  addItem(
    owner_student_id: String
    contact_number: String
    title: String
    description: String
  ): Item

  getItem(
    id: String
    requesterId: String
  ): Item
}

type Item {
  id: String
  created_at: String
  owner_student_id: String
  contact_number: String
  title: String
  description: String
  taken: Boolean
  requester_student_id: String
  requested_at: String
}
`);

// Define resolvers
const root = {
  getItem: async ({id, requesterId}) => {
    try {
      const response = await fetch("https://us-central1-coe453-hw2-414917.cloudfunctions.net/getitem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({id, requesterId})
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      return JSON.stringify(responseData);
    } catch (error) {
      console.error("Error while fetching getting item:", error);
      throw new Error("Internal Server Error");
    }
  },
  addItem: async ({ owner_student_id, contact_number, title, description }) => {
    try {
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

      const responseData = await response.json();
      return JSON.stringify(responseData);
    } catch (error) {
      console.error("Error while adding item:", error);
      throw new Error("Internal Server Error");
    }
  },
  listItems: async () => {
    try {
      const response = await fetch("https://list-u4spqkug2q-uc.a.run.app/list");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error while fetching listing items:", error);
      throw new Error("Internal Server Error");
    }
  },
};

// Set up GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enable GraphiQL for easy testing
  })
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
