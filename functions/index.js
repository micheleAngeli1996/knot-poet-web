/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");

setGlobalOptions({maxInstances: 10});
initializeApp();

// Importa le librerie necessarie
require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true, // true per SSL, false per TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/sendMail", (req, res) => {
  const {to, subject, text} = req.body;

  try {
    transporter.sendMail({
      from: `"Knot Poet - Official Website" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
    res.status(200).json({message: "Email inviata con successo!"});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Errore nell'invio dell'email"});
  }
});

exports.sendMail = onRequest({region: "europe-west1"}, app);
