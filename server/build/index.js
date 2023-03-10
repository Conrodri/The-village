"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const app = (0, express_1.default)();
firebase_admin_1.default.initializeApp();
const db = firebase_admin_1.default.firestore();
app.use(express_1.default.json());
app.get('/users', (req, res) => {
    const body = req.body;
    console.log(body);
    db.collection('users').get().then(snapshot => {
        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
        });
    });
    res.send('Hello World!');
});
app.post('/users', (req, res) => {
    const body = req.body;
    console.log(body);
    // res.send ( 'Hello World!' );
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
//# sourceMappingURL=index.js.map