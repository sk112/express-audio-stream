import { initializeApp as firebaseAdminInit } from 'firebase-admin/app';
import { getAuth as getAuthOfAdmin } from 'firebase-admin/auth'

import  pkg from "firebase-admin"
const {credential, auth } = pkg

// dotenv configuration
import dotenv from 'dotenv';
dotenv.config();
console.log('GOOGLE_APPLICATION_CREDENTIALS: ', process.env.GOOGLE_APPLICATION_CREDENTIALS)

// Firebase Admin App Initialization
const FirebaseAdminApp = firebaseAdminInit({
  credential: credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
});

// Socket Authentication Middleware to verify the token
function SocketAuthMiddleware(socket, next) {

  const token = socket.request._query.token
  // console.log('Socket Auth Middleware....', token)

  getAuthOfAdmin(FirebaseAdminApp)
      .verifyIdToken(token)
      .then(value => {
          next()
      })
      .catch(err => {
          console.error('socket token auth error: ', err)
          next(new Error('Socket Token Error'))
      })
}

export {
  FirebaseAdminApp,
  SocketAuthMiddleware
}
