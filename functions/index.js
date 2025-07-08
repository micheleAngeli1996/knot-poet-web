const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
const {onRequest} = require("firebase-functions/v2/https");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const express = require("express");
require("dotenv").config();

initializeApp();
const db = getFirestore();
const unsubscribeApp = express();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendMail = onDocumentCreated("news/{newsId}", async (event) => {
  const newsData = event.data?.data();
  const newsId = event.params.newsId;

  if (!newsData || !newsData.title) {
    console.warn("Dati newsletter incompleti:", newsId);
    return;
  }

  const newsletterLink = `https://www.knotpoet.com/news/${newsId}`;

  try {
    // 🔍 Prendi tutti gli iscritti attivi
    const subscribersSnapshot = await db
      .collection("subscribers")
      .where("subscribed", "==", true)
      .get();

    if (subscribersSnapshot.empty) {
      console.log("Nessun iscritto trovato.");
      return;
    }

    const sendPromises = subscribersSnapshot.docs.map(async (doc) => {
      const subscriber = doc.data();
      const email = subscriber.email;
      const name = subscriber.name || "lettore";
      const lang = subscriber.lang ?? "it-IT";
      const unsubscribeToken = crypto.randomBytes(16).toString("hex");
      const title = newsData[lang].title;

      // 🔐 salva unsubscribeToken per futuro uso
      await doc.ref.update({unsubscribeToken});

      const unsubscribeLink = `https://www.knotpoet.com/unsubscribe?token=${unsubscribeToken}`;

      const content = {
        "it-IT": {
          subject: `Nuova newsletter: ${title}`,
          greeting: `Ciao ${name} 👋`,
          intro: `Grazie per seguire la newsletter di <strong>Knot Poet</strong>!`,
          newsletter: `📬 Ecco la nostra ultima novità:`,
          read: `👉 <a href="${newsletterLink}" style="color: #007BFF;">Leggi la newsletter completa</a>`,
          unsubscribe: `Se non vuoi più ricevere le nostre email, puoi <a href="${unsubscribeLink}">disiscriverti qui</a>.`
        },
        "en-EN": {
          subject: `New newsletter: ${title}`,
          greeting: `Hi ${name} 👋`,
          intro: `Thanks for following the <strong>Knot Poet</strong> newsletter!`,
          newsletter: `📬 Here's our latest update:`,
          read: `👉 <a href="${newsletterLink}" style="color: #007BFF;">Read the full newsletter</a>`,
          unsubscribe: `If you no longer wish to receive our emails, you can <a href="${unsubscribeLink}">unsubscribe here</a>.`
        }
      };

      const t = content[lang];

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>${t.greeting}</h2>
          <p>${t.intro}</p>
          <p>${t.newsletter}</p>
          <h3>${title}</h3>
          <p>${t.read}</p>
          <hr>
          <p style="font-size: 0.9em; color: #666;">${t.unsubscribe}</p>
        </div>
      `;

      try {
        await transporter.sendMail({
          from: `"Knot Poet - Official Website" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: t.subject,
          html: htmlBody,
        });

        console.log(`✅ Email inviata a ${email}`);

        await db.collection("newsletter_logs").add({
          email,
          newsletterId: newsId,
          status: "sent",
          sentAt: new Date().toISOString(),
        });
      } catch (error) {
        console.error(`❌ Errore invio email a ${email}:`, error);

        await db.collection("newsletter_logs").add({
          email,
          newsletterId: newsId,
          status: "error",
          error: error.message,
          sentAt: new Date().toISOString(),
        });
      }
    });

    await Promise.all(sendPromises);
  } catch (error) {
    console.error("Errore generale nell'invio newsletter:", error);
  }
});

unsubscribeApp.get("/", async (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.status(400).send(`
      <h2>Errore</h2>
      <p>Token mancante. Il link di disiscrizione potrebbe essere non valido.</p>
    `);
  }

  try {
    // 🔍 Cerca il documento con quel token
    const snapshot = await db.collection("newsletter")
      .where("unsubscribeToken", "==", token)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(404).send(`
        <h2>Non trovato</h2>
        <p>Il token fornito non è valido o è già stato usato.</p>
      `);
    }

    const doc = snapshot.docs[0];
    const ref = doc.ref;

    // 🔒 Disattiva iscrizione
    await ref.update({subscribed: false});

    return res.status(200).send(`
      <h2>Disiscrizione completata ✅</h2>
      <p>Ci dispiace vederti andare. Hai disattivato con successo la ricezione delle newsletter di Knot Poet.</p>
    `);
  } catch (error) {
    console.error("Errore durante la disiscrizione:", error);
    return res.status(500).send(`
      <h2>Errore interno</h2>
      <p>Qualcosa è andato storto. Riprova più tardi.</p>
    `);
  }
});

// 🔥 Endpoint HTTPS Firebase
exports.unsubscribe = onRequest(
  {region: "europe-west1", cors: true},
  unsubscribeApp
);
