// server.js
require('dotenv').config();              
const express = require('express');      
const cors = require('cors');            
const admin = require('firebase-admin');  
const app = express();
const PORT = process.env.PORT || 5000;
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: process.env.FIREBASE_PROJECT_ID
});
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());                                

// app.use('/api/auth', authRoutes);                       

app.get('/', (req, res) => res.send('Firebase Recipe Backend running'));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));   
