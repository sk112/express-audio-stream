import express from 'express';
import { createServer } from 'http'
import { Server } from "socket.io"
import cors from 'cors';
import { Authenticate } from './../src/middlewares/auth.js'
import { SocketAuthMiddleware } from './lib/firebase-admin.js';
import { createSocket } from './lib/socket.js';
import { signUpHandler } from './handlers/auth.js';

// initializeFirebaseApp();
const app = express();

// Server initialization
const httpServer = createServer(app);

// socket creation
createSocket(httpServer)

// Enabling CORS
app.use(cors())
app.use(express.json())

// Authentication middleware
app.use(Authenticate)

// Test API
app.get('/', (req, res) => {
    console.log('Index....')
    res.send('Hello World!!')
})

// Auth Handlers
var auth = express.Router()
auth.post('/signup', signUpHandler);

// consolidate routers.
app.use('/auth', auth)  

// Server listening
httpServer.listen(3001);
