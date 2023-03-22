import express from "express";
import admin from "firebase-admin";
import dotenv from "dotenv";

admin.initializeApp({});

import authenticate from "./authMiddleware";
import createUser from "./createUser";
import cutWood from "./cutWood";

dotenv.config();

const app = express();
const db = admin.firestore();

app.use(express.json());
app.use(authenticate);

// Récup tous les utilisateurs
app.get("/users", async (req, res) => {
  try {
    const usersSnapshot = await db.collection("users").get();
    const users: any = [];
    usersSnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Définir une route protégée par authentification
app.get("/profile", (req, res) => {
  res.json({
    user: res.locals.user,
  });
});

// Définir la route pour créer un nouvel utilisateur
app.post("/users", createUser);

// Définir la route pour couper du bois
app.post("/users/:userId/cut-wood", cutWood);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
