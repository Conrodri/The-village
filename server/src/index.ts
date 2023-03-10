import express from "express";
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

admin.initializeApp();

const app = express();
const db = admin.firestore();

app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await db
    .collection("users")
    .get()
    .then((query) => query.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  console.log(users);

  res.send(users);
});

app.post("/users", (req, res) => {
  const body = req.body;
  console.log(body);

  // res.send ( 'Hello World!' );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
