import { SocketAuthMiddleware } from './../lib/auth.js'
import { v4 as uuidv4 } from 'uuid'
import { Server } from "socket.io";


export function createSocket(httpServer) {

    var io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });

    io.use(SocketAuthMiddleware)
    io.on('connection', (socket) => {
        onConnection(io, socket)
    });

    return io;
}

function onConnection(io, socket) {

    socket.on('join-room', (id, userId, peerid) => {
        joinRoom(id, userId, peerid, io, socket)
    })
    socket.on('create-room', (userId) => {
        createRoom(io, socket, userId)
    })
}

var rooms = {};

function joinRoom(roomId, userId, peerid, io, socket) {
    console.log('SERVER LOG :', userId, ' room join...', roomId, ' peerid: ', peerid)

    if(rooms[roomId] !== null)
        socket.emit('initial-joined-contacts', rooms[roomId])
    
    //TODO: What if room is not created?
    socket.join(roomId)

    if (rooms[roomId] === undefined)
        rooms[roomId] = {}

    if (rooms[roomId][userId] === null || rooms[roomId][userId] === undefined){
        
        rooms[roomId][userId] = []
    }

    rooms[roomId][userId].push(peerid)
    io.to(roomId).emit('joined', userId, peerid)
    console.log('PEER LOG: ', roomId, ' -> ', rooms[roomId])
}

function createRoom(io, socket, userId) {

    const roomId = uuidv4()
    socket.emit('room-created', roomId)
}
