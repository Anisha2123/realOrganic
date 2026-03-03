const admin = require("firebase-admin");
const serviceAccount = require("./realorganic-cd84d-firebase-adminsdk-fbsvc-95f86fbe35.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;