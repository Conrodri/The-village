import express from "express";
import admin from "firebase-admin";
import dotenv from "dotenv";
import {Router} from 'express';

dotenv.config();

admin.initializeApp();

const app = express();
const db = admin.firestore();
const router = Router();


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
});


//------------
//Auth Part

const getAuthToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = null;
  }
  next();
};


export const checkIfAuthenticated = (req, res, next) => {
 getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin
        .auth()
        .verifyIdToken(authToken);
      req.authId = userInfo.uid;
      return next();
    } catch (e) {
      return res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
    }
  });
};

//-------------------------------
// User creation

const createUser = async (req, res) => {
  const {
        email,
        password,
      } = req.body;
  
      const user = await admin.auth().createUser({
        email,
        password
      });
  
      return res.send(user);
  }
//---------------------------------
// Routeur

router.post('/auth/signup', createUser);

router.get('/users', checkIfAuthenticated, async (_, res) => {
  console.log('ok');
  // return res.send(user);
});  

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
