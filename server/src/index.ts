import express from 'express' ;
import admin from 'firebase-admin' ;

const app = express();
admin.initializeApp();

const db = admin.firestore();

app.use (express.json());


app.get ( '/users' , (req, res) => {
    const body = req.body;
    console.log (body);

    db.collection ( 'users' ).get().then (snapshot => {
        snapshot.forEach (doc => {
            console.log (doc.id, '=>', doc.data());
            });})

    res.send ( 'Hello World!' );
    });

app.post ( '/users' , (req, res) => {
    const body = req.body;
    console.log (body);


    // res.send ( 'Hello World!' );
    });

    
app.listen ( 3000 , () => {
    console.log ( 'Server is running on port 3000' );
  });