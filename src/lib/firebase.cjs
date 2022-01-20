
var admin = require("firebase-admin");

var serviceAccount = require("../../chatily-78422-firebase-adminsdk-v9ysj-43399fe367.json");

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = [
  app
]