const admin = require("firebase-admin");
const dotenv = require("dotenv");

// Load environment variables from .env file for local development
dotenv.config();

// Check if the required environment variable is set
if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT env variable is not set!");
}

// Parse the JSON string from the environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// This is the crucial step to fix the private key format on Render.
// It replaces escaped newlines (\\n) with actual newlines (\n).
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

// Initialize the Firebase Admin SDK with the corrected service account object
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;